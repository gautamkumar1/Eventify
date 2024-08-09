/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  tickets: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Create an async thunk for creating a ticket
export const createTicket = createAsyncThunk(
  'tickets/createTicket',
  async (ticketData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/ticket/create-tickets', ticketData);
      return response.data; // Adjust based on your API response
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// Create an async thunk for fetching tickets
export const getTickets = createAsyncThunk(
    'tickets/getTickets',
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get('/api/ticket/get-tickets');
        // Ensure this matches the expected format
        return response.data.data; // Adjust based on actual API response
      } catch (error) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data);
        } else {
          return rejectWithValue(error.message);
        }
      }
    }
  );
  

// Create an async thunk for updating a ticket
export const updateTicket = createAsyncThunk(
  'tickets/updateTicket',
  async ({ id, ticketData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/ticket/update-tickets/${id}`, ticketData);
      return response.data; // Adjust based on your API response
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// Create an async thunk for deleting a ticket
export const deleteTicket = createAsyncThunk(
  'tickets/deleteTicket',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/ticket/delete-tickets/${id}`);
      return { id }; // Return the deleted ticket's ID for updating the state
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const ticketsSlice = createSlice({
  name: 'tickets',
initialState:{
    tickets: [], // Should be an array
    status: 'idle',
    error: null,
  },
  reducers: {
    // Define additional reducers if needed
  },
  extraReducers: (builder) => {
    builder
      // Handle createTicket
      .addCase(createTicket.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tickets.push(action.payload); // Assuming the response contains the created ticket
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Handle getTickets
      .addCase(getTickets.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tickets = action.payload; // Assuming the response contains the list of tickets
      })
      .addCase(getTickets.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Handle updateTicket
      .addCase(updateTicket.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateTicket.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.tickets.findIndex(ticket => ticket.id === action.payload.id);
        if (index !== -1) {
          state.tickets[index] = action.payload; // Update the specific ticket with new data
        }
      })
      .addCase(updateTicket.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Handle deleteTicket
      .addCase(deleteTicket.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteTicket.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tickets = state.tickets.filter(ticket => ticket.id !== action.payload.id); // Remove the deleted ticket from the state
      })
      .addCase(deleteTicket.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default ticketsSlice.reducer;
