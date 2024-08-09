import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createTicket } from "../redux/tickets/ticketsSlice";

const TicketCreationPage = () => {
  const [ticket, setTicket] = useState({
    eventname: "",
    type: "",
    price: 0,
    available: 0,
  });

  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.tickets);

  useEffect(() => {
    if (status === "succeeded") {
      toast.success("Ticket created successfully");
      setTicket({ eventname: "", type: "", price: 0, available: 0 });
    }
    if (status === "failed" && error) {
      toast.error("Create ticket failed: " + error);
    }
  }, [status, error]);

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setTicket({ ...ticket, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createTicket(ticket));
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create Event Ticket</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="eventName">Event Name</Label>
              <Input
                id="eventName"
                name="eventname"
                value={ticket.eventname}
                onChange={handleInput}
                placeholder="Enter event name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ticketType">Ticket Type</Label>
              <Input
                id="ticketType"
                name="type"
                value={ticket.type}
                onChange={handleInput}
                placeholder="Enter ticket type"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                name="price"
                value={ticket.price}
                onChange={handleInput}
                placeholder="Enter price"
                min="0"
                step="0.01"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="available">Available Tickets</Label>
              <Input
                id="available"
                type="number"
                name="available"
                value={ticket.available}
                onChange={handleInput}
                placeholder="Enter number of available tickets"
                min="1"
                required
              />
            </div>
            <Button type="submit" className="w-full">Create Ticket</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TicketCreationPage;
