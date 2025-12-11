import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

// Get the base path that was set in vite.config.ts and used in App.tsx
const BASE_PATH = import.meta.env.VITE_APP_BASE || '';

const GitHubRedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Check if a path was saved by the 404.html script in public/
    const redirectPath = sessionStorage.getItem('redirectPath');
    
    if (redirectPath) {
      // 2. Clean up the path: remove the full repository base path 
      // Example: '/rackis-for-barn-digital/about' becomes '/about'
      const routeToNavigate = redirectPath.replace(BASE_PATH, '/');
      
      // 3. Navigate internally using React Router to the intended page.
      // { replace: true } prevents the user from hitting the broken URL in history.
      navigate(routeToNavigate, { replace: true });
      
      // 4. Clear the storage so the redirect doesn't happen on subsequent visits.
      sessionStorage.removeItem('redirectPath');
    }
  }, [navigate]);
  
  // This component renders nothing; its sole purpose is side effects (navigation).
  return null; 
};

export default GitHubRedirectHandler;