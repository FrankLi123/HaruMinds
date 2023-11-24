
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import MKBox from "components/MKBox";
// import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { useState, useEffect } from "react";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import MKTypography from "components/MKTypography";

import  {initalSettingData, retrieveReasonsRequest} from "./api/handler";

// eslint-disable-next-line react/prop-types
const InitialSettingPage = ({userId, setStart, setIsFirstTimeUser})=> {
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [newReason, setNewReason] = useState('');
  const [personality, setPersonality] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedReasonToSolve, setSelectedReasonToSolve] = useState('');
  const [keysArray, setKeysArray] = useState([]);
  const [reasonsAndTipsHashmap, setReasonsAndTipsHashmap] = useState({});
  const [selectedTips, setSelectedTips] = useState([]);
  const [newTip, setNewTip] = useState("");


  const handleTipSelectChange = (event) => {
    const tip = event.target.value;
    setSelectedTips((prevTips) => [...prevTips, tip]);
  };

  const addTip = () => {
    if (newTip.trim() !== "") {
      setSelectedTips((prevTips) => [...prevTips, newTip.trim()]);
      setNewTip("");
    }
  };


  const addReason = () => {
    setSelectedReasons([...selectedReasons, newReason]);
    setNewReason('');
  };


  const removeTip = (index) => {
    setSelectedTips((prevTips) => prevTips.filter((_, i) => i !== index));
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const sendInitialSettingData = async()=>{
    console.log("selectedReasons is : ", selectedReasons)
    console.log("personality is : ", personality)
    console.log("userId is : ", userId)
    console.log("selectedTips is : ", selectedTips)
    // make the api call 


    try{

      const selectedTipsString = selectedTips.join(', ');
      const res = await initalSettingData(userId, selectedReasons, selectedTipsString, personality );
      console.log('Response is:', res);

    }catch(error){
        console.log(error)
    }


    setStart(0);
    setIsFirstTimeUser(false);
  }
  
  const distractionReasons = keysArray

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await retrieveReasonsRequest();
        const { reasons, tips } = response;

        // Assuming reasons and tips have the same length
        const newHashmap = {};
        reasons.forEach((reason, index) => {
            // Split tips into a list of strings
            const tipList = tips[index].split('. ');

            newHashmap[reason] = tipList;
        });

        setReasonsAndTipsHashmap(newHashmap);
        setKeysArray(Object.keys(newHashmap));
        
        console.log(keysArray);
        console.log(reasonsAndTipsHashmap);


      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();




  }, []);


  return (
    <>
      {currentStep === 1 && (
        <MKBox px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2}>
          <Grid container spacing={2} justifyContent="center" alignItems="center" height="100%">
          <MKTypography color="dark"> Welcome Here! Fresh New User! </MKTypography>
            <Card>
              <MKBox mx={5} mt={3} p={4} mb={4} textAlign="center">
                What are the reasons for your distraction?
                {selectedReasons.map((reason, index) => (
                  <span key={index}>{reason} &nbsp;&nbsp; &nbsp;</span>
                ))}
                <Select
                  value={newReason}
                  onChange={(e) => setNewReason(e.target.value)}
                  label="Select a reason"
                >
                  {distractionReasons.map((reason) => (
                    <MenuItem key={reason} value={reason}>
                      {reason}
                    </MenuItem>
                  ))}
                </Select>
                <MKButton onClick={addReason}>Add</MKButton>
              </MKBox>
            </Card>
            <Card>
              <MKBox mx={5} mt={3} p={4} mb={4} textAlign="center">
                What is your personality?
                <MKInput
                  label="Type here..."
                  id="personality"
                  onChange={(e) => setPersonality(e.target.value)}
                />

              </MKBox>
            </Card>

            <MKButton onClick={nextStep}>Next</MKButton>
          </Grid>
        </MKBox>
      )}
  
      {currentStep === 2 && (
        <MKBox px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2}>
          <Grid container spacing={2} justifyContent="center" alignItems="center" height="100%">
          <Card>
              <MKBox mx={5} mt={3} p={4} mb={4} textAlign="center">
                Which reasons do you want to solve the most?
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="reason-to-solve"
                    name="reason-to-solve"
                    value={selectedReasonToSolve}
                    onChange={(e) => setSelectedReasonToSolve(e.target.value)}
                  >
                    {selectedReasons.map((reason) => (
                      <FormControlLabel
                        key={reason}
                        value={reason}
                        control={<Radio color="primary" />}
                        label={reason}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </MKBox>
            </Card>

          <Card>
          <MKBox mx={5} mt={3} p={4} mb={4} textAlign="center">
    Here are some useful tips that may help you along the way: Feel free to select some that may help you!
    {/* Display tips based on the selected reason */}

            {reasonsAndTipsHashmap[selectedReasonToSolve] && (
              <div>
                <Select
                  value={newTip}
                  onChange={handleTipSelectChange}
                >
                  {reasonsAndTipsHashmap[selectedReasonToSolve].map((tip, index) => (
                    <MenuItem key={index} value={tip}>
                      {tip}
                    </MenuItem>
                  ))}
                </Select>
                <br />
               
                  <MKButton onClick={addTip}>Add Tip</MKButton>
                
              </div>
            )}


            {/* Display selected tips on the page */}
            {selectedTips.length > 0 && (
              <div>
                <MKTypography variant="h6" mt={2}>
                  Selected Tips:
                </MKTypography>
                <ul>
                  {selectedTips.map((selectedTip, index) => (
                    <li key={index}>
                      {selectedTip}
                      <MKButton size="small" onClick={() => removeTip(index)}>Remove</MKButton>
                    </li>
                  ))}
                </ul>
              </div>
            )}





</MKBox>
      </Card>
          <MKButton
                  variant="outlined"
                  color="dark"
                  onClick={sendInitialSettingData}
                > Ready to Begin a New Journey!
                </MKButton>
          </Grid>
        </MKBox>
      )}
    </>
  );
 };

export default InitialSettingPage;