import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from './Redux/Store.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId='1069150574320-na9i4hhgvmt3tht8grkckergmpgi3qrd.apps.googleusercontent.com'>
  <BrowserRouter>
    <App />
    </BrowserRouter>
    </GoogleOAuthProvider>
  </Provider>,
)
