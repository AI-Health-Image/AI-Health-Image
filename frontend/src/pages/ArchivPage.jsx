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
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const loadingArchiv = async () => {
    const response = await fetch("http://localhost:3000/archiv/archiv", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`, // Der JWT Token wird als Bearer Token übergeben
      },
    });

    console.log(response);

    if (response.ok) {
      const data = await response.json();
      setArchivData(data.archiv);
    } else {
      const responseEmpty = "Archiv is empty";
      return responseEmpty;
    }
  };

  useEffect(() => {
    loadingArchiv();
  }, [jwt]);

  const creatingArchiv = async () => {
    const response = await fetch("http://localhost:3000/archiv/archivCreate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`, // Der JWT Token wird als Bearer Token übergeben
      },
    });
    // Prüft den Response von der API
    if (response.ok === false) {
      const error = await response.json();
      setErrorMessage(error.message);
      return;
    }

    const data = await response.json();
    setSuccessMessage(data.message);
    loadingArchiv();
  }; 

  const handleSubmit = async (id) => {
    navigate(`/analyse/${id}`);

  };

  return (
    <Layout>
      <div>
        {/* Hier wird die Erfolgsmeldung oder Fehlermeldung angezeigt */}
        {successMessage && (
          <p className="bg-green-500 text-white p-2 flex justify-center items-center rounded-xl w-40">
            {successMessage}
          </p>
        )}
        {errorMessage && (
          <p className="bg-red-500 text-white p-2 flex justify-center items-center rounded-xl w-40">
            {errorMessage}
          </p>
        )}

        {/* Hier wird das Archiv angezeigt */}
        {archivData.length > 0 ? (
          <ul className="grid grid-cols-5 mx-auto gap-2">
            {archivData.map((archiv, index) => (
              <li
                key={index}
                className="mb-2 mx-2 justify-between items-center flex flex-col"
              >

                <button onClick={handleSubmit(archiv.id)} className="flex flex-col justify-center items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                <FolderClosed className="text-white size-20 " />
                <h1 className="text-white ">{archiv.name}</h1>
                </button>
              </li>
            ))}

            {/* Hier wird der Button zum Erstellen eines Archivs angezeigt */}
            <li>
              <button
                onClick={creatingArchiv}
                className="flex flex-col justify-center items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                <Plus className="text-white size-20" />
                Create Archiv
              </button>
            </li>
          </ul>
        ) : (
          <p className="text-white">Archiv is Empty</p>
        )}
      </div>
    </Layout>
  );
}

export default ArchivPage;
