import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from "../../components/ui/button";
import { updateUser } from '../redux/event/eventsSlice'; // Assuming you have a usersSlice

const UserEditModal = ({ user, isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    isAdmin: user.isAdmin,
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ id: user.id, userData: formData }));
    onClose(); // Close the modal after submitting
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-white mb-4">Edit User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white mb-2">
              Username:
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-600 rounded bg-gray-900 text-white placeholder-gray-500"
                placeholder="Enter username"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-600 rounded bg-gray-900 text-white placeholder-gray-500"
                placeholder="Enter email"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2 flex items-center">
              <input
                type="checkbox"
                name="isAdmin"
                checked={formData.isAdmin}
                onChange={handleChange}
                className="mr-2"
              />
              Is Admin
            </label>
          </div>
          <div className="flex gap-4">
            <Button type="submit" size="sm" variant="outline" className="flex-1">
              Save
            </Button>
            <Button type="button" size="sm" variant="destructive" onClick={onClose} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserEditModal;
