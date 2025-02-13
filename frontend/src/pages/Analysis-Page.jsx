//AnalysisPage

import React , {useState, useEffect} from 'react';
import { useSearchParams } from 'react-router-dom';
import CornerstoneViewport from 'react-cornerstone-viewport';

//Import einer Bibliothek für die Bildanzeige (z.B. CornerstoneViewer)

function AnalysisPage() {
    const [searchParams] = useSearchParams();
    const filename = searchParams.get('filename');
    const  [imageUrl, setImageUrl] = useState(null);


    useEffect(() => {
        if (filename) {
            setImageUrl(`/api/images/${filename}`);
        }
    }
[filename]);

retunr (
    <div>
       <h1 calssName="text-2xl font-bold mb-4">MRT Bildanalyse</h1>
       {/* Hier wird das Bild angezeigt */}
       {imageUrl && <CornerstoneViewer imageUrl={imageUrl} />}
    </div>
)
}

export default AnalysisPage;