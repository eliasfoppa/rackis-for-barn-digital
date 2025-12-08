import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <div className="section-padding">
        <div className="container text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
            Sidan hittades inte
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Tyvärr kunde vi inte hitta sidan du letade efter. Den kan ha flyttats eller tagits bort.
          </p>
          <Button asChild>
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Tillbaka till startsidan
            </Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
