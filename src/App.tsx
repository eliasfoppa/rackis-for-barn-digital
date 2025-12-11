import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Impressum from "./pages/Impressum";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import Buy from "./pages/Buy";
import Donate from "./pages/Donate";

const queryClient = new QueryClient();

// Keep BASENAME fixed to the root path
const BASENAME = '';

const App = () => (
  // START ISOLATION: Remove external providers one by one if necessary
  
  // Keep the most necessary provider, but remove others if this still fails.
  <QueryClientProvider client={queryClient}>
    {/* Temporarily remove TooltipProvider if the red test box does not show up */}
    <TooltipProvider> 
      <Toaster />
      <Sonner />
      
      <BrowserRouter basename={BASENAME}>
        {/* CRITICAL STEP: TEMPORARILY COMMENT OUT THE CUSTOM HANDLER. 
           This is the most likely culprit for an application-wide crash. */}
        {/* <GitHubRedirectHandler /> */}
        
        <ScrollToTop />  
        
        <Routes>
          {/* CRITICAL TEST: Replace <Index /> with guaranteed visible HTML */}
          <Route path="/" element={
            <div style={{ 
              padding: '50px', 
              backgroundColor: 'red', 
              color: 'white', 
              fontSize: '24px',
              textAlign: 'center'
            }}>
                DEPLOYMENT FIXED! IF YOU SEE THIS, THE ISSUE IS IN Index.tsx
            </div>
          } />
          
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  // END ISOLATION
);

export default App;