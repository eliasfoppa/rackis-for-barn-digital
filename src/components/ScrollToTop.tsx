import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

export function ScrollToTop() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const firstLoad = useRef(true);

  useEffect(() => {
    // Ignore initial load / refresh
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }

    // Scroll only on real navigation (Link clicks)
    if (navigationType === "PUSH") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location, navigationType]);

  return null;
}
