import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Crear chat
export const CreateChat = createAsyncThunk('chat/createChat', async (data) => {
    const token = sessionStorage.getItem('token'); // Recupera el token de sessionStorage
  
    if (!token) {
      throw new Error("Token is missing"); // Maneja el caso en que el token no está disponible
    }
  
    try {
      const response = await axios.post('http://4.227.183.32:3400/', 
        { message: data.message }, // Envia el mensaje en el cuerpo de la solicitud
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token // Añade el token en la cabecera
          }
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  });

// Actualizar chat
export const UpdateChat = createAsyncThunk('chat/updateChat', async (updateData, { getState }) => {
    const token = sessionStorage.getItem('token'); // Recupera el token de sessionStorage
  
    try {
      const response = await axios.put('http://4.227.183.32:3400/', updateData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  });