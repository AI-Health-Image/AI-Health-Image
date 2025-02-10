import Layout from "../layout/Layout";

function HomePage() {
  return (
    <Layout>
      <div>
        <iframe
          className="w-full min-h-screen"
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
