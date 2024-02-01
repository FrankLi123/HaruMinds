/**
=========================================================
* Material Kit 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
// import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import MKBox from "components/MKBox";
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MKProgress from "components/MKProgress";

// import MKInput from "components/MKInput";
// react-router-dom components
// import { Link } from "react-router-dom";

// @mui material components
// import Card from "@mui/material/Card";
// import Switch from "@mui/material/Switch";
// import Grid from "@mui/material/Grid";
// import MuiLink from "@mui/material/Link";

// @mui icons
// import FacebookIcon from "@mui/icons-material/Facebook";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import GoogleIcon from "@mui/icons-material/Google";

// Material Kit 2 React components
// import MKBox from "components/MKBox";
// import MKTypography from "components/MKTypography";

// Material Kit 2 React example components
// import DefaultNavbar from "examples/Navbars/DefaultNavbar";
// import SimpleFooter from "examples/Footers/SimpleFooter";

// Material Kit 2 React page layout routes
// import routes from "routes";
// Images
// import bgImage from "assets/images/bg-sign-in-basic.jpeg";
// import MKProgress from "components/MKProgress";

import SettingPage from "./setting";
import MKTypography from "components/MKTypography";
import QuestionComponent from "./question";
// import StartPage from "./start";
import  {submitUserResult, retrieveUserData} from "./api/handler";
// import getRandomResponse from "./api/handler";
import TextPage from "./text";
// import InitialSettingPage from "./firstTimeUser";

import GraphPage from "./graph";
import config from '../../config.json';

function MainPage() {

    
    // eslint-disable-next-line no-unused-vars
    const [showStart, setShowStart] = useState(0);
    const [counter, setCounter] = useState(10);

     // eslint-disable-next-line no-unused-vars
    const [fixedCounter, setFixedCounter] = useState(10);

      // eslint-disable-next-line no-unused-vars
    const [countdownStarted, setCountdownStarted] = useState(false);

     // eslint-disable-next-line no-unused-vars
    const [showDistractedQuestion, setShowDistractedQuestion] = useState(false);

    const [showContinueButton, setShowCountinueButton] = useState(false);

    // const [isFirstTimeUser, setIsFirstTimeUser] = useState(true);
     // eslint-disable-next-line no-unused-vars

    const [yesCount, setYesCount] = useState(0);
         // eslint-disable-next-line no-unused-vars
    const [noCount, setNoCount] = useState(0);

    // eslint-disable-next-line no-unused-vars
    const [yesTipCount, setYesTipCount] = useState(0);
    // eslint-disable-next-line no-unused-vars
  const [noTipCount, setNoTipCount] = useState(0);
    const [quote, setQuote] = useState('');
    const [time, setTime] = useState(null);

    const [selectedReasonToSolve, setSelectedReasonToSolve] = useState('');
    const [selectedTipsToPractice, setSelectedTipsToPractice] = useState([]);
    
    const [tasks, setTasks] = useState([]);

    const [taskListIndex, setTaskListIndex] = useState(0);
    
    const [currentTaskName, setCurrentTaskName] = useState('');


    const updateMainState = async(tasksList)=>{

      await setTasks(tasksList);
      console.log("tasklist", tasksList)
      console.log("tasksList[taskListIndex].name", tasksList[taskListIndex].name)
      const newState = tasksList[taskListIndex].time * 60;
      const newName = tasksList[taskListIndex].name

      resetTimer(newState, newName);
      
      console.log("updated counter is :", counter)
      setShowStart(1);
      const timeNow = new Date();
      setTime(timeNow);
      setShowDistractedQuestion(false);

      console.log("After setting page, the selectedReasonToSolve is :", selectedReasonToSolve)
      console.log("After setting page, the selectedTipsToPractice is :", selectedTipsToPractice)
    };

const resetTimer = (newState, newName)=>{
  setCounter(newState);
  setCountdownStarted(true);
  setShowCountinueButton(false);
}


const incrementCountNo = ()=>{
    setNoCount(prevCount => prevCount + 1);
}

const incrementCountYes =()=>{
    setYesCount(prevCount => prevCount + 1);    
}

const incrementTipCountNo = ()=>{
  setNoTipCount(prevCount => prevCount + 1);
}

const incrementTipCountYes =()=>{
  setYesTipCount(prevCount => prevCount + 1);    
}


const closeDistractedQuestion = () => {
  setShowDistractedQuestion(false);
  setShowCountinueButton(true);

};



const handleContinue =() =>{
  setTaskListIndex(taskListIndex+1);
  resetTimer(tasks[taskListIndex].time* 60, tasks[taskListIndex].name)
  // setCurrentTaskName(tasks[taskListIndex].name)

}




const getRandomResponse = async() => {

  try {
    const url = `${config.apiBaseUrl}/request`;

    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    };

    const response = await fetch(url, requestOptions);
    
    if (response.status !== 200) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const response_data = await response.json();
    console.log("response_data",response_data.sentence)
    return response_data.sentence;

  } catch (error) {
    // Handle errors if needed
    console.log(error)
    return null
  }
};




const showTextResponse = async()=>{
   
  // const userId = sessionStorage.getItem('user_id');
  // make the api call 
  try{
    const res = await getRandomResponse();
    
    console.log("res.sentence is :", res);
       
      setQuote(res);

      console.log('MainPage Quote:', quote);
  
  
  }catch(error){
      console.log(error)
  }
}


const openAITextWindow =()=>{
  setShowStart(2);
  //pause the counter
}


const openGraphVisualization =()=>{
  setShowStart(3);
  //pause the counter
}


const userId = sessionStorage.getItem('user_id');

const submitUserResultFunction = async()=>{

  const submitResultConfig = {
    userId: userId,
    distractYesCount: yesCount,
    distractNoCount: noCount,
    tipYesCount: yesTipCount,
    tipNoCount: noTipCount,
    time: time
  };

  try{

  console.log(submitResultConfig);

  const res = await submitUserResult({submitResultConfig: submitResultConfig});
    
  console.log(res)
  }catch(error){
      console.log(error)
  }
}

useEffect(() => {
  // Existing code for countdown
  let intervalCountDown;
  if (countdownStarted && counter > 0) {
    intervalCountDown = setInterval(() => {
      setCounter(prevCounter => prevCounter - 1);
    }, 1000);
  } else if (counter === 0) {
    setShowDistractedQuestion(true);
    clearInterval(intervalCountDown);
  }

  const intervalTextResponse = setInterval(() => {
    showTextResponse();
  }, 60000);


    // Fetch user data when the component mounts
    const fetchData = async () => {
      try {
        const response = await retrieveUserData(userId);
        // Check if the user is a first-time user based on the API response
        console.log("in fetchData, the response is", response)

        // setSelectedReason(response.reasons)
        // setSelectedTips(response.tips)
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    
  fetchData(); // Call fetchData when the component mounts
  // console.log(isFirstTimeUser)

  if(tasks.length > 0){
    setCurrentTaskName( tasks[taskListIndex].name);
  }

  return () => {
    clearInterval(intervalCountDown);
    clearInterval(intervalTextResponse);
  };
}, [countdownStarted, counter, userId]);


  const minutes = Math.floor(counter / 60);
  const remainingSeconds = counter % 60;

  return (
    <>

{ showStart == 1 && (
             <>
              <MKBox
                     position="absolute"
                     top={0}
                     left={0}
                     zIndex={1}
                     width="100%"
                     minHeight="100vh"
                     sx={{
                       backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
                         `${linearGradient(
                           rgba(gradients.dark.main, 0.6),
                           rgba(gradients.dark.state, 0.6)
                         )}, url(${bgImage})`,
                       backgroundSize: "cover",
                       backgroundPosition: "center",
                       backgroundRepeat: "no-repeat",
                     }}
                   />
                       <MKBox px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2}>
                       <MKButton
                                variant="outlined"
                                color="light"
                                onClick={()=> setShowStart(0)}
                              > SETTING
                            </MKButton>

                            <MKButton
                                variant="outlined"
                                color="light"
                                onClick={()=> submitUserResultFunction()}
                              > END FOR Today
                            </MKButton>

                            <MKButton
                                variant="outlined"
                                color="light"
                                onClick={()=> openAITextWindow()}
                              > Speak to an AI Therapist 
                            </MKButton>


                            <MKButton
                                variant="outlined"
                                color="light"
                                onClick={()=> openGraphVisualization()}
                              > Graph Visualization
                            </MKButton>
          
                         <Grid container spacing={2} justifyContent="center" alignItems="center" height="100%">
                        
                         {/* <Grid item xs={11} sm={9} md={5} lg={4} xl={3}> */}
                             <Card>
                             <MKBox  mx={5} mt={3} p={4} mb={4} textAlign="center">
                                     Progressing. 
                                     {setCurrentTaskName}
                                  <MKTypography>
                                  {`${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`}
                                  </MKTypography>
                             </MKBox>
                             </Card>
                             <MKProgress value={Math.round(((counter/fixedCounter))*100)} variant="gradient" />
   
                         {/* </Grid> */}
                          {showDistractedQuestion && (
                              <QuestionComponent 
                              setMinutes={fixedCounter/60}
                              onYesClick={incrementCountYes} 
                              onNoClick={incrementCountNo}
                              onYesTipClick={incrementTipCountYes} 
                              onNoTipClick={incrementTipCountNo}
                              onClose={closeDistractedQuestion}/>
                          )}
                          {showContinueButton && !showDistractedQuestion && (                            
                            <MKButton
                            variant="outlined"
                            color="light"
                            onClick={()=> handleContinue()}
                          > Continue next Round
                        </MKButton>
                          ) }
                          <MKTypography color="light">{quote}</MKTypography>
                         </Grid>                              
                     </MKBox>          
                     </>
        )}

                {showStart == 0 && (
                    <SettingPage updateMainPageState ={updateMainState}
                    />
                )}

              {showStart == 2 && (
              <TextPage setShowStart={setShowStart}
              // handleStartFunction = {handleStartAfterSetting/}
              />
              )}

            {showStart == 3 && (
              <GraphPage setShowStart={setShowStart}
              />
              )}

              {/* {showStart == 0 && (
              <InitialSettingPage userId ={userId} setStart={setShowStart} setIsFirstTimeUser={setIsFirstTimeUser}
              />

              )} */}
      
    </>
  );
}

export default MainPage;
