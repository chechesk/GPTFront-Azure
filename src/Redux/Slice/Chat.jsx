import { createSlice } from "@reduxjs/toolkit";
import { CreateChat, UpdateChat } from "../Reducer/Chat";

const initialState = {
  messages: [], // Mensajes enviados
  responses: [], // Mensajes recibidos // Array para almacenar los chats
  loading: false,  // Indicador de carga para las operaciones de chat
  error: null,  // Manejo de errores
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    // Aquí podrías agregar acciones adicionales si las necesitas
  },
  extraReducers: (builder) => {
    // Manejo de CreateChat
    builder
    .addCase(CreateChat.pending, (state) => {
      state.loading = true;
    })
    .addCase(CreateChat.fulfilled, (state, action) => {
      state.loading = false;
      // Agregar mensaje enviado y respuesta recibida al estado
      state.messages.push(action.meta.arg.message);
      state.responses.push(action.payload);
    })
    .addCase(CreateChat.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Manejo de UpdateChat
    builder
      .addCase(UpdateChat.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateChat.fulfilled, (state, action) => {
        state.loading = false;
        const updatedChat = action.payload;
        const index = state.chats.findIndex(chat => chat.id === updatedChat.id);
        if (index !== -1) {
          state.chats[index] = updatedChat;  // Actualizar el chat en el array
        }
      })
      .addCase(UpdateChat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default chatSlice.reducer;
