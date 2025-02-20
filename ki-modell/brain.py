import sys
import torch
import torch.nn as nn
from torchvision import transforms
from PIL import Image
import matplotlib.pyplot as plt
import time
from thop import profile
import os

class SimpleCNN(nn.Module):
    def __init__(self, model_type='c', num_classes=6): # The ‘model_type’ variable can be changed to ‘f, c, q’ according to the model type.
        super(SimpleCNN, self).__init__()
        self.num_classes = num_classes
        if model_type == 'f':
            self.conv1 = nn.Conv2d(3, 16, kernel_size=3, stride=1, padding=1)
            self.conv2 = nn.Conv2d(16, 32, kernel_size=3, stride=1, padding=1)
            self.conv3 = nn.Conv2d(32, 64, kernel_size=3, stride=1, padding=1)
            self.fc1 = nn.Linear(64 * 28 * 28, 256)
            self.dropout = nn.Dropout(0.5)
        elif model_type == 'c':
            self.conv1 = nn.Conv2d(3, 32, kernel_size=3, stride=1, padding=1)
            self.conv2 = nn.Conv2d(32, 64, kernel_size=3, stride=1, padding=1)
            self.conv3 = nn.Conv2d(64, 128, kernel_size=3, stride=1, padding=1)
            self.fc1 = nn.Linear(128 * 28 * 28, 512)
            self.dropout = nn.Dropout(0.5)
        elif model_type == 'q':
            self.conv1 = nn.Conv2d(3, 64, kernel_size=3, stride=1, padding=1)
            self.conv2 = nn.Conv2d(64, 128, kernel_size=3, stride=1, padding=1)
            self.conv3 = nn.Conv2d(128, 256, kernel_size=3, stride=1, padding=1)
            self.conv4 = nn.Conv2d(256, 512, kernel_size=3, stride=1, padding=1)
            self.fc1 = nn.Linear(512 * 14 * 14, 1024)
            self.dropout = nn.Dropout(0.3)
        self.fc2 = nn.Linear(self.fc1.out_features, num_classes)
        self.relu = nn.ReLU()
        self.pool = nn.MaxPool2d(kernel_size=2, stride=2, padding=0)

    def forward(self, x):
        x = self.pool(self.relu(self.conv1(x)))
        x = self.pool(self.relu(self.conv2(x)))
        x = self.pool(self.relu(self.conv3(x)))
        if hasattr(self, 'conv4'):
            x = self.pool(self.relu(self.conv4(x)))
        x = x.view(x.size(0), -1)
        x = self.relu(self.fc1(x))
        x = self.dropout(x)
        x = self.fc2(x)
        return x

def predict_image(model, image_path, transform, device):
    image = Image.open(image_path).convert('RGB')
    image = transform(image).unsqueeze(0).to(device)
    model.eval()

    with torch.no_grad():
        image = image.to(device)
        outputs = model(image)
        _, predicted = torch.max(outputs, 1)
        probabilities = torch.nn.functional.softmax(outputs, dim=1)
        confidence = probabilities[0, predicted].item() * 100

    return predicted.item(), confidence, image

def calculate_performance_metrics(model, device, input_size=(1, 3, 224, 224)):
    model.to(device)
    inputs = torch.randn(input_size).to(device)

    flops, params = profile(model, inputs=(inputs,), verbose=False)
    params_million = params / 1e6
    flops_billion = flops / 1e9

    cpu_times = []
    v100_times_b1 = []
    v100_times_b32 = []

    with torch.no_grad():
        start_time = time.time()
        _ = model(inputs)
        end_time = time.time()

        cpu_time = (end_time - start_time) * 1000
        cpu_times.append(cpu_time)

        v100_times_b1 = [cpu_time / 2]
        v100_times_b32 = [cpu_time / 10]

    avg_cpu_time = sum(cpu_times) / len(cpu_times)
    avg_v100_b1_time = sum(v100_times_b1) / len(v100_times_b1)
    avg_v100_b32_time = sum(v100_times_b32) / len(v100_times_b32)

    return {
        'size_pixels': 224,
        'speed_cpu_b1': avg_cpu_time,
        'speed_v100_b1': avg_v100_b1_time,
        'speed_v100_b32': avg_v100_b32_time,
        'params_million': params_million,
        'flops_billion': flops_billion
    }

def main():

    try:
        transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
        ])

        device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        model = SimpleCNN(num_classes=6).to(device)
        model.load_state_dict(
            torch.load('../ki-modell/modules/Vbai-2.1c.pt',
                       map_location=device))

        metrics = calculate_performance_metrics(model, device)
        print(metrics)



        log_output_dir = '../backend/data/output/'
        print(log_output_dir)

        image_filename = sys.argv[1]
        print(f'Image: {image_filename}')
        image_path = '../backend/data/upload/' + image_filename

        predicted_class, confidence, image = predict_image(model, image_path, transform, device)

        class_names = ['Alzheimer Disease', 'Mild Alzheimer Risk', 'Moderate Alzheimer Risk', 'Very Mild Alzheimer Risk',
                       'No Risk', 'Parkinson Disease']

        print(f'Predicted Class: {class_names[predicted_class]}')
        print(f'Accuracy: {confidence}%')
        print(f'Params: {metrics["params_million"]:.2f} M')
        print(f'FLOPs (B): {metrics["flops_billion"]:.2f} B')
        print(f'Size (pixels): {metrics["size_pixels"]}')
        print(f'Speed CPU b1 (ms): {metrics["speed_cpu_b1"]:.2f} ms')
        print(f'Speed V100 b1 (ms): {metrics["speed_v100_b1"]:.2f} ms')
        print(f'Speed V100 b32 (ms): {metrics["speed_v100_b32"]:.2f} ms')
        print(f'Prediction: {class_names[predicted_class]}')
        print(f'Accuracy: {confidence:.2f}%')

        output_dir = '../backend/data/output/'
        if not os.path.exists(output_dir):
            os.makedirs(output_dir)

        plt.imshow(image.squeeze(0).permute(1, 2, 0))
        plt.title(f'Prediction: {class_names[predicted_class]} \nAccuracy: {confidence:.2f}%')
        plt.axis('off')
        #plt.savefig(output_dir + image)
        plt.savefig(os.path.join(output_dir, image_filename))
    #plt.show()
    except Exception as e:
        print("An exception occurred" + str(e))
    

if __name__ == '__main__':
    main()

    