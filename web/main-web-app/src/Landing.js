import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div>
      <h1> Hello, wecome to Virtual Pet World!</h1>
      <Link to="/login"> Login</Link>
      <Link to="/register"> Register</Link>
      
    </div>
  );
}

export default LandingPage;