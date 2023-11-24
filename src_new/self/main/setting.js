
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import MKBox from "components/MKBox";
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { useState } from "react";
import MKTypography from "components/MKTypography";
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
const SettingPage = ({updateMainPageState, selectedReason, selectedTips})=> {

    const [recordTime, setRecordTime] = useState('');
    const [selectedReasonToSolve, setSelectedReasonToSolve] = useState('');
    const [selectedTipsToPractice, setSelectedTipsToPractice] = useState([]);


  const handleFormSettingChange = () =>{
    updateMainPageState(recordTime * 60, selectedReasonToSolve, selectedTipsToPractice);
  }

    const handleStartClick = ()=>{
        console.log(recordTime)
        handleFormSettingChange(recordTime);
    }

    console.log("selectedReasonToSolve", selectedReasonToSolve)
    console.log("selectedTipsToPractice is: ",selectedTipsToPractice)
    return (
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
           
            <Grid container spacing={2} justifyContent="center" alignItems="center" height="100%">
              
            <MKTypography color="white"> Welcome Back! </MKTypography>
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
                    {selectedReason.map((reason) => (
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
                {/* <br> */}
                <Card>
                <MKBox mx={5} mt={3} p={4} mb={4} textAlign="center">
          What methods do you want to practice for today?
          <FormControl component="fieldset">
            <FormGroup>
              {selectedTips.map((tip) => (
                <FormControlLabel
                  key={tip}
                  control={<Checkbox
                    checked={selectedTipsToPractice.includes(tip)}
                    onChange={() => {
                      const newSelection = [...selectedTipsToPractice];
                      if (newSelection.includes(tip)) {
                        // If the tip is already selected, remove it
                        newSelection.splice(newSelection.indexOf(tip), 1);
                      } else {
                        // Otherwise, add it to the selection
                        newSelection.push(tip);
                      }
                      setSelectedTipsToPractice(newSelection);
                    }}
                  />}
                  label={tip}
                />
              ))}
            </FormGroup>
          </FormControl>
        </MKBox>
    </Card>
              
              {/* </Grid> */}

              <Card>
                  <MKBox  mx={5} mt={3} p={4} mb={4} textAlign="center">
                        How long do you want to have a quick recording for?
                        (1 / 5 / 10 / 20 / 30 minutes)
                        <MKInput label="Type here..." id="recordTime"
                        value={recordTime}
                        onChange={(e) => setRecordTime(e.target.value)}/>
                  </MKBox>
                </Card>
                <MKButton
                  variant="outlined"
                  color="light"
                  onClick={handleStartClick}
                > START
                </MKButton>

            </Grid>
          </MKBox>
       
        </>
      );
}


export default SettingPage;