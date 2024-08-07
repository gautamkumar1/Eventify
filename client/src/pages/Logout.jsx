
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logoutUser } from '../redux/auth/authSlice';

const Logout = () => {
  const dispatch = useDispatch();
  const { isLoading} = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap() // This allows handling of fulfilled or rejected actions directly
      .then(() => {
        toast.success('Logout successful');
        navigate('/')
      })
      .catch((error) => {
        // Handle errors here
        toast.error('Logout failed');
        console.error(error);
      });
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className="btn btn-primary"
    >
      {isLoading ? 'Logging out...' : 'Logout'}
    </button>
  );
};

export default Logout;
