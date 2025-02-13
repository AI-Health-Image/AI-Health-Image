import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landingpage from "./pages/Landingpage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ImprintPage from "./pages/ImprintPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import PrivacyPage from "./pages/PrivacyPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import UploadbuttonPage from "./pages/UploadbuttonPage.jsx";
import UserSettingsPage from "./pages/UserSettingsPage.jsx";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/imprint" element={<ImprintPage />}/>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/upload" element={<UploadbuttonPage />} />
          <Route path="/settings" element={<UserSettingsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
