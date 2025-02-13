//AnalysisPage

import React , {useState, useEffect} from 'react';
import { useSearchParams } from 'react-router-dom';
import { init as coreInit } from '@cornerstonejs/core';


function AnalysisPage() {
    const  [imageUrl, setImageUrl] = useState(null);
    
    const inizialized = async () =>{
       let  cornerstone = await coreInit();
    };

    useEffect(() => {
        if (filename) {
            setImageUrl(`/api/images/${filename}`);
        }
    });
    

return (
    <div>
       <h1 className="text-2xl font-bold mb-4">MRT Bildanalyse</h1>
       {/* Hier wird das Bild angezeigt */}
       {imageUrl && <cornerstone imageUrl={imageUrl} />}
    </div>
)
}

export default AnalysisPage;