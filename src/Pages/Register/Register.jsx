import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../../Redux/Reducer/Auth';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // Estado para manejar errores
  const [formError, setFormError] = useState(null); // Estado para manejar errores de formulario
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validar que el correo electrónico y la contraseña sean válidos
    if (!email || !password) {
      setFormError('Todos los campos son requeridos.');
      return;
    }
    
    if (password.length < 4) {
      setFormError('La contraseña debe tener al menos 4 caracteres.');
      return;
    }
    
    setFormError(null); // Limpiar errores del formulario

    dispatch(register({ email, password }))
      .unwrap()
      .then((response) => {
        // Si la autenticación es exitosa, navega a la página de chat
        sessionStorage.setItem("token", response.token); // Asegúrate que el token esté en response.token
        navigate('/chat');
      })
      .catch((error) => {
        setError("Error de autenticación: " + error.message); // Maneja el error
      });
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className=''>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
            Regístrate y hazle preguntas
          </h1>

          <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
            Azure Open AI Version 2024-08-06
          </p>

          {error && <p className="text-red-500 text-center">{error}</p>}
          {formError && <p className="text-red-500 text-center">{formError}</p>} {/* Muestra errores del formulario */}

          <form onSubmit={handleSubmit} className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
            <p className="text-center text-lg font-medium">Ingresa tus Datos</p>

            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <div className="relative">
                <input
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Ingresa tu email"
                  required // Validación HTML5 para correo electrónico
                />
                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <div className="relative">
                <input
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Ingresa tu contraseña"
                  required // Validación HTML5 para requerir un campo
                />
                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
            >
              Registrar
            </button>
            <button
              type="button" // Cambiado a type="button"
              className="block w-full rounded-lg bg-red-600 px-5 py-3 text-sm font-medium text-white"
              onClick={handleBack}
            >
              Volver
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
