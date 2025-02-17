import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";

import CookiesBanner from "./components/cookieBanner.jsx";
import Landingpage from "./pages/Landingpage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ImprintPage from "./pages/ImprintPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import PrivacyPage from "./pages/PrivacyPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import UploadbuttonPage from "./pages/UploadbuttonPage.jsx";
import UserSettingsPage from "./pages/UserSettingsPage.jsx";
import AnalysisPage from "./pages/Analysis-Page.jsx";
import useJwtStore from "./components/jwtStore";
import ArchivPage from "./pages/ArchivPage.jsx";


function App() {
  const setJwt = useJwtStore((state) => state.setJwt);

  useEffect(() => {
    const token = Cookies.get("jwt");
    if (token) {
      setJwt(token);
    }
  }, [setJwt]);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/imprint" element={<ImprintPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/upload" element={<UploadbuttonPage />} />
          <Route path="/settings" element={<UserSettingsPage />} />
          <Route path="/analyse/:id" element={<AnalysisPage />} />
          <Route path="/archiv" element={<ArchivPage />} />
        </Routes>
      </BrowserRouter>
      <CookiesBanner />
    </div>
  );
}

export default App;
