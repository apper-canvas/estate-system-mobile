import { useState, useEffect, createContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { AnimatePresence, motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';

import { setUser, clearUser } from './store/userSlice';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Callback from './pages/Callback';
import ErrorPage from './pages/ErrorPage';
import ProtectedRoute from './components/ProtectedRoute';
import getIcon from './utils/iconUtils';

// Create authentication context
export const AuthContext = createContext(null);

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Check if user has dark mode preference
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('darkMode');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return savedMode !== null ? savedMode === 'true' : prefersDark;
    }
    return false;
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isInitialized, setIsInitialized] = useState(false);
  
  const MoonIcon = getIcon('Moon');
  const SunIcon = getIcon('Sun');
  const HomeIcon = getIcon('Home');

  useEffect(() => {
    // Apply dark mode to document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Save preference to localStorage
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);
  
  // Get authentication status with proper error handling
  const userState = useSelector((state) => state.user);
  const isAuthenticated = userState?.isAuthenticated || false;
  
  // Initialize ApperUI once when the app loads
  useEffect(() => {
    const { ApperClient, ApperUI } = window.ApperSDK;
    const client = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    // Initialize but don't show login yet
    ApperUI.setup(client, {
      target: '#authentication',
      clientId: import.meta.env.VITE_APPER_PROJECT_ID,
      view: 'both',
      onSuccess: function (user) {
        setIsInitialized(true);
        // CRITICAL: This exact currentPath logic must be preserved in all implementations
        // DO NOT simplify or modify this pattern as it ensures proper redirection flow
        let currentPath = window.location.pathname + window.location.search;
        let redirectPath = new URLSearchParams(window.location.search).get('redirect');
        const isAuthPage = currentPath.includes('/login') || currentPath.includes('/signup') || currentPath.includes(
            '/callback') || currentPath.includes('/error');
        if (user) {
          // User is authenticated
          if (redirectPath) {
            navigate(redirectPath);
          } else if (!isAuthPage) {
            if (!currentPath.includes('/login') && !currentPath.includes('/signup')) {
              navigate(currentPath);
            } else {
              navigate('/');
            }
          } else {
            navigate('/');
          }
          // Store user information in Redux
          dispatch(setUser(JSON.parse(JSON.stringify(user))));
        } else {
          // User is not authenticated
          if (!isAuthPage) {
            navigate(
              currentPath.includes('/signup')
               ? `/signup?redirect=${currentPath}`
               : currentPath.includes('/login')
               ? `/login?redirect=${currentPath}`
               : '/login');
          } else if (redirectPath) {
            if (
              ![
                'error',
                'signup',
                'login',
                'callback'
              ].some((path) => currentPath.includes(path)))
              navigate(`/login?redirect=${redirectPath}`);
            else {
              navigate(currentPath);
            }
          } else if (isAuthPage) {
            navigate(currentPath);
          } else {
            navigate('/login');
          }
          dispatch(clearUser());
        }
      },
      onError: function(error) {
        console.error("Authentication failed:", error);
      }
    });
  }, [dispatch, navigate]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white dark:bg-surface-800 shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <a href="/" className="flex items-center gap-2">
            <HomeIcon className="w-7 h-7 text-primary" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              EstateVue
            </span>
          </a>
          
          <div className="flex items-center gap-4">
            {isAuthenticated && (
              <button
                onClick={() => {
                  const { ApperUI } = window.ApperSDK;
                  ApperUI.logout();
                  dispatch(clearUser());
                  navigate('/login');
                }}
                className="text-sm font-medium text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light transition-colors"
              >Logout</button>
            )}
            <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={darkMode ? 'dark' : 'light'}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {darkMode ? (
                  <SunIcon className="w-5 h-5 text-yellow-400" />
                ) : (
                  <MoonIcon className="w-5 h-5 text-surface-600" />
                )}
              </motion.div>
            </AnimatePresence>
          </button>
          </div>
        </div>
      </header>
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <AuthContext.Provider 
            value={{ 
              isAuthenticated,
              user: userState?.user,
              logout: () => {
                const { ApperUI } = window.ApperSDK;
                ApperUI.logout();
                dispatch(clearUser());
              }
            }}
          >
          <Routes>
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/callback" element={<Callback />} />
            <Route path="/error" element={<ErrorPage />} />
          </Routes>
          </AuthContext.Provider>
        </AnimatePresence>
      </main>
      
      <footer className="bg-white dark:bg-surface-800 py-6 mt-auto">
        <div className="container mx-auto px-4 text-center text-surface-500 dark:text-surface-400 text-sm">
          © {new Date().getFullYear()} EstateVue. All rights reserved.
        </div>
      </footer>
      
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
        toastClassName="rounded-lg shadow-lg"
      />
    </div>
  );
}

export default App;