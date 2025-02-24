import { useState, useEffect } from 'react';
import useJwtStore from './jwtStore';

function ImageViewer({ imageID, directory, result }) {
    const [image, setImage] = useState(null);
    const jwt = useJwtStore((state) => state.jwt);
    useEffect(() => {
        async function loadImage() {
            //console.log('imageURL:', imageID);
            //console.log('directory:', directory);
            const response = await fetch(`http://localhost:3000/analyse/${directory}/${imageID}`, {
                method: 'GET',
                headers: {
                    authorization: `Bearer ${jwt}`,
                },
            });
            console.log(response);
            const blob = await response.blob();
            const image = URL.createObjectURL(blob);
            setImage(image);
        }
        loadImage();
    }, []);

    if (!image) {
        return <div>Loading...</div>;
    }

    return (
        <div className='flex w-full gap-4'>
            <img src={image} alt="Uploaded Image" />
            <p className='bg-gray-800 text-white p-4 w-full rounded-2xl'><pre className='text-wrap'>{result}</pre></p>
        </div>
    );
};

export default ImageViewer;