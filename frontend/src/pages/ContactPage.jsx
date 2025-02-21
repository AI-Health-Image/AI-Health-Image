import Layout from "../layout/Layout";

function ContactPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div
      className="bg-cover bg-center h-screen"
      
    >
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 text-white">Kontakt</h1>
          
          <div className="bg-slate-800 rounded-xl p-6 max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-white mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-2 rounded-md bg-white"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-white mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-2 rounded-md bg-white"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-white mb-2">Nachricht</label>
                <textarea
                  id="message"
                  rows="4"
                  className="w-full p-2 rounded-md bg-white"
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
              >
                Senden
              </button>
            </form>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default ContactPage;
