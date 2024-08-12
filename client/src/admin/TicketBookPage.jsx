/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import StripeCheckout from "react-stripe-checkout";
import { bookTicket } from "../redux/bookTicket/bookTicketSlice";
import { Button } from "../../components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../../components/ui/table";

export default function TicketBookPage() {
  const dispatch = useDispatch();
  const { status, error, sessionId } = useSelector((state) => state.tickets);
  const [tickets, setTickets] = useState([]);
  const [formData, setFormData] = useState({
    quantity: "",
    price: "",
    fullname: "",
    ticketType: "",
    event: "",
    email: "",
  });

  // Fetch tickets from API
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch("/api/ticket/get-tickets");
        const data = await response.json();
        setTickets(data.data); // Set tickets data from API response
      } catch (error) {
        console.log("Error fetching tickets:", error);
      }
    };

    fetchTickets();
  }, []);

  // Handle change in form input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (error) {
    console.log(error);
  }

  // Handle Payment checkout
  const onToken = async (token) => {
    const dataWithToken = { ...formData, token };
    try {
      dispatch(bookTicket(dataWithToken));
      toast.success("Ticket Booking Successful");
      setFormData({
        quantity: "",
        price: "",
        fullname: "",
        ticketType: "",
        event: "",
        email: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full">
      <section className="bg-[#262626] bg-cover bg-center py-24 md:py-32 lg:py-40">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Secure Your Spot Today!
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              Get ready for an unforgettable experience at Event Name. Whether
              you're coming with friends, family, or solo, we have the perfect
              ticket for you. Choose from our range of ticket options to fit
              your needs and enjoy a seamless booking process.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Div */}
            <div>
              <form className="grid gap-6">
                <h1 className="text-3xl font-bold tracking-tight sm:text-3xl lg:text-3xl text-center">
                  Book Ticket
                </h1>
                <p className="text-red-500 text-center">
                  ⚠️ Carefully enter the event name to book the ticket
                  successfully
                </p>
                <div className="grid gap-2">
                  <Label>Full Name</Label>
                  <Input
                    id="name"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="event">Event Name</Label>
                  <Input
                    id="event"
                    name="event"
                    placeholder="Enter event name"
                    value={formData.event}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="ticket-type">Ticket Type</Label>
                  <Input
                    id="ticket-type"
                    name="ticketType"
                    placeholder="Enter event name"
                    value={formData.ticketType}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </form>
              <div className="flex items-center justify-center mt-4">
                <StripeCheckout
                  token={onToken}
                  stripeKey="pk_test_51PTZieP9lvJdVilSFGGLEcIIUwEhr3zb6m9x0eFtdPCnI2mQwImEjuzQfctij8tIStYqvV3ybBFLdy8qJadMHn7600z3Zj30Yb"
                >
                  <Button type="button" size="lg">
                    Book Ticket
                  </Button>
                </StripeCheckout>
              </div>
            </div>

            {/* Right Div */}
            <div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event Name</TableHead>
                    <TableHead>Ticket Type</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="text-primary">
                      Tickets Available
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tickets.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell>{ticket.eventname}</TableCell>
                      <TableCell>{ticket.type}</TableCell>
                      <TableCell>Rs.{ticket.price}</TableCell>
                      <TableCell className="text-primary font-medium">
                        {ticket.available}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
