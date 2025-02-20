import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Layout from "../layout/Layout";
import useJwtStore from "../components/jwtStore";

const AnalysisPage = () => {
  const jwt = useJwtStore((state) => state.jwt);
  const { id } = useParams();
  const [imageURL, setImageURL] = useState(null);
  const [analyseURL, setAnalyseURL] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3000/analyse/api/image/${id}`
        );
        console.log(response);
        setImageURL(response.data);
        console.log("Response Data:", response.data.data);
        console.log("special Response:", response.data.data[0].uploadedFilname);

        const responseAnalyse = await axios.get(
          `http://localhost:3000/analyse/output/verify/${response.data.data[0].uploadedFilname}`
        );
        console.log("responseAnalyse:", responseAnalyse);
        if (responseAnalyse.status === 200) {
          console.log("responseAnalyse.data:", responseAnalyse.data);
          setAnalyseURL(responseAnalyse.data);
        }

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
      const filename = imageURL.data[0].uploadedFilname;
      const response = await axios.get(
        `http://localhost:3000/analyse/api/analyse/${filename}`, {
          headers: {
            Authorization: `Bearer ${jwt}`, // Der JWT Token wird als Bearer Token übergeben
          },
        });
      console.log(response);
      setAnalyseURL(response.data.data);
      setAnalyzing(false);

      // Fetch the newly analyzed image
      const responseNewAnalyse = await axios.get(
        `http://localhost:3000/analyse/output/verify/${response.data.data}`
      );
      console.log("responseNewAnalyse:", responseNewAnalyse);
      if (responseNewAnalyse.status === 200) {
        console.log("responseNewAnalyse.data:", responseNewAnalyse.data);
        setAnalyseURL(responseNewAnalyse.data);
      }
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
                src={`http://localhost:3000/analyse/uploads/${file.id}`}
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

      {analyseURL && (
        <div className="grid grid-cols-3 gap-4">
          <div className="p-2">
            <img
              src={`http://localhost:3000/analyse/output/${analyseURL}`}
              alt="Analyzed"
              className="max-w-full h-auto"
            />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default AnalysisPage;