import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../layout/Layout";
import JwtVerify from "../components/jwtVerify";
import useJwtStore from "../components/jwtStore";

function UploadbuttonPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [tokenValid, setTokenValid] = useState(false);
  const jwt = useJwtStore((state) => state.jwt);

  useEffect(() => {
    const verifyToken = async () => {
      if (jwt) {
        const isValid = await JwtVerify(jwt);
        setTokenValid(isValid);
      } else {
        setTokenValid(false);
      }
    };

    verifyToken();
  }, [jwt]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await fetch(import.meta.env.VITE_API_URL + "upload/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwt}`,   // Der JWT Token wird als Bearer Token übergeben
        },
        body: formData,
      });

      if (response.ok) {
        //Erfolgreicher Upload
        console.log("Bild erfolgreich hochgeladen");
      } else {
        //Fehler beim Upload
        console.error("Fehler beim Hochladen des Bildes");
      }
    } catch (error) {
      console.error("Fehler beim Senden der Anfrage", error);
    }
  };

  // Wenn der Token nicht korrekt ist soll der User auf die Startseite geleitet werden und eine Fehlermeldung erhalten
  if (tokenValid === null) {
    // Zeigt einen Ladebildschirm an, während der Token geprüft wird
    return (
      <Layout>
        <main className="text-white p-9">
          <p>Loading...</p>
        </main>
      </Layout>
    );
  }

  if (!tokenValid) {
    // Wenn der Token nicht korrekt ist, wird der User auf die Startseite geleitet
    return (
      <Layout>
        <main className="text-white p-9">
          <p>You&apos;re not logged in.</p>
          <Link to={"/"}>Home</Link>
        </main>
      </Layout>
    );
  }

  if (tokenValid) {
    // Die eigentliche Upload Page soll nur erreicht werden wenn ein JWT Token vorhanden ist
    return (
      <Layout>
        <div className="container mx-auto max-w-md p-4 bg-gray-100 mt-4 rounded-lg">
    <h1 className="text-2xl font-bold mb-4">MRT-Bildanalyse</h1>
    <input type="file" onChange={handleFileChange} />
    <button 
      onClick={handleSubmit} 
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded
                transform transition-transform duration-100 active:scale-95 
                hover:-translate-y-0.5 active:translate-y-0
                shadow-lg hover:shadow-xl active:shadow-md"
    >
      Hochladen
    </button>
    {selectedFile && (
      <img
        src={URL.createObjectURL(selectedFile)}
        alt="Vorschau"
        style={{ maxWidth: "100%" }}
      />
    )}
  </div>
      </Layout>
    );
  }
}

export default UploadbuttonPage;
