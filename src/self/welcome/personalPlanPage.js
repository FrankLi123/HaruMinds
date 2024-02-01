import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import MKBox from "components/MKBox";
import config from "../../config.json";
// import  { retrieveReasonsRequest} from "../../main/api/handler";



const getLongTermPlanRequest = async(userId) => {

    try {
      const url = `${config.apiBaseUrl}/retrieve/long_term_plan?userId=${encodeURIComponent(userId)}`;
  
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
      console.log("response_data",response_data.plan)
      return response_data.plan;
  
    } catch (error) {
      // Handle errors if needed
      console.log(error)
      return null
    }
  };
 
  


const SelfPersonalPlanPage = () => {
    const urlToWelcomePage = `${config.frontEndUrl}/self/welcome`;
    // const longTermPlan = "3413123213214214321";
    const [longTermPlan, setLongTermPlan] = useState("");
    const userId = sessionStorage.getItem('user_id');

    const getLongTermPlan = async()=>{
   

        try{
            const res = await getLongTermPlanRequest(userId);
          
            console.log("res(longtermPlan) is :", res);
             
            setLongTermPlan(res);
      
            console.log('MainPage Quote:', res);
    
        }catch(error){
            console.log(error)
        }
      }
  
      
  useEffect(() => {
    getLongTermPlan()
  }, []);
  return (
    <>
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
  alignItems="flex-start"  // Align items to the left
  zIndex={2}
>
  {longTermPlan.split('\n').map((line, index) => {
    if (line.startsWith('Phase')) {
      // Style for phase title
      return (
        <MKTypography key={index} color="dark" variant="h5" mb={2} style={{ textAlign: 'left' }}>
          {line}
        </MKTypography>
      );
    } else if (line.trim() !== '') {
      // Style for bullet points
      return (
        <div key={index} style={{ marginLeft: '20px', textAlign: 'left' }}>
          <MKTypography color="dark">
            {line}
          </MKTypography>
        </div>
      );
    }
    return null;  // Skip empty lines
  })}

  <MKButton
    variant="outlined"
    color="dark"
    href={urlToWelcomePage}
  >
    Complete
  </MKButton>
</MKBox>
    </>
  );
};

export default SelfPersonalPlanPage;