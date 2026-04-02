import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SiteHeader from "./components/nav/SiteHeader";
import IframeTestPage from "./pages/iframe-test";
import MarchMadnessMomentsPage from "./pages/MarchMadnessMomentsPage";
import initIframeResizer from "./utils/iframe-resizer.js";

const SHOW_SITE_HEADER = false;

function App() {
  useEffect(() => {
    if (typeof window === "undefined" || window.self === window.top) return;

    const debug = new URLSearchParams(window.location.search).get("iframeDebug") === "1";
    const destroy = initIframeResizer({ debug });
    return () => destroy();
  }, []);

  return (
    <>
      {SHOW_SITE_HEADER ? <SiteHeader /> : null}
      <Routes>
        <Route path="/" element={<MarchMadnessMomentsPage />} />
        <Route path="/world-cup-moments" element={<MarchMadnessMomentsPage />} />
        <Route path="/iframe-test" element={<IframeTestPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
