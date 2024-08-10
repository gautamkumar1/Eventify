import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the bookTicket thunk
export const bookTicket = createAsyncThunk(
  'tickets/bookTicket',
  async (ticketData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/ticket/book-tickets', ticketData);
      return response.data; // This should include sessionId
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Define the initial state
const initialState = {
  booking: null,
  sessionId: null, // Add sessionId to the state
  status: 'idle',
  error: null,
};

// Create the slice
const ticketSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(bookTicket.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(bookTicket.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.booking = action.payload.Book_Ticket;
        state.sessionId = action.payload.sessionId; // Store sessionId in the state
      })
      .addCase(bookTicket.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default ticketSlice.reducer;
