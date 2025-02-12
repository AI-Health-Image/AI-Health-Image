import Layout from "../layout/layout";

function HomePage() {
  return (
    <Layout>
    
      <div className="flex flex-col justify-between items-center p-2 rounded m-2 bg-slate-00">
      <div className="max-w-45"><img src="werbung01.jpg" alt="werbungsblock" className="" ></img></div>
      </div>



<section className=" p-2 grid grid-flow-col justify-center items-center gap-2"> 
<div className="max-w-45"><img src="werbung01.jpg" alt="werbungsblock" className="" ></img></div>
<div><p className=" bg-slate-800 text-white rounded-xl p-2">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p></div>
<iframe
          className="w-full xl:min-h-60 min-h-80"
          src="https://www.youtube.com/embed/aj1Xj-WN8uo?si=UHPSDRxEEQSvAmNE"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>

</section>


    </Layout>
  );
}
export default HomePage;
