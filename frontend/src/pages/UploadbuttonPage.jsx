// src /App.js
import { useState } from "react";
import Layout from "../layout/Layout";

function UploadbuttonPage() {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async () => {
        if (!selectedFile) {
            return;
        }
    
        const formData = new FormData();
        formData.append('image', selectedFile);
    
        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });     
            
            if (response.ok) {
                //Erfolgreicher Upload
                console.log('Bild erfolgreich hochgeladen');
            } else {//Fehler beim Upload
                console.error('Fehler beim Hochladen des Bildes');
            }
        } catch (error) {
            console.error('Fehler beim Senden der Anfrage', error);
        }
    };

    return (
        <Layout>
            <h1>MRT-Bildanalyse</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleSubmit}>hochladen</button>
        </Layout>
    );
};

export default UploadbuttonPage;
