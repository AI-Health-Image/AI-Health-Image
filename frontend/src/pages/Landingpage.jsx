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
    </Layout>
  );
}
export default HomePage;
