import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



function WelcomingPage() {

  const navigate = useNavigate();

  const handleBackButton = ()=>{
    navigate("/");
  
  }

  return (
    <div>
      <h1> Welcome! </h1>
      <button onClick={handleBackButton}>Back</button>
    </div>
  );
}
export default WelcomingPage;