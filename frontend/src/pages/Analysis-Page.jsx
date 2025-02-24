import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";

const AnalysisPage = () => {
  const { id } = useParams();
    const [imageURL, setImageURL] = useState(null);
    const [analyseURL, setAnalyseURL] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImage = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3000/analyse/api/image/${id}`
        );
        console.log(response);
          setImageURL(response.data);
          
          setLoading(true);
          const responseAnalyse = await axios.get(
            `http://localhost:3000/analyse/output/${response.data.data[0].uploadedFilname}`
          );
          console.log('responseanalyse:',responseAnalyse);
          if (responseAnalyse.status === 200)
            setAnalyseURL(responseAnalyse.data);

        setLoading(false);
      } catch (error) {
        console.error("Fehler beim Laden des analysierten Bildes", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchImage();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleSubmit = async () => {
    try {
      setAnalyzing(true);
      const response = await axios.get(
        `http://localhost:3000/analyse/api/analyse/${id}`
      );
      console.log(response);
      setAnalyseURL(response.data);
      setAnalyzing(false);
      //navigate(0);
    } catch (error) {
      console.error("Fehler beim Laden des Bildes", error);
      setError(error.message);
      setAnalyzing(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold text-white mb-6">Bildanalyse Ergebnisse</h1>
        
        {/* Analyze Button */}
        <div>
<button
  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  onClick={handleSubmit}
  disabled={analyzing}
>
  {analyzing ? "Analyzing..." : "Analyze"}
</button>
</div>

        {/* Image Comparison Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Original Image */}
          <div className="bg-slate-800/60 rounded-xl p-4">
            <h2 className="text-xl font-bold text-white mb-3">Originalbild</h2>
            {imageURL && (
              <img
                src={`http://localhost:3000/analyse/uploads/${imageURL.data[0].uploadedFilname}`}
                alt="Original"
                className="w-full rounded-lg"
              />
            )}
          </div>


          {/* Analyzed Image */}
          <div className="bg-slate-800/60 rounded-xl p-4">
            <h2 className="text-xl font-bold text-white mb-3">Analysiertes Bild</h2>
            {analyseURL && (
              <img
                src={`http://localhost:3000/analyse/output/${analyseURL.data[0].uploadedFilname}`}
                alt="Analyzed"
                className="w-full rounded-lg"
              />
            )}
          </div>
        </div>

        {/* Analysis Results */}
        <div className="bg-slate-800/60 rounded-xl p-4">
          <h2 className="text-xl font-bold text-white mb-3">Analyse Details</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-700/60 rounded-lg p-4 text-white">
              <h3 className="font-semibold mb-2">Erkennungen</h3>
              {analyseURL && (
                <pre className="whitespace-pre-wrap text-sm">
                  {JSON.stringify(analyseURL.detections, null, 2)}
                </pre>
              )}
            </div>
            <div className="bg-slate-700/60 rounded-lg p-4 text-white">
              <h3 className="font-semibold mb-2">Weitere Informationen</h3>
              {analyseURL && (
                <ul className="list-disc list-inside">
                  <li>Analyse-ID: {analyseURL.id}</li>
                  <li>Erstellt am: {new Date().toLocaleString()}</li>
                  {/* Add more analysis details here */}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <p className="text-white">Analysiere Bild...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-500/60 rounded-xl p-4 mt-4">
            <p className="text-white">{error}</p>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default AnalysisPage;
