import './App.css';
import ReactGA from 'react-ga4';
import Root from './Router/router';
import Footer from './Components/Footer/footer';

function App() {
  ReactGA.initialize('YOUR_TRACKING_ID');

  return (
    <>
      <Root />
      <Footer />
    </>
  );
}

export default App;