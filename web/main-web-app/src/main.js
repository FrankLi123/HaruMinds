import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import pet from './img/idle_to_sleep.gif';
import FormSetting from './FormSettings';
import DistractedQuestion from './DistractedQuestion'; // Import the DistractedQuestion component
import countDailyAnswer from './api/handler';
import QuoteDisplay
 from './Components/QuoteDisplay';
function MainPage() {
  const navigate = useNavigate();
  const [showStart, setShowStart] = useState(false);
  const [showDistractedQuestion, setShowDistractedQuestion] = useState(false);
  const [counter, setCounter] = useState(10);
  const [countdownStarted, setCountdownStarted] = useState(false);
  const [yesCount, setYesCount] = useState(0);
  const [noCount, setNoCount] = useState(0);

  const [time, setTime] = useState(null);

  const handleBackButton = () => {
    navigate('/welcome');
  };

  const showStartText = () => {
    setCountdownStarted(true);

    const timeNow = new Date();
    setTime(timeNow);
  };

  const closeDistractedQuestion = () => {
    setShowDistractedQuestion(false);
    setCounter(5);
    setCountdownStarted(true);

  };

  const incrementCountNo = ()=>{
      setNoCount(prevCount => prevCount + 1);
  }

  const incrementCountYes =()=>{
      setYesCount(prevCount => prevCount + 1);    
  }
  
  const submitUserResult = async()=>{
    const currentTime = new Date();
    const timeSpentInSecond = Math.floor(Math.abs(currentTime - time)/ 1000 );
    console.log("yesCount is: "+ yesCount + " ,noCount is: " + noCount + " ,timeSpent is : " + timeSpentInSecond);

    const userId = sessionStorage.getItem('user_id');
    // make the api call 
    try{
      const res = await countDailyAnswer(userId, yesCount, noCount, timeSpentInSecond);
    
      console.log(res.success)

        if( res.success){

         
          window.close()
        }
      
    }catch(error){

    }

    // window.close()
  }


  useEffect(() => {
    let interval;
  
    if (countdownStarted && counter > 0) {
      interval = setInterval(() => {
        setCounter(prevCounter => prevCounter - 1);
      }, 1000);
    } else if (counter === 0) {
      setShowDistractedQuestion(true);
      clearInterval(interval);
    }
  
    return () => clearInterval(interval);
  }, [countdownStarted, counter]);

  return (
    <div>
      <h1> Hello, this is your main page! </h1>
      <FormSetting />
      <img src={pet} alt="" />
      <button onClick={handleBackButton}>Back</button>

      <button onClick={showStartText}>Start Now ~ </button>

      {showStart && (
        <div className="start-container">
          <div className="start-text">START</div>
        </div>
      )}

      {showDistractedQuestion &&
        <DistractedQuestion 
        onYesClick={incrementCountYes} 
        onNoClick={incrementCountNo }
        onClose={closeDistractedQuestion}
      />
      }


      <div>
        Counter: {counter} seconds
        Yes Count: {yesCount}
        No Count: {noCount}
        <QuoteDisplay />
      </div>

      <button onClick={submitUserResult}> End for Today! </button>
    </div>
  );
}

export default MainPage;