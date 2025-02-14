import Layout from "../layout/Layout";
import { FolderClosed } from "lucide-react";
import useJwtStore from "../components/jwtStore";

function ArchivPage() {
    const jwt = useJwtStore((state) => state.jwt);

    async function loadingArchiv() {
        const response = await fetch("http://localhost:3000/archiv/archiv", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`,   // Der JWT Token wird als Bearer Token übergeben
            },
          });

        console.log(response);

        if(response){
            return response;
        }else {
            const responseEmpty = "Archiv is empty";
            return responseEmpty; 
        }
        
    }

    async function creatingArchiv() {
        const response = await fetch("http://localhost:3000/archiv/creatingArchiv", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`,   // Der JWT Token wird als Bearer Token übergeben
            },
          });   
          loadingArchiv(); 
    }

  return (
    <Layout>
      <div className=" grid grid-cols-5 mx-auto">
        {}
        <div className="mx-4 mb-4">
        <FolderClosed className="text-white size-20 " />
        <h1 className="text-white ">ArchivPage</h1>
        </div>
      </div>
    </Layout>
  );
}

export default ArchivPage;
