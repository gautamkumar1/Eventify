/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { bookTicket } from '../redux/bookTicket/bookTicketSlice';
import { toast } from 'react-toastify';
import { loadStripe } from '@stripe/stripe-js';
import StripeCheckout from 'react-stripe-checkout';
import { Button } from '../../components/ui/button';
// const stripePromise = loadStripe('pk_test_51PTZieP9lvJdVilSFGGLEcIIUwEhr3zb6m9x0eFtdPCnI2mQwImEjuzQfctij8tIStYqvV3ybBFLdy8qJadMHn7600z3Zj30Yb'); // Replace with your Stripe publishable key

const BookTicket = () => {
  const dispatch = useDispatch();
  const { status, error, sessionId } = useSelector((state) => state.tickets);

  const [formData, setFormData] = useState({
    quantity: '',
    price: '',
    fullname: '',
    ticketType: '',
    event: '',
    email: ''
  });

  // Handle change in form input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const onToken = async (token) => {
    console.log(token);
    const dataWithToken = { ...formData, token };
    try {
      dispatch(bookTicket(dataWithToken));
      toast.success("Ticket Booking Successful");
      setFormData({
        quantity: '',
        price: '',
        fullname: '',
        ticketType: '',
        event: '',
        email: ''
      })
    } catch (error) {
      console.log(error);

    }
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 p-4">
      <form

        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg"
      >
        <h2 className="text-2xl font-semibold text-white mb-6">Book Your Ticket</h2>

        {/* Form Fields */}
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-600 rounded bg-gray-700 text-white placeholder-gray-400"
            placeholder="Enter quantity"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-600 rounded bg-gray-700 text-white placeholder-gray-400"
            placeholder="Enter price"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Full Name:</label>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-600 rounded bg-gray-700 text-white placeholder-gray-400"
            placeholder="Enter your full name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Ticket Type:</label>
          <input
            type="text"
            name="ticketType"
            value={formData.ticketType}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-600 rounded bg-gray-700 text-white placeholder-gray-400"
            placeholder="Enter ticket type"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Event:</label>
          <input
            type="text"
            name="event"
            value={formData.event}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-600 rounded bg-gray-700 text-white placeholder-gray-400"
            placeholder="Enter event name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-600 rounded bg-gray-700 text-white placeholder-gray-400"
            placeholder="Enter your email"
          />
        </div>

        {/* Submit Button */}
        {/* <button 
          type="submit" 
          disabled={status === 'loading'}
          className={`w-full py-3 rounded-lg text-white ${status === 'loading' ? 'bg-gray-600' : 'bg-blue-600 hover:bg-blue-700'} transition`}
        >
          {status === 'loading' ? 'Booking...' : 'Book Ticket'}
        </button> */}
        <div className='flex items-center justify-center'>
        <StripeCheckout
        token={onToken}
        stripeKey="pk_test_51PTZieP9lvJdVilSFGGLEcIIUwEhr3zb6m9x0eFtdPCnI2mQwImEjuzQfctij8tIStYqvV3ybBFLdy8qJadMHn7600z3Zj30Yb"
      >
        <Button>Book Ticket</Button>
      </StripeCheckout>
        </div>
        {status === 'failed' && <p className="text-red-500 mt-4">Error: {error}</p>}
      </form>
      
     
    </div>
  );
};

export default BookTicket;
