import Header from "../components/Layout_Coms/Header";
import Footer from "../components/Layout_Coms/Footer";


function Layout({ children }) {
  return (
    <div className="flex flex-col h-screen justify-between gap-2">
      <Header className="h-10" />
      {children}
      <Footer className="h-10" />
    </div>
  );
}

export default Layout;