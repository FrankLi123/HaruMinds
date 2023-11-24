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
import InitialSettingPage from "./firstTimeUser";



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

    const [isFirstTimeUser, setIsFirstTimeUser] = useState(true);

    const [selectedReason, setSelectedReason] = useState([]);
    const [selectedTips, setSelectedTips]  = useState([]);
     // eslint-disable-next-line no-unused-vars
    const [yesCount, setYesCount] = useState(0);

         // eslint-disable-next-line no-unused-vars
    const [noCount, setNoCount] = useState(0);

    const [quote, setQuote] = useState('');

    const [time, setTime] = useState(null);

    const [selectedReasonToSolve, setSelectedReasonToSolve] = useState('');

    const [selectedTipsToPractice, setSelectedTipsToPractice] = useState([]);

    const updateMainState = (newState, reasonToSolve, tipsToPractice)=>{
      setCounter(newState);
      setFixedCounter(newState);
      console.log("updated counter is :", counter)
      setShowStart(1);
      setCountdownStarted(true);
      const timeNow = new Date();
      setTime(timeNow);
      setShowDistractedQuestion(false);
      setShowCountinueButton(false);
      setSelectedReasonToSolve(reasonToSolve);
      setSelectedTipsToPractice(tipsToPractice);

      console.log("After setting page, the selectedReasonToSolve is :", selectedReasonToSolve)
      console.log("After setting page, the selectedTipsToPractice is :", selectedTipsToPractice)
    };

   const incrementCountNo = ()=>{
    setNoCount(prevCount => prevCount + 1);
}

const incrementCountYes =()=>{
    setYesCount(prevCount => prevCount + 1);    
}

const closeDistractedQuestion = () => {
  setShowDistractedQuestion(false);
  setShowCountinueButton(true);

};

const handleContinue =() =>{
  setCounter(fixedCounter);
  setCountdownStarted(true);
  setShowCountinueButton(false);
}




const getRandomResponse = async() => {

  try {
    const url = `http://localhost:8000/request`;

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

const userId = sessionStorage.getItem('user_id');


const submitUserResultFunction = async()=>{

  const submitResultConfig = {
    userId: userId,
    yesCount: yesCount,
    noCount: noCount,
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
        setIsFirstTimeUser(response.reasons.length === 0);
        console.log("to be ", response.reasons.length === 0)
        console.log("setIsFirstTimeUser is now:", isFirstTimeUser)
        setSelectedReason(response.reasons)
        setSelectedTips(response.tips)
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    
  fetchData(); // Call fetchData when the component mounts
  console.log(isFirstTimeUser)

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


          
                         <Grid container spacing={2} justifyContent="center" alignItems="center" height="100%">
                        
                         {/* <Grid item xs={11} sm={9} md={5} lg={4} xl={3}> */}
                             <Card>
                             <MKBox  mx={5} mt={3} p={4} mb={4} textAlign="center">
                                     Progressing.
                                  <MKTypography>
                                  {`${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`}
                                  </MKTypography>
                             </MKBox>
                             </Card>
                             <MKProgress value={Math.round(((counter/fixedCounter))*100)} variant="gradient" />
   
                         {/* </Grid> */}
                          {showDistractedQuestion && (

                              <QuestionComponent         setMinutes={fixedCounter/60}
                              onYesClick={incrementCountYes} 
                              onNoClick={incrementCountNo}
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
                {showStart == 0 && !isFirstTimeUser && (
                    <SettingPage updateMainPageState ={updateMainState} selectedReason={selectedReason} selectedTips={selectedTips}
                    // handleStartFunction = {handleStartAfterSetting/}
                    />
                )}

              {showStart == 2 && (
              <TextPage setShowStart={setShowStart}
              // handleStartFunction = {handleStartAfterSetting/}
              />
              )}

              {showStart == 0 && isFirstTimeUser &&(
              <InitialSettingPage userId ={userId} setStart={setShowStart} setIsFirstTimeUser={setIsFirstTimeUser}
              // handleStartFunction = {handleStartAfterSetting/}
              />

              )}
      
    </>
  );
}

export default MainPage;
