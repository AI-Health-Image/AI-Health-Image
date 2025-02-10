import Header from "../components/Layout_Coms/Header";
import Footer from "../components/Layout_Coms/Footer";


function Layout({ children }) {
  return (
    <div className="container mx-auto mt-2 h-screen">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;