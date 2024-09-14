import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to handle login
export const login = createAsyncThunk('auth/login', async (credentials) => {
  try {
    const response = await axios.post('http://4.227.183.32:3400/api/auth/login', credentials);
    return response.data; // Assuming the backend returns the auth token
  } catch (error) {  
    throw error;
  }
});

// Async thunk to handle logout
export const logout = createAsyncThunk('auth/logout', async () => {
  // Implement logout logic here (e.g., remove auth token from storage)
  return null;
});

// Async thunk to handle registration
export const register = createAsyncThunk('auth/register', async (data) => {
  try {
    const response = await axios.post('http://4.227.183.32:3400/api/auth/register', data);
    return response.data; // Aquí debe devolverse la data
  } catch (error) {
    throw error;
  }
});