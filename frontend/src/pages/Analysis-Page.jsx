import  { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Layout from '../layout/Layout';

const AnalysisPage = () => {
    const { id } = useParams();
    const [imageURL, setImageURL] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:3000/analyse/api/image/${id}`);
                console.log(response);
                setImageURL(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Fehler beim Laden des Bildes", error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchImage();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <Layout>
            <h1>Bildanalyse</h1>
            {imageURL && Array.isArray(imageURL.data) && (
    <div className="grid grid-cols-3 gap-4">
        {imageURL.data.map((file) => (
            <div key={file.id} className="p-2">
                <img 
                    src={`http://localhost:3000/analyse/uploads/${file.uploadedFilname}`}
                    alt="Uploaded"
                    className="max-w-full h-auto"
                />
            </div>
        ))}
    </div>
)}
        </Layout>
    );
};

export default AnalysisPage;