// src /App.js
import React, { useState } from "react";

function App() {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };
}

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
    <div>
        <h1 className="text-3xl font-bold mb-4">MRT-Bildanalyse</h1>
        <input type="file" onChange={handleFileChange}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" />
        <button onClick={handleSubmit}>hochladen</button>
    </div>
);


export default UploadbuttonPage;
