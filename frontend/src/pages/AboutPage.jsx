import Layout from "../layout/Layout";

function AboutPage() {
  return (
    <div
      className="bg-cover bg-center min-h-screen flex flex-col justify-center items-center relative"
      style={{ backgroundImage: "url('/itmedical.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/50 pointer-events-none"></div>
      
      <Layout>
        <div className="flex flex-col justify-center items-center p-4 relative z-10">
          <div className="max-w-4xl text-center bg-gray-900/90 text-white rounded-2xl p-8 shadow-2xl backdrop-blur-sm border border-white/10">
            <h1 className="text-4xl font-bold mb-6 font-mono bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              AI-Health-Image Analyzer
            </h1>
            <p className="text-lg leading-relaxed text-gray-100 drop-shadow-md">
              Unsere Plattform ermöglicht es Nutzern, medizinische Bilder wie CT-Scans hochzuladen und diese
              mithilfe von Künstlicher Intelligenz (KI) analysieren zu lassen. Unser Ziel ist es, sowohl medizinischen
              Fachkräften als auch Patienten dabei zu helfen, Krankheiten frühzeitig zu erkennen und fundierte
              Entscheidungen zu treffen. Durch den Einsatz fortschrittlicher KI-Modelle bieten wir präzise und
              zuverlässige Analysen, die den Diagnoseprozess unterstützen. Datensicherheit und der Schutz der
              Privatsphäre unserer Nutzer stehen dabei für uns an oberster Stelle.
            </p>
          </div>
        </div>

        <section className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl w-full relative z-10">
          {[
            { name: "J.D.", desc: "Placeholder für individuelle Informationen über Teammitglied 1." },
            { name: "Manuel Huck", desc: "Placeholder für individuelle Informationen über Teammitglied 2." },
            { name: "Nazlihan", desc: "Placeholder für individuelle Informationen über Teammitglied 3." },
            { name: "Cansin Erdi", desc: "Placeholder für individuelle Informationen über Teammitglied 4." },
          ].map((member, index) => (
            <div 
              key={index}
              className="group bg-gray-900/80 hover:bg-gray-800/90 transition-all duration-300 text-white p-6 rounded-2xl shadow-xl border border-white/10 transform hover:scale-105"
            >
              <h3 className="text-2xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">
                {member.name}
              </h3>
              <p className="text-gray-300 group-hover:text-white transition-colors duration-200">
                {member.desc}
              </p>
            </div>
          ))}
        </section>
      </Layout>
    </div>
  );
}

export default AboutPage;