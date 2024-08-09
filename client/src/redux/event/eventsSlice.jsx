import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk for creating an event
export const createEvent = createAsyncThunk(
  'events/createEvent',
  async (eventData, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Not authenticated');
    }
    try {
      const response = await axios.post(
        '/api/events/create-event',
        eventData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          },
        }
      );
      return response.data;
    } catch (error) {
      // Handle errors
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// Thunk for editing an event
export const editEvent = createAsyncThunk(
  'events/editEvent',
  async ({ id, eventData }, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Not authenticated');
    }
    try {
      const response = await axios.put(
        `/api/events/edit-event/${id}`, // Use the correct ID in the URL
        eventData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          },
        }
      );
      return response.data;
    } catch (error) {
      // Handle errors
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// Thunk for fetching events
export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Not authenticated');
    }
    try {
      const response = await axios.get('/api/events/get-events', {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
        },
      });
      return response.data.events; // Return the events array from the API response
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    events: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle createEvent
      .addCase(createEvent.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.events.push(action.payload); // Assuming the response is the created event
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Handle editEvent
      .addCase(editEvent.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(editEvent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.events.findIndex(event => event.id === action.payload.event.id);
        if (index !== -1) {
          state.events[index] = action.payload.event; 
        }
      })
      .addCase(editEvent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Handle fetchEvents
      .addCase(fetchEvents.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.events = action.payload; // Assuming the response is an array of events
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});


export default eventsSlice.reducer;
