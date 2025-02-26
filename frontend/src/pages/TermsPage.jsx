import Layout from "../layout/Layout";

function TermsPage() {
  return (
    <div className="bg-cover bg-center min-h-screen" 
         style={{ backgroundImage: "url('/mrt-maschin.jpg')" }}>
      <Layout>
        <div className="container mx-auto p-6">
          <h1 className="text-3xl font-bold text-white mb-6">Nutzungsbedingungen</h1>
          
          <div className="bg-slate-800/60 rounded-xl p-6 text-white space-y-6">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Allgemeines</h2>
              <p className="mb-4">
                Diese Nutzungsbedingungen regeln die Nutzung des Health Image Analyzer Services.
                Mit der Nutzung unserer Dienste stimmen Sie diesen Bedingungen zu.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Nutzungsrechte</h2>
              <p className="mb-4">
                Der Nutzer erhält das nicht-exklusive Recht, den Service für medizinische
                Bildanalysen zu verwenden.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Datenschutz</h2>
              <p className="mb-4">
                Wir verarbeiten Ihre Daten gemäß unserer Datenschutzerklärung und
                den geltenden Datenschutzgesetzen.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Haftung</h2>
              <p className="mb-4">
                Die Analyse-Ergebnisse dienen als Unterstützung und ersetzen nicht
                die Diagnose durch medizinisches Fachpersonal.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Änderungen</h2>
              <p className="mb-4">
                Wir behalten uns das Recht vor, diese Nutzungsbedingungen jederzeit
                zu ändern. Änderungen werden vorher angekündigt.
              </p>
            </section>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default TermsPage;