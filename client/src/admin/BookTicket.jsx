
import { Label } from "../../components/ui/label"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../../components/ui/table"
import { useState } from "react"
import { loadStripe } from "@stripe/stripe-js"

export default function BookTicket() {
    const [book,setBook] = useState({
        ticketId: "",
        fullname: "",
        email: "",
        eventname: "",
        ticketType: "",
        quantity:0,
        price: 0,
    })
    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setBook({ ...book, [name]: value });
        // console.log("Updated Book Data:", { ...book, [name]: value });
      };
    //   const handleBookTicket = () => {
    //     console.log("Final Book Data Before Submission:", book);
    //     // Dispatch the bookTickets thunk here if needed
    //     // dispatch(bookTickets(book));
    // };

    const makePayment = async()=>{
        const stripe = await loadStripe("pk_test_51PTZieP9lvJdVilSFGGLEcIIUwEhr3zb6m9x0eFtdPCnI2mQwImEjuzQfctij8tIStYqvV3ybBFLdy8qJadMHn7600z3Zj30Yb");

        const body = {
            bookData:book
        }
        const headers = {
            "Content-Type":"application/json"
        }
        const response = await fetch("http://localhost:3000/create-checkout-session",{
            method:"POST",
            headers:headers,
            body:JSON.stringify(body)
        });

        const session = await response.json();

        const result = stripe.redirectToCheckout({
            sessionId:session.id
        });
        
        if(result.error){
            console.log(result.error);
        }
    }
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-background rounded-lg shadow-lg p-6 sm:p-8 lg:p-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Ticket Booking</h2>
          <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="grid gap-2">
              <Label htmlFor="ticket-id">Ticket ID</Label>
              <Input id="ticket-id" name="ticketId" value={book.ticketId} onChange={handleInput} placeholder="Enter ticket ID" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="full-name">Full Name</Label>
              <Input id="full-name" name="fullname" value={book.fullname} onChange={handleInput} placeholder="Enter your full name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" name="email" value={book.email} onChange={handleInput} placeholder="Enter your email" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="event-name">Event Name</Label>
              <Input id="event-name" name="eventname" value={book.eventname} onChange={handleInput} placeholder="Enter event name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="event-name">Ticket Type</Label>
              <Input id="ticket-type" name="ticketType" value={book.ticketType} onChange={handleInput} placeholder="Enter event ticket type" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price">Price</Label>
              <Input id="price" name="price" type="number" value={book.price} onChange={handleInput} placeholder="Enter ticket price" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input id="quantity" name="quantity" type="number" value={book.quantity} onChange={handleInput} placeholder="Enter quantity" />
            </div>
            <div className="col-span-2 flex justify-end">
              <Button type="button" onClick={makePayment} className="w-full sm:w-auto">
                Book Ticket
              </Button>
            </div>
          </form>
        </div>
        <div className="bg-background rounded-lg shadow-lg p-6 sm:p-8 lg:p-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Available Tickets</h2>
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket ID</TableHead>
                  <TableHead>Full Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Event Name</TableHead>
                  <TableHead>Ticket Type</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Payment Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>TKT001</TableCell>
                  <TableCell>John Doe</TableCell>
                  <TableCell>john@example.com</TableCell>
                  <TableCell>Music Festival</TableCell>
                  <TableCell>General Admission</TableCell>
                  <TableCell>$50.00</TableCell>
                  <TableCell>2</TableCell>
                  <TableCell>Paid</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>TKT002</TableCell>
                  <TableCell>Jane Smith</TableCell>
                  <TableCell>jane@example.com</TableCell>
                  <TableCell>Art Exhibition</TableCell>
                  <TableCell>VIP</TableCell>
                  <TableCell>$100.00</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>Pending</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>TKT003</TableCell>
                  <TableCell>Bob Johnson</TableCell>
                  <TableCell>bob@example.com</TableCell>
                  <TableCell>Comedy Show</TableCell>
                  <TableCell>Student</TableCell>
                  <TableCell>$25.00</TableCell>
                  <TableCell>3</TableCell>
                  <TableCell>Unpaid</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}