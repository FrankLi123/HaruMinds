
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import MKBox from "components/MKBox";
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { useState } from "react";
import { getOpenAIResult } from "./api/handler";
// import MKTypography from "components/MKTypography";
// eslint-disable-next-line react/prop-types
const TextPage = ({setShowStart})=> {

  const [inputText, setInputText] = useState('');
  const [response, setResponse] = useState('Hey, how can I help you?');

  // const [showResponse, setShowResponse] = useState(true);
  // const handleFormSettingChange = () =>{
    // updateMainPageState(recordTime * 60);
  // }

  const handleClickBack =()=>{
    setShowStart(1);
  }

  const handleSubmitClick = async()=>{

    try{
      // setShowResponse(false);

      console.log("the input Text is ", inputText)
      const res = await getOpenAIResult(inputText);
      
      console.log("res.sentence is :", res);
         
      setResponse(res);
  
      console.log('The response is:', response);
    
    }catch(error){
        console.log(error)
    }

  }

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
           
          <MKButton
                  variant="outlined"
                  color="light"
                  onClick={handleClickBack}
                > BACK
                </MKButton>

            <Grid container spacing={2} justifyContent="center" alignItems="center" height="100%">
              {/* <Grid item xs={11} sm={9} md={5} lg={4} xl={3}> */}
                <Card>
                  <MKBox  mx={5} mt={3} p={4} mb={4} textAlign="center">
                  {response}
                  </MKBox>
                  <MKInput label="Type here..." multiline rows={5}   value={inputText}
              onChange={(e) => setInputText(e.target.value)}/>

                  <MKButton
                  variant="outlined"
                  color="primary"
                  onClick={handleSubmitClick}
                > SUBMIT
                </MKButton>
                </Card>

                {/* {showResponse && ( */}
                <Card>
              
                  {/* <MKBox  mx={5} mt={3} p={4} mb={4} textAlign="center">
                    {response}
                 </MKBox> */}
              
                </Card>
               {/* )}    */}

        
            </Grid>
          </MKBox>
       
        </>
      );
}


export default TextPage;