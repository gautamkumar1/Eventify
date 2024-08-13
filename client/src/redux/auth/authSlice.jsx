import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { toast } from 'react-toastify';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/user/login', userData);
      localStorage.setItem('token', response.data.token);

      const decodedToken = jwtDecode(response.data.token);
      // console.log("UserData: ", decodedToken);

      localStorage.setItem('userData', JSON.stringify(decodedToken));
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message)
      
      return rejectWithValue(error.response.data);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/user/register', userData);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      toast.error(error.response.data.message ? error.response.data.message : "Register Failed")
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isLoading: false,
    isLoggedIn: false,
    isSuccess: false,
    isError: false,
    message: '',
    isAdmin: false, // Add isAdmin to initial state
  },
  reducers: {
    logoutUser: (state) => {
      localStorage.removeItem('token');
      state.user = null;
      state.isLoggedIn = false;
      state.isSuccess = false;
      state.isAdmin = false; // Reset isAdmin on logout
    },
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle loginUser
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isLoggedIn = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user; // Set the user data
        state.isLoggedIn = true; // Set to true on successful login
        state.isAdmin = action.payload.user.isAdmin; // Set isAdmin from payload.user
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Handle registerUser
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, logoutUser } = authSlice.actions;
export default authSlice.reducer;
