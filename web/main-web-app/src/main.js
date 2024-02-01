import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import pet from './img/idle_to_sleep.gif';
import FormSetting from './FormSettings';
import DistractedQuestion from './DistractedQuestion'; // Import the DistractedQuestion component

import apiHandler from './api/handler';

import QuoteDisplay from './Components/QuoteDisplay';


const {countDailyAnswer, getRandomResponse} = apiHandler;


function MainPage() {
  const navigate = useNavigate();
  const [showStart, setShowStart] = useState(false);
  const [showDistractedQuestion, setShowDistractedQuestion] = useState(false);
  const [counter, setCounter] = useState(10);
  const [fixedCounter, setFixedCounter] = useState(10);
  const [countdownStarted, setCountdownStarted] = useState(false);
  const [yesCount, setYesCount] = useState(0);
  const [noCount, setNoCount] = useState(0);
  const [time, setTime] = useState(null);
  const [quote, setQuote] = useState('');

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
    setCounter(fixedCounter*60);
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
  }


  const updateMainState = (newState)=>{
     setCounter(newState);
     setFixedCounter(newState);
  };

  const showTextResponse = async()=>{
   
    const userId = sessionStorage.getItem('user_id');
    
    // make the api call 
    try{
      const res = await getRandomResponse();
      
      console.log("res.sentence is :", res);
         
        setQuote(res);

        console.log('MainPage Quote:', quote);
    
    
    }catch(error){
    }
  }


  useEffect(() => {
    let intervalCountDown;
    if (countdownStarted && counter > 0) {

      intervalCountDown = setInterval(() => {
        setCounter(prevCounter => prevCounter - 1);
      }, 1000);
    } else if (counter === 0) {
      setShowDistractedQuestion(true);
      clearInterval(intervalCountDown);
    }

    showTextResponse();
    const intervalTextResponse = setInterval(() => {
      showTextResponse();
    }, 10000);

    return () => {
      clearInterval(intervalCountDown);
      clearInterval(intervalTextResponse);
    };
    
  }, [countdownStarted, counter]);

  return (
    <div>
      <h1> Hello, this is your main page! </h1>
      <FormSetting updateMainPageState ={updateMainState}/>
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
        setMinutes={fixedCounter/60}
        onYesClick={incrementCountYes} 
        onNoClick={incrementCountNo }
        onClose={closeDistractedQuestion}
      />
      }

      <div>
        Counter: {counter} seconds
        Yes Count: {yesCount}
        No Count: {noCount}
      </div>

      <button onClick={submitUserResult}> End for Today! </button>

      <div>
        <QuoteDisplay quote={quote} />
      </div>
    </div>
  );
}

export default MainPage;