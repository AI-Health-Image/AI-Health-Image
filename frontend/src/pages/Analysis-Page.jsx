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
      <div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSubmit}
          disabled={analyzing}
        >
          {analyzing ? "Analyzing..." : "Analyze"}
        </button>
      </div>

      {analyseURL && Array.isArray(analyseURL.data) && (
        <div className="grid grid-cols-3 gap-4">
          {analyseURL.data.map((file) => (
            <div key={file.id} className="p-2">
              <img
                src={`http://localhost:3000/analyse/output/${file.uploadedFilname}`}
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
