
// import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import MKBox from "components/MKBox";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
// import { useState } from "react";


// eslint-disable-next-line react/prop-types
const QuestionComponent = ({ onYesClick, onNoClick, onClose })=> {

    const handleOptionClick = (option) => {

        if(option){
          onYesClick();
        }else{
          onNoClick();
        }
        onClose(); // Close the distracted question component
      };

      
    return (
        <MKBox zIndex={2}>
        <Grid container alignItems="center" height="100%">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            <Card>
              <MKBox p={4} mb={4} textAlign="center">
             Were you distracted or influenced just now?
              </MKBox>
              <MKButton variant="text" color="info" onClick={() => handleOptionClick(true)}>Yes</MKButton>
              <MKButton variant="text" color="info" onClick={() => handleOptionClick(false)}>No</MKButton>

            </Card>
            {/* <br> */}
          
          </Grid>
        </Grid>
      </MKBox>
  
      );
}


export default QuestionComponent;