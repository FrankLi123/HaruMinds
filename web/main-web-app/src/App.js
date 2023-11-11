import logo from './logo.svg';
import './App.css';
import LoginPage from './Login';
import LandingPage from './Landing';
import RegisterPage from './Register';
import WelcomingPage from './Welcome';
import MainPage from './main';
import GraphPage from './Graph';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {
  return (

    <Router>
    <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/register" element={<RegisterPage/>} />
      <Route path="/welcome" element={<WelcomingPage/>} />
      <Route path="/main" element={<MainPage/>} />
      <Route path="/welcome/graph" element={<GraphPage/>} />
    </Routes>
  </Router>
  // // </BrowserRouter>
  //  <BrowserRouter>
  // <div>
  // <LandingPage></LandingPage>
  // </div>
  
  );
}

export default App;
