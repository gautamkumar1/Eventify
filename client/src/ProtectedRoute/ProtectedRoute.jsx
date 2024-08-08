
import { useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { isAuthenticated } = useAuth0();
  console.log("isAuthenticated: ", isAuthenticated);

  if (isLoggedIn || isAuthenticated) {
    return element;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
