import { useState, useEffect } from 'react';
import useJwtStore from './jwtStore';

function ImageViewer({ imageID, directory }) {
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
            //console.log(response);
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
        <div className='flex w-full gap-4 justify-center items-center'>
            <img src={image} alt="Uploaded Image" className='w-full'/>
        </div>
    );
};

export default ImageViewer;