import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import MKBox from "components/MKBox";
import config from "../../../config.json";

import  {initalSettingData,retrieveReasonsRequest} from "../api/handler";
// import  { retrieveReasonsRequest} from "../../main/api/handler";

const SelfPlanSettingPage = () => {
  const urlToWelcomePage = `${config.frontEndUrl}/self/welcome`;

  const [selectedReasons, setSelectedReasons] = useState([]);
  const [newReason, setNewReason] = useState('');
  const [confidence, setConfidence] = useState('');
  const [organization, setOrganization] = useState('');
  const [mindfulness, setMindfulness] = useState('');
  const [support, setSupport] = useState('');
  const [keysArray, setKeysArray] = useState([]);
  const [reasonsAndTipsHashmap, setReasonsAndTipsHashmap] = useState({});
  const [step, setStep] = useState(1);

  const [longTermPlan, setLongTermPlan] = useState('');

  const userId = sessionStorage.getItem('user_id');

  const addReason = () => {
    setSelectedReasons([...selectedReasons, newReason]);
    setNewReason('');
  };


  const sendInitialSettingData = async () => {
    console.log("userId is : ", userId);
    console.log("selectedReasons is : ", selectedReasons);
    console.log("confidence is : ", confidence);
    console.log("organization is : ", organization);
    console.log("mindfulness is : ", mindfulness);
    console.log("support is : ", support);

    try {
      // Make the API call using the sendInitialSettingData function
      const answerObject = {
        selectedReasons: selectedReasons,
        confidence: confidence,
        organization: organization,
        mindfulness: mindfulness,
        support: support
      };
  
      // Use JSON.stringify with replacer to remove undefined values
      const jsonString = JSON.stringify(answerObject, (key, value) => (value !== undefined ? value : null));
  

      const res = await initalSettingData(userId,jsonString);
      console.log("res of initalSettingData()", res)
      const longTermPlanSections = res.split('\n\n');
      setLongTermPlan(longTermPlanSections)

      if (step === 1) {
        setStep(2);
      }

    
    } catch (error) {
      console.log(error);
    }

    // setIsFirstTimeUser(false);
  };

  const distractionReasons = keysArray;
  
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
     {step === 1 &&  (
      <MKBox px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2}>
        <MKTypography color="dark"> Welcome Here! Fresh New User! </MKTypography>
        <MKTypography color="dark"> Please take a moment to get to know more about you! </MKTypography>

        <Card>
          <MKBox mx={5} mt={3} p={4} mb={4} textAlign="center">
            <MKTypography variant="body1">
              What types of distractions do you encounter, if any?
            </MKTypography>
            <br></br>
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
            How would you describe your level of confidence in your academic pursuits?
            <br></br>
            <MKInput
              label="Type here..."
              id="confidence"
              onChange={(e) => setConfidence(e.target.value)}
            />
          </MKBox>
        </Card>

        <Card>
          <MKBox mx={5} mt={3} p={4} mb={4} textAlign="center">
            How organized do you feel in terms of planning and prioritizing tasks?
            <br></br>
            <MKInput
              label="Type here..."
              id="organization"
              onChange={(e) => setOrganization(e.target.value)}
            />
          </MKBox>
        </Card>

        <Card>
          <MKBox mx={5} mt={3} p={4} mb={4} textAlign="center">
            Are you familiar with mindfulness practices, and do you incorporate them into your routine?
            <br></br>
            <MKInput
              label="Type here..."
              id="mindfulness"
              onChange={(e) => setMindfulness(e.target.value)}
            />
          </MKBox>
        </Card>

        <Card>
          <MKBox mx={5} mt={3} p={4} mb={4} textAlign="center">
            How can the app best support you in tracking your mental well-being?
            <br></br>
            <MKInput
              label="Type here..."
              id="support"
              textAlign="center"
              onChange={(e) => setSupport(e.target.value)}
            />
          </MKBox>
        </Card>

        <MKButton
          variant="outlined"
          color="dark"
          onClick={sendInitialSettingData}
          >
          Get a Long-term Plan for your Assistant!
        </MKButton>
      </MKBox>
      )}

    {step === 2 &&  (
  <MKBox
  px={1}
  width="100%"
  height="80vh"  // Adjust the height as needed
  mx="auto"
  position="relative"
  top="10vh"  // Adjust the top distance
  display="flex"
  flexDirection="column"
  justifyContent="center"
  alignItems="center"
  zIndex={2}
>
  <MKTypography color="dark">
    {longTermPlan}
  </MKTypography>

  <MKButton
    variant="outlined"
    color="dark"
    href={urlToWelcomePage}
  >
    Complete
  </MKButton>
</MKBox>
      )}


    </>
  );
};

export default SelfPlanSettingPage;