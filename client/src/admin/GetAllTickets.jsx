import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../../components/ui/table";
import { Button } from "../../components/ui/button";
import { getTickets, deleteTicket } from "../redux/tickets/ticketsSlice";
import TicketEditModal from "../sourceComponents/TicketEditModal";

export default function GetAllTickets() {
  const dispatch = useDispatch();
  const { tickets = [], status, error } = useSelector((state) => state.tickets);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);

  const handleEdit = (ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const handleDelete = async (ticket) => {
    const confirm = window.confirm(`Are you sure you want to delete the ticket for event: ${ticket.eventname}?`);
    if (confirm) {
      try {
        await dispatch(deleteTicket(ticket.id)).unwrap(); // Unwrap to get the resolved value
        alert('Ticket deleted successfully');
        dispatch(getTickets()); // Refresh tickets after deletion
      } catch (err) {
        console.error('Failed to delete ticket:', err);
        alert('Failed to delete the ticket');
      }
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedTicket(null);
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
            <TableHead>Event Name</TableHead>
            <TableHead>Ticket Type</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Available</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.isArray(tickets) && tickets.map((ticket) => (
            <TableRow key={ticket.id}>
              <TableCell className="font-medium">{ticket.eventname}</TableCell>
              <TableCell>{ticket.type}</TableCell>
              <TableCell>{ticket.price}</TableCell>
              <TableCell>{ticket.available}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(ticket)}>
                    Edit
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(ticket)}>
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedTicket && (
        <TicketEditModal
          ticket={selectedTicket}
          isOpen={isModalOpen}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
}
