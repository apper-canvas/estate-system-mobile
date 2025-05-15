import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

function NotFound() {
  const HomeIcon = getIcon('Home');
  const AlertTriangleIcon = getIcon('AlertTriangle');
  const ArrowLeftIcon = getIcon('ArrowLeft');
  
  const [countdown, setCountdown] = useState(10);
  
  useEffect(() => {
    if (countdown <= 0) {
      window.location.href = '/';
      return;
    }
    
    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [countdown]);
  
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6 inline-flex justify-center items-center h-24 w-24 rounded-full bg-red-100 dark:bg-red-900/30 text-red-500">
            <AlertTriangleIcon className="h-12 w-12" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
          <p className="text-surface-600 dark:text-surface-400 mb-8">
            Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
          </p>
          
          <div className="space-y-4">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 btn btn-primary w-full justify-center"
            >
              <HomeIcon className="w-4 h-4" />
              Return to Home
            </Link>
            
            <div className="text-sm text-surface-500 dark:text-surface-400">
              Redirecting to home in {countdown} seconds...
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default NotFound;