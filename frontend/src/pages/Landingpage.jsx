import Layout from "../layout/layout";

function HomePage() {
  return (
    <Layout>
      <div className="flex flex-col justify-between items-center p-2 border rounded m-2 bg-slate-400">
        <iframe
          className="w-full min-h-80"
          src="https://www.youtube.com/embed/aj1Xj-WN8uo?si=UHPSDRxEEQSvAmNE"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>

      <div className="flex justify-between items-center gap-2">
        <img src="werbung.jpg" alt="werbungsblock" className="w-20" ></img>
        <p className=" bg-amber-600 p-2">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
      </div>
    </Layout>
  );
}
export default HomePage;
