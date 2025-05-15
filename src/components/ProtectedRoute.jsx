import { useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../App';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to login with current path for redirect after login
      navigate(`/login?redirect=${location.pathname}${location.search}`);
    }
  }, [isAuthenticated, navigate, location]);

  return isAuthenticated ? children : null;
};

export default ProtectedRoute;