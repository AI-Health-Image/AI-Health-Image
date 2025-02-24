import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Layout from "../layout/Layout";
import useJwtStore from "../components/jwtStore";
import ImageViewer from "../components/imageViewer";

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
        const response = await fetch(
          `http://localhost:3000/analyse/api/image/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`, // Der JWT Token wird als Bearer Token übergeben
            },
          }
        );
        const responseData = await response.json();
        //console.log('responseData:', responseData);
        //console.log('responseData.data:', responseData.data);
        //console.log('responseData.data[0].uploadedFilname:', responseData.data[0].uploadedFilname);
        if (responseData.data && responseData.data.length > 0) {
          setImageURL(responseData.data);
          //console.log('Image URL over responseData:', responseData.data[0].uploadedFilname);
        }

        //console.log(responseData.data[0].uploadedFilname);
        const responseAnalyse = await fetch(
          `http://localhost:3000/analyse/output/verify/${responseData.data[0].uploadedFilname}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`, // Der JWT Token wird als Bearer Token übergeben
            },
          }
        );
        //console.log("responseAnalyse:", responseAnalyse);
        if (responseAnalyse.status === 200) {
          const responseAnalyseData = await responseAnalyse.json();
          //console.log("responseAnalyse.data:", responseAnalyseData);
          setAnalyseURL(responseAnalyseData);
        }

        setLoading(false);
      } catch (error) {
        console.error("Fehler beim Laden der Bilder", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchImage();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleSubmit = async () => {
    console.log("handleSubmit");
    try {
      setAnalyzing(true);
      //console.log("imageURL:", imageURL);
      const filename = imageURL[0].uploadedFilname;
      //console.log(filename);
      const response = await fetch(
        `http://localhost:3000/analyse/api/analyse/${filename}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwt}`, // Der JWT Token wird als Bearer Token übergeben
          },
        }
      );
      const responseData = await response.json();
      console.log("Response from api/analys:", responseData);
      setAnalyseURL(responseData);
      setAnalyzing(false);

      // Fetch the newly analyzed image
      const responseNewAnalyse = await axios.get(
        `http://localhost:3000/analyse/output/verify/${responseData.data}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`, // Der JWT Token wird als Bearer Token übergeben
          },
        }
      );
      //console.log("responseNewAnalyse:", responseNewAnalyse);
      if (responseNewAnalyse.status === 200) {
        //console.log("responseNewAnalyse.data:", responseNewAnalyse.data);
        setAnalyseURL(responseNewAnalyse.data);
      }
    } catch (error) {
      console.error("Fehler beim Laden des Bildes", error);
      setError(error.message);
      setAnalyzing(false);
    }
  };
  //console.log('ImageURL TEST:', imageURL);
  console.log("AnalyseURL TEST:", analyseURL);

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold text-white mb-6">
          Bildanalyse Ergebnisse
        </h1>

        {/* Image Comparison Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Original Image */}
          <div className="bg-slate-800/60 rounded-xl p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white mb-3">
                Originalbild
              </h2>
              {/* Analyze Button */}
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleSubmit}
                disabled={analyzing}
              >
                {analyzing ? "Analyzing..." : "Analyze"}
              </button>
            </div>

            {/* Display Original Image */}
            {imageURL && Array.isArray(imageURL) && (
              <div>
                {imageURL.map((file) => (
                  <div key={file.id}>
                    <ImageViewer imageID={file.id} directory="uploads" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Display Analyzed Image */}
          <div className="bg-slate-800/60 rounded-xl p-4">
            <h2 className="text-xl font-bold text-white mb-3">
              Analysiertes Bild
            </h2>
            {analyseURL && Array.isArray(analyseURL) && (
              <div>
                {analyseURL.map((file) => (
                  <div key={file.id}>
                    <ImageViewer imageID={file.id} directory="output" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Information Block & (maybe later AI Chat) */}
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
            
            {/* Display the analysis results */}
            <div className="bg-slate-700/60 rounded-lg p-4 text-white">
              <h3 className="font-semibold mb-2">Weitere Informationen</h3>
              {analyseURL && Array.isArray(analyseURL) && (
                <div>
                  {analyseURL.map((file) => (
                    <div key={file.id}>
                      <ul className="list-none list-inside">
                        <li>Analyse-ID: {file.id}</li>
                        <li>Erstellt am: {file.date}</li>
                        <li>
                          <pre className="text-wrap">{file.result}</pre>
                        </li>
                        {/* Add more analysis details here */}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AnalysisPage;
