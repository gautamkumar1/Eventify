// components/EventEditModal.jsx
import { useState } from 'react';
import { Button } from "../../components/ui/button";
import { useDispatch } from 'react-redux';
import { updateTicket } from "../redux/tickets/ticketsSlice";

const TicketEditModal = ({ ticket, isOpen, onClose }) => {
  const [ticketData, setTicketData] = useState({
    eventname: ticket.eventname,
    type: ticket.type,
    price: ticket.price,
    available: ticket.available,
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setTicketData({
      ...ticketData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateTicket({ id: ticket.id, ticketData: setTicketData }));
    onClose(); // Close the modal after submitting
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-white mb-4">Edit Ticket</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white mb-2">
              Event Name:
              <input
                type="text"
                name="eventname"
                value={ticketData.eventname}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-600 rounded bg-gray-900 text-white placeholder-gray-500"
                placeholder="Enter event name"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">
              Ticket Type:
              <input
                type="text"
                name="type"
                value={ticketData.type}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-600 rounded bg-gray-900 text-white placeholder-gray-500"
                placeholder="Enter ticket type"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">
              Price:
              <input
                type="number"
                name="price"
                placeholder="Enter ticket price"
                value={ticketData.price}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-600 rounded bg-gray-900 text-white placeholder-gray-500"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">
            Available:
              <input
                type="number"
                name="available"
                value={ticketData.available}
                onChange={handleChange}
                className="w-full p-3 border border-gray-600 rounded bg-gray-900 text-white placeholder-gray-500"
                placeholder="Enter ticket available"
              />
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

export default TicketEditModal;
