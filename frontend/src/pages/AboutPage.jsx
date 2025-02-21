import Layout from "../layout/Layout";

function AboutPage() {
  return (
    <div
      className="bg-cover bg-center h-screen flex flex-col justify-center"
      style={{ backgroundImage: "url('/itmedical.jpg')" }}
    >
      <Layout>
        <div className="flex flex-col justify-center items-center p-2 rounded m-2 bg-slate-00">
          <div className="max-w-45">
            <p className="bg-slate-800 text-white rounded-xl p-2">
              Unsere Plattform ermöglicht es Nutzern, medizinische Bilder wie CT-Scans hochzuladen und diese mithilfe von Künstlicher Intelligenz (KI) analysieren zu lassen. Unser Ziel ist es, sowohl medizinischen Fachkräften als auch Patienten dabei zu helfen, Krankheiten frühzeitig zu erkennen und fundierte Entscheidungen zu treffen. Durch den Einsatz fortschrittlicher KI-Modelle bieten wir präzise und zuverlässige Analysen, die den Diagnoseprozess unterstützen. Datensicherheit und der Schutz der Privatsphäre unserer Nutzer stehen dabei für uns an oberster Stelle.
            </p>
          </div>
        </div>

        <section className="p-2 grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded shadow-md">
            <h3 className="text-xl font-bold mb-2">J.D.</h3>
            <p>
              Placeholder für individuelle Informationen über Teammitglied 1.
            </p>
          </div>
          <div className="bg-white p-4 rounded shadow-md">
            <h3 className="text-xl font-bold mb-2">Manuel Huck</h3>
            <p>
              Placeholder für individuelle Informationen über Teammitglied 2.
            </p>
          </div>
          <div className="bg-white p-4 rounded shadow-md">
            <h3 className="text-xl font-bold mb-2">Nazlihan</h3>
            <p>
              Placeholder für individuelle Informationen über Teammitglied 3.
            </p>
          </div>
          <div className="bg-white p-4 rounded shadow-md">
            <h3 className="text-xl font-bold mb-2">Cansin Erdi</h3>
            <p>
              Placeholder für individuelle Informationen über Teammitglied 4.
            </p>

            <p>
              Placeholder für individuelle Informationen über Teammitglied 5.
            </p>
          </div>
        </section>
      </Layout>
    </div>
  );
}

export default AboutPage;