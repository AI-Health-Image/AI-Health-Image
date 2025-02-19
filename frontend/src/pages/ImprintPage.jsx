import Layout from "../layout/Layout";

function ImprintPage() {

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-white">Impressum</h1>
        
        <div className="bg-slate-800 text-white rounded-xl p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Angaben gemäß § 5 TMG</h2>
          <p className="mb-4">
            Firmenname<br />
            Straße Nr.<br />
            PLZ Stadt
          </p>
          
          <h3 className="text-lg font-bold mb-2">Kontakt</h3>
          <p className="mb-4">
            Telefon: +49 (0) xxx xxx xxx<br />
            E-Mail: info@example.com
          </p>
          
          <h3 className="text-lg font-bold mb-2">Vertreten durch</h3>
          <p className="mb-4">
            Vorname Nachname
          </p>
          
          <h3 className="text-lg font-bold mb-2">Umsatzsteuer-ID</h3>
          <p className="mb-4">
            Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:<br />
            DE XXX XXX XXX
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default ImprintPage;