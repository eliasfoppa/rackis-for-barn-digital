import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

export function ScrollManager() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const isFirstMount = useRef(true);

  // SAVE scroll position BEFORE page unload (refresh / redirect)
  useEffect(() => {
    const saveScroll = () => {
      sessionStorage.setItem(
        `scroll:${location.pathname}`,
        String(window.scrollY)
      );
    };

    window.addEventListener("beforeunload", saveScroll);
    return () => window.removeEventListener("beforeunload", saveScroll);
  }, [location.pathname]);

  // RESTORE scroll AFTER mount / navigation
  useEffect(() => {
    const saved = sessionStorage.getItem(
      `scroll:${location.pathname}`
    );

    // First mount = refresh OR direct load
    if (isFirstMount.current) {
      isFirstMount.current = false;

      if (saved !== null) {
        setTimeout(() => {
          window.scrollTo(0, Number(saved));
        }, 0);
      }

      return;
    }

    // Link navigation → scroll to top
    if (navigationType === "PUSH") {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, navigationType]);

  return null;
}
