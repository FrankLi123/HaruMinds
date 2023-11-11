import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useParams, useLocation } from 'react-router-dom';


function WelcomingPage() {

  const navigate = useNavigate();

const { user_id, user_name} = useLocation().state;

  // Use session storage to store the id value
  sessionStorage.setItem('user_id', user_id);
  sessionStorage.setItem('user_name', user_name);
  const handleBackButton = ()=>{
    navigate("/");
  }

  const handleStartClick = () =>{

    window.open('http://localhost:3000/main', '_blank', 'width=600,height=800');

  }

  const handleVisualClick = () =>{
    navigate("/welcome/graph");
  }


  return (
    <div>
      <h1> Welcome! {user_name}! </h1>
      <button onClick={handleBackButton}>Back</button>
      <button onClick={handleStartClick}>Start for Free !!!! </button>
      <button onClick={handleVisualClick}>Progress Visualization </button>
    </div>
  );
}
export default WelcomingPage;