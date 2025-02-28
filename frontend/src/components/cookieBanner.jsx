import Cookies from "js-cookie";

function CookiesBanner() {

  const acceptCookies = () => {
    Cookies.set("user-prefs", "accepted", { path: "/", expires: 7 });
    Cookies.set("Cookies Consent", "accepted", { path: "/" });
    // Optional: Reload the page or hide the cookie banner
    window.location.reload();
  };

  const showSettings = () => {
    //alert("Customize settings page will be displayed.");
  };

  // Check if the cookie is already set
  if (Cookies.get("user-prefs") === "accepted") {
    return null; // Don't show the cookie banner if the cookie is already set
  }

  return (
    <div
      className="fixed bottom-20 left-1/2 transform -translate-x-1/2 
                bg-black bg-opacity-80 text-white px-6 py-8 rounded-lg
                max-w-md w-11/12 z-20"
    >
      <h2 className="text-2xl font-semibold mb-4">Cookies Message Popup</h2>
      <p className="mb-6">
        This website uses cookies to ensure you get the best experience on our
        website. You consent to our cookies if you continue to use our website.
        We use cookies to analyze our traffic, personalize marketing and to
        provide social media features.
      </p>
      <button
        className="bg-green-500 text-white px-6 py-3 rounded-md
                       mr-4 transition-colors hover:bg-green-600 
                       focus:outline-none"
        onClick={acceptCookies}
      >
        Accept All Cookies
      </button>
      <button
        className="bg-gray-700 text-white px-6 py-3 rounded-md
                       transition-colors hover:bg-gray-800 
                       focus:outline-none"
        onClick={showSettings}
      >
        Customize Settings
      </button>
    </div>
  );
}

export default CookiesBanner;
