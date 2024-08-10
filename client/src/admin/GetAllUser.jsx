import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../../components/ui/table";
import { Button } from "../../components/ui/button";
import { fetchUsers, deleteUser, updateUser } from "../redux/event/eventsSlice"; 
import UserEditModal from "../sourceComponents/UserEditModal"; 

export default function GetAllUsers() {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.events);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // console.log("Users: " + users);
  
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = async (user) => {
    const confirm = window.confirm(`Are you sure you want to delete the user: ${user.username}?`);
    if (confirm) {
      try {
        await dispatch(deleteUser(user.id)).unwrap(); // Unwrap to get the resolved value
        alert('User deleted successfully');
        dispatch(fetchUsers()); // Refresh users after deletion
      } catch (err) {
        console.error('Failed to delete user:', err);
        alert('Failed to delete the user');
      }
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Is Admin</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.isAdmin ? "Yes" : "No"}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(user)}>
                    Edit
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(user)}>
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedUser && (
        <UserEditModal
          user={selectedUser}
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onUpdate={(updatedUser) => dispatch(updateUser({ id: selectedUser.id, userData: updatedUser }))}
        />
      )}
    </div>
  );
}
