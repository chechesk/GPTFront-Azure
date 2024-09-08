import './App.css';
import ReactGA from 'react-ga4';
import Root from './Router/router';
import Nav from './Components/Nav/nav';
import Footer from './Components/Footer/footer';

function App() {
  ReactGA.initialize('YOUR_TRACKING_ID');

  return (
    <>
      <Nav />
      <Root /> {/* Agregar el componente Root aquí */}
      <Footer />
    </>
  );
}

export default App;
