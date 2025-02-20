import Layout from "../layout/Layout";

function AboutPage() {
  return (
    <div
      className="bg-cover bg-center h-screen"
      style={{ backgroundImage: "url('/mrt-maschin.jpg')" }}
    >
      <Layout>
        <div className="flex flex-col justify-between items-center p-2 rounded m-2 bg-slate-00">
          <div className="max-w-45">
            <img src="werbung01.jpg" alt="werbungsblock" className=""></img>
          </div>
        </div>

        <section className="p-2 grid grid-flow-col justify-center items-center gap-2">
          <div className="max-w-45">
            <img src="werbung01.jpg" alt="werbungsblock" className=""></img>
          </div>
          <div>
            <p className="bg-slate-800 text-white rounded-xl p-2">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam
              voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
              Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
              dolor sit amet.
            </p>
          </div>
        </section>

        <section className="p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded shadow-md">
            <h3 className="text-xl font-bold mb-2">Teammitglied 1</h3>
            <p>
              Placeholder für individuelle Informationen über Teammitglied 1.
            </p>
          </div>
          <div className="bg-white p-4 rounded shadow-md">
            <h3 className="text-xl font-bold mb-2">Teammitglied 2</h3>
            <p>
              Placeholder für individuelle Informationen über Teammitglied 2.
            </p>
          </div>
          <div className="bg-white p-4 rounded shadow-md">
            <h3 className="text-xl font-bold mb-2">Teammitglied 3</h3>
            <p>
              Placeholder für individuelle Informationen über Teammitglied 3.
            </p>
          </div>
          <div className="bg-white p-4 rounded shadow-md">
            <h3 className="text-xl font-bold mb-2">Teammitglied 4</h3>
            <p>
              Placeholder für individuelle Informationen über Teammitglied 4.
            </p>
          </div>
          <div className="bg-white p-4 rounded shadow-md">
            <h3 className="text-xl font-bold mb-2">Teammitglied 5</h3>
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