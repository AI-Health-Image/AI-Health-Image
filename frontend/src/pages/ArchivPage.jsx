import Layout from "../layout/Layout";
import { FolderClosed } from "lucide-react";
import useJwtStore from "../components/jwtStore";
import { useEffect, useState } from "react";

function ArchivPage() {
    const jwt = useJwtStore((state) => state.jwt);
    const [archivData, setArchivData] = useState([]);

    useEffect(() => {
        const loadingArchiv = async () => {
            const response = await fetch("http://localhost:3000/archiv/archiv", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${jwt}`,   // Der JWT Token wird als Bearer Token übergeben
                },
              });
    
            console.log(response);
    
            if(response.ok){
                const data = await response.json();
                setArchivData(data.archiv);
            }else {
                const responseEmpty = "Archiv is empty";
                return responseEmpty; 
            }
        };

        loadingArchiv();
    }, [jwt]);

    const creatingArchiv = async () => {
        const response = await fetch("http://localhost:3000/archiv/creatingArchiv", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`,   // Der JWT Token wird als Bearer Token übergeben
            },
          });   
          loadingArchiv(); 
    };

  return (
    <Layout>
      <div>
        {archivData.length > 0 ? (
            <ul className="flex justify-between items-center">
            {archivData.map((item, index) => (
                <li key={index} className="mb-2 justify-between items-center flex flex-col">
            <FolderClosed className="text-white size-20 " />
            <h1 className="text-white ">{item.name}</h1>
            </li>
            ))}
            </ul>
        ) : (
            <p className="text-white">Archiv is Empty</p>
        )}
      </div>
    </Layout>
  );
}

export default ArchivPage;
