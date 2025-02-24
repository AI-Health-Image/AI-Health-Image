import Layout from "../layout/Layout";
import { FolderClosed, Plus } from "lucide-react";
import useJwtStore from "../components/jwtStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ArchivPage() {
  const jwt = useJwtStore((state) => state.jwt);
  const [archivData, setArchivData] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const loadingArchiv = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + "archiv/archiv", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`, // Der JWT Token wird als Bearer Token übergeben
        },
      });

      console.log(response);

      if (response.ok) {
        const data = await response.json();
        if (data.message) {
          setErrorMessage(data.message);
          setArchivData([]);
          return;
        }
        setArchivData(data.archiv);
      } else {
        const responseEmpty = "Archiv is empty";
        return responseEmpty;
      }
    } catch (error) {
      console.log("Fehler beim Laden des Archivs", error);
      setErrorMessage("Fehler beim Laden des Archivs");
    }
  };

  useEffect(() => {
    loadingArchiv();
  }, []); // Hier eine leere Abhängigkeit gebraucht, um sicherzustellen, dass der Effekt nur einmal ausgeführt wird

  const creatingArchiv = async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + "archiv/archivCreate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`, // Der JWT Token wird als Bearer Token übergeben
          },
        }
      );

      // Prüft den Response von der API
      if (!response.ok) {
        const error = await response.json();
        setErrorMessage(error.message);
        return;
      }

      const data = await response.json();
      setSuccessMessage(data.message);
      loadingArchiv();
    } catch (error) {
      console.error("Fehler beim Erstellen des Archivs", error);
      setErrorMessage("Fehler beim Erstellen des Archivs");
    }
  };

  const handleSubmit = async (id) => {
    navigate(`/analyse/${id}`);
  };

  return (
    <Layout>
      <div className="flex flex-col justify-center items-center">
        {/* Hier wird die Erfolgsmeldung oder Fehlermeldung angezeigt */}
        {successMessage && (
          <p className="bg-green-500 text-white p-2 mb-2 flex justify-center items-center rounded-xl w-40">
            {successMessage}
          </p>
        )}
        {errorMessage && (
          <p className="bg-red-500 text-white p-2 mb-2 flex justify-center items-center rounded-xl w-40">
            {errorMessage}
          </p>
        )}

        {/* Hier wird das Archiv angezeigt */}
        {archivData && archivData.length > 0 ? (
          <ul className="grid grid-cols-5 mx-auto gap-2">
            {archivData.map((archiv, index) => (
              <li
                key={index}
                className="mb-2 mx-2 justify-between items-center flex flex-col"
              >
                <button
                  onClick={() => handleSubmit(archiv.id)}
                  className="flex flex-col justify-center items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  <FolderClosed className="text-white size-20 " />
                  <h1 className="text-white ">{archiv.name}</h1>
                </button>
              </li>
            ))}
            {/*
            <li>
              <div>
                <button
                  onClick={creatingArchiv}
                  className="flex flex-col justify-center items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  <Plus className="text-white size-20" />
                  Create Archiv
                </button>
              </div>
            </li>
                */}
          </ul>
        ) : (
          <div>
            <button
              onClick={creatingArchiv}
              className="flex flex-col justify-center items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              <Plus className="text-white size-20" />
              Create Archiv
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default ArchivPage;
