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
  console.log('AnalyseURL TEST:', analyseURL);

  return (
    <Layout>
      <h1 className="text-white text-5xl">Bildanalyse</h1>
      {imageURL && Array.isArray(imageURL) && (
        <div>
          {imageURL.map((file) => (
            <div key={file.id} className="p-2 mx-auto">
              <ImageViewer imageID={file.id} directory="uploads" />
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSubmit}
          disabled={analyzing}
        >
          {analyzing ? "Analyzing..." : "Analyze"}
        </button>
      </div>

      {analyseURL && Array.isArray(analyseURL) && (
        <div>
          {analyseURL.map((file) => (
            <div key={file.id} className="p-2 mx-auto">
              <ImageViewer imageID={file.id} directory="output" result={file.result} />
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default AnalysisPage;
