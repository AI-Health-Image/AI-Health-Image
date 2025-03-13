import { useState, useEffect } from 'react';
import useJwtStore from './jwtStore';
import PropTypes from 'prop-types';

function ImageViewer({ imageID, directory }) {
    const [image, setImage] = useState(null);
    const jwt = useJwtStore((state) => state.jwt);
    useEffect(() => {
        async function loadImage() {
            //console.log('imageURL:', imageID);
            //console.log('directory:', directory);
            const response = await fetch(`${import.meta.env.VITE_API_URL}analyse/${directory}/${imageID}`, {
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
    }, [imageID, directory, jwt]);

    if (!image) {
        return <div>Loading...</div>;
    }

    return (
        <div className='flex w-full gap-4 justify-center items-center'>
            <img src={image} alt={`Analysis result for ${imageID}`} className='w-full'/>
        </div>
    );
}

ImageViewer.propTypes = {
    imageID: PropTypes.string.isRequired,
    directory: PropTypes.string.isRequired,
};
export default ImageViewer;