import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CreateChat } from '../../Redux/Reducer/Chat';

export default function Chat() {
  const { messages, responses, loading, error } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const token = sessionStorage.getItem('token');
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim() === '') return;

    const newMessage = { message, token };
    dispatch(CreateChat(newMessage));
    setMessage('');
  };

  useEffect(() => {
    if (token) {
      // Solo crea un chat si el token está disponible
      // handleSendMessage(); // No es necesario llamar esto aquí
    }
  }, [token, dispatch]);

  // Combina mensajes y respuestas en un solo array
  const chatHistory = [];
  for (let i = 0; i < messages.length; i++) {
    chatHistory.push({ type: 'sent', text: messages[i] });
    if (i < responses.length) {
      chatHistory.push({ type: 'received', text: responses[i] });
    }
  }

  return (
    <div className="flex h-screen overflow-hidden p-8 ml-44">
      <div className="flex-1">
        <header className="bg-white p-4 text-gray-700">
          <h1 className="text-2xl font-semibold">Alice</h1>
        </header>

        <div className="h-screen overflow-y-auto p-4 pb-36">
          {loading && <p>Cargando...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}
          
          {/* Historial de chat */}
          {chatHistory.map((entry, index) => (
            <div key={index} className={`flex mb-4 ${entry.type === 'received' ? 'justify-end' : ''}`}>
              <div className={`flex max-w-[80%] rounded-lg p-3 gap-3 ${entry.type === 'received' ? 'bg-indigo-500 text-white' : 'bg-white text-gray-700'}`}>
                <p>{entry.text}</p>
              </div>
            </div>
          ))}
        </div>

        <footer className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-3/4">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
            />
            <button onClick={handleSendMessage} className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2">
              Send
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
