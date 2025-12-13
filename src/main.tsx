import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";

// Restore route after GitHub Pages refresh
const savedPath = sessionStorage.getItem("gh-pages-path");
if (savedPath) {
  sessionStorage.removeItem("gh-pages-path");
  window.history.replaceState(null, "", savedPath);
}

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
