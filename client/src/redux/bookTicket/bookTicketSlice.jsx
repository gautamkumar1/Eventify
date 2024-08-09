import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Create the bookTickets thunk
export const bookTickets = createAsyncThunk(
  'tickets/bookTickets',
  async (ticketData, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Not authenticated');
    }
    try {
      const response = await axios.post('/api/ticket/book-tickets', ticketData,{
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        
        return rejectWithValue(error.response.data);
      } else {
        
        return rejectWithValue('An error occurred while booking the tickets');
      }
    }
  }
);


const bookTicketsSlice = createSlice({
    name: 'tickets',
    initialState: {
      bookingStatus: 'idle',
      bookingError: null,
      bookingResponse: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(bookTickets.pending, (state) => {
          state.bookingStatus = 'loading';
          state.bookingError = null;
        })
        .addCase(bookTickets.fulfilled, (state, action) => {
          state.bookingStatus = 'succeeded';
          state.bookingResponse = action.payload;
        })
        .addCase(bookTickets.rejected, (state, action) => {
          state.bookingStatus = 'failed';
          state.bookingError = action.payload;
        });
    },
  });
  
  export default bookTicketsSlice.reducer;