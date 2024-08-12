import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const ProtectedRoute = ({ element, adminOnly }) => {
  const { isLoggedIn, isAdmin } = useSelector((state) => state.auth);
  const token = localStorage.getItem('token')
  console.log("PR Token: " + token);
  
  if (!token) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/login" />;
  }

  return element;
};
