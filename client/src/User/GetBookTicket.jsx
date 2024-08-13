/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from 'axios';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../../components/ui/table";

export default function GetBookTicket() {
  const [bookedTickets, setBookedTickets] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookedTickets = async () => {
      setStatus('loading');
      try {
        const response = await axios.get('/api/ticket/get-booked-ticket-user');
        setBookedTickets(response.data.bookings); // Update state with the fetched data
        setStatus('succeeded');
      } catch (err) {
        setError(err.response ? err.response.data : 'An error occurred');
        setStatus('failed');
      }
    };

    fetchBookedTickets();
  }, []);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // if (status === "failed") {
  //   return <div>Error: {error}</div>;
  // }
  if(bookedTickets.length === 0){
    return <div className="bg-black min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-4xl font-semibold text-white">
      Oops! 🚫 No ticket found.
      </h1>
    </div>
  </div>
  }
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ticket ID</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Ticket Type</TableHead>
            <TableHead>Event Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.isArray(bookedTickets) && bookedTickets.map((ticket) => (
            <TableRow key={ticket.id}>
              <TableCell className="font-medium">{ticket.ticketId}</TableCell>
              <TableCell>{ticket.fullname}</TableCell>
              <TableCell>{ticket.email}</TableCell>
              <TableCell>{ticket.ticketType}</TableCell>
              <TableCell>{ticket.event}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
