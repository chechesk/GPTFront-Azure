import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CreateChat } from '../../Redux/Reducer/Chat';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function Chat() {
  const { messages, responses, loading, error } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const token = sessionStorage.getItem('token');
  const [message, setMessage] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('General');
  const [topicsState, setTopicsState] = useState({
    General: [],
    Tecnología: [],
    Programación: [],
    JavaScript: [],
    Python: [],
  });

  // Lista de temas para el menú lateral
  const topics = ['General', 'Tecnología', 'Programación', 'JavaScript', 'Python'];

  const handleSendMessage = () => {
    if (message.trim() === '') return;

    // Crear el nuevo mensaje
    const newMessage = { type: 'sent', text: message, response: null };

    // Actualizar solo el estado del tema seleccionado
    setTopicsState((prevState) => ({
      ...prevState,
      [selectedTopic]: [...prevState[selectedTopic], newMessage],
    }));

    // Enviar mensaje al backend
    dispatch(CreateChat({ message, token, topic: selectedTopic }));

    // Limpiar el campo de mensaje
    setMessage('');
  };

  // Recargar el estado del localStorage al cargar la página
  useEffect(() => {
    const savedTopicsState = localStorage.getItem('topicsState');
    const savedSelectedTopic = localStorage.getItem('selectedTopic');

    if (savedTopicsState) {
      setTopicsState(JSON.parse(savedTopicsState));
    }
    if (savedSelectedTopic) {
      setSelectedTopic(savedSelectedTopic);
    }
  }, []);

  // Guardar el estado en el localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('topicsState', JSON.stringify(topicsState));
    localStorage.setItem('selectedTopic', selectedTopic);
  }, [topicsState, selectedTopic]);

  useEffect(() => {
    if (responses.length > 0) {
      // Solo actualizar el tema seleccionado con la respuesta correcta
      setTopicsState((prevState) => {
        const updatedTopicMessages = prevState[selectedTopic].map((entry, index) => {
          if (entry.type === 'sent' && !entry.response && responses[index]) {
            return { ...entry, response: responses[index] }; // Asocia la respuesta correctamente
          }
          return entry;
        });

        return {
          ...prevState,
          [selectedTopic]: updatedTopicMessages,
        };
      });
    }
  }, [responses, selectedTopic]);

  const handleCrear = () => {
    // Eliminar el estado de los temas y el tema seleccionado de localStorage
    localStorage.removeItem('topicsState');
    localStorage.removeItem('selectedTopic');
    window.location.reload();
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-1/4 bg-gray-800 text-white p-4 space-y-4">
        <h2 className="text-xl font-semibold mb-4">Temas</h2>
        {topics.map((topic, index) => (
          <button
            key={index}
            onClick={() => setSelectedTopic(topic)}
            className={`block w-full text-left px-4 py-2 rounded-md ${selectedTopic === topic ? 'bg-indigo-500' : 'hover:bg-gray-700'}`}
          >
            {topic}
          </button>
        ))}
        <button
          className={`block w-full text-left px-4 py-2 rounded-md font-bold text-xl hover:bg-red-500 hover:bg-gray-700'}`}
          onClick={handleCrear}
        >
          Clear
        </button>
      </aside>

      {/* Main Chat Section */}
      <div className="flex-1 relative">
        <header className="bg-white p-4 text-gray-700">
          <h1 className="text-2xl font-semibold">Chat: {selectedTopic}</h1>
         
        </header>

        <div className="h-screen overflow-y-auto p-4 pb-36">
          {error && <p className="text-red-500">Error: {error}</p>}

          {/* Chat History */}
          {topicsState[selectedTopic].map((entry, index) => {
            const isCode = entry.text && entry.text.includes('```');
            let codeContent = '';
            let language = 'javascript';

            if (isCode) {
              const lines = entry.text.split('\n');
              const firstLine = lines[0];
              if (firstLine.includes('python')) language = 'python';
              else if (firstLine.includes('csharp')) language = 'csharp';
              else if (firstLine.includes('js')) language = 'javascript';

              codeContent = lines.slice(1, -1).join('\n');
            }

            return (
              <div key={index} className={`flex mb-20 ${entry.type === 'received' ? 'justify-end' : ''}`}>
                {loading && <p>Cargando...</p>}
                <div className={`flex max-w-[100%] rounded-lg p-3 gap-3 ${entry.type === 'received' ? 'bg-indigo-500 text-white' : 'bg-white text-gray-700'}`}>
                  <div className='flex flex-col'>
                    <div>{isCode ? (
                      <SyntaxHighlighter language={language} style={dark} className="w-[1200px]">
                        {codeContent}
                      </SyntaxHighlighter>
                    ) : (
                      <p className="whitespace-pre-line font-bold">{entry.text}</p>
                    )}</div>
                    {/* Render the response after the question */}
                    {entry.response && (
                      <div className="flex mt-2">
                        <div className="flex max-w-[100%] rounded-lg p-3 gap-3 bg-indigo-500 text-white">
                          {isCode ? (
                            <SyntaxHighlighter language={language} style={dark} className="w-[1200px]">
                              {entry.response}
                            </SyntaxHighlighter>
                          ) : (
                            <p className="whitespace-pre-line">{entry.response}</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Input */}
        <footer className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-full">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
              className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleSendMessage}
              className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2"
            >
              Send
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
