import Layout from "../layout/Layout";

function PrivacyPage() {
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-slate-800 text-white rounded-xl p-6 mb-6">
            <div className="flex justify-center">
              <h1 className="text-3xl font-bold mb-6">Datenschutzerklärung</h1>
            </div>
            
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">1. Datenschutz auf einen Blick</h2>
                <p className="mb-4">
                  Allgemeine Hinweise zum Datenschutz und wie wir mit Ihren Daten umgehen.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">2. Verantwortliche Stelle</h2>
                <p className="mb-4">
                  [Firmenname]<br />
                  [Straße Nr.]<br />
                  [PLZ Stadt]<br />
                  Telefon: [Telefonnummer]<br />
                  E-Mail: [E-Mail-Adresse]
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">3. Datenerfassung auf unserer Website</h2>
                <p className="mb-4">
                  Informationen zur Datenerfassung, Cookies und Analysewerkzeugen.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">4. Ihre Rechte</h2>
                <p className="mb-4">
                  Sie haben das Recht auf Auskunft, Berichtigung oder Löschung Ihrer Daten.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default PrivacyPage;