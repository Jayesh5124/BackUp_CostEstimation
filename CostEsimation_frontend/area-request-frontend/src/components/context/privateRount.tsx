import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth(); // Retrieve isAuthenticated status from AuthContext
  
  return isAuthenticated ? children : <Navigate to="/login" />;;
};

export default PrivateRoute;
