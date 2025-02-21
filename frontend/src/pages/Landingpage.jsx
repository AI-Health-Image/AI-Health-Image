import Layout from "../layout/Layout";

function Landingpage() {
  return (
    <div className="bg-cover bg-center min-h-screen" 
         style={{ backgroundImage: "url('/mrt-maschin.jpg')" }}>
      <Layout>
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center py-8">
          <h1 className="text-4xl font-bold text-white mb-4">Health Image Analyzer</h1>
          <p className="text-xl text-white mb-6 max-w-2xl text-center">
            Innovative KI-gestützte Bildanalyse für präzise medizinische Diagnostik
          </p>
        </section>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-6 p-4 max-w-5xl mx-auto">
          {/* Video Section */}
          <div className="bg-slate-800/60 rounded-xl p-4">
            <h2 className="text-xl font-bold text-white mb-3">Demo Video</h2>
            <iframe
              className="w-full aspect-video rounded-lg"
              src="https://www.youtube.com/embed/aj1Xj-WN8uo?si=UHPSDRxEEQSvAmNE"
              title="Health Image Analyzer Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* Info Section */}
          <div className="bg-slate-800/60 rounded-xl p-4 text-white">
            <h2 className="text-xl font-bold mb-3">Über unseren Service</h2>
            <p className="mb-4">
              Mit modernster KI-Technologie unterstützen wir medizinisches Personal 
              bei der schnellen und präzisen Analyse von Bildaufnahmen.
            </p>
            <h3 className="text-lg font-bold mb-2">Unsere Vorteile:</h3>
            <ul className="list-disc list-inside">
              <li>Schnelle KI-gestützte Analyse</li>
              <li>Hohe Präzision und Zuverlässigkeit</li>
              <li>DSGVO-konforme Datensicherheit</li>
              <li>Einfache Integration in bestehende Systeme</li>
            </ul>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default Landingpage;


