//AnalysisPage

import React , {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import cornerstone from 'cornerstone-core';
import cornerstoneTools from 'cornerstone-tools';



function AnalysisPage() {
    const { filname } = useParams();
    const [imageURL, setImageURL] = useState(null);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/analyse/api/image/:filename`);
                setImageURL(URL.createObjectURL(response.data));
            } catch (error) {
                console.error("Fehler beim Laden des Bildes", error);
            }
        };

        fetchImage();
    }, [filname]);

    return (
        <div>
            <h1>Bildanalyse</h1>
            {imageURL && <img src={imageURL} alt="Bild" />}
        </div>

export default AnalysisPage;