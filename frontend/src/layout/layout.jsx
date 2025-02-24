import Header from "../components/Layout_Coms/Header";
import Footer from "../components/Layout_Coms/Footer";

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow relative z-10">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;