
// import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import MKBox from "components/MKBox";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { useState } from "react";


// eslint-disable-next-line react/prop-types
const QuestionComponent = ({ onYesClick, onNoClick, onYesTipClick, onNoTipClick,onClose })=> {

    const [pageNum, setPageNum] = useState(1);

    const handleOptionClick = (option, number) => {
   
        setPageNum(pageNum+1);
            
        if(option){
            if(number == 1){
                onYesClick();                
            }else{
                onYesTipClick();
            }
        }else{
            if(number == 1){
                onNoClick();
            }else{
                onNoTipClick();
            }
        }
        console.log("In handleOptionClick, the pageNum is:", number)
        if(pageNum == 2){
            onClose(); // Close the distracted question component
        }
      };
      
    return (
        <MKBox zIndex={2}>
        <Grid container alignItems="center" height="100%">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
           
           { pageNum == 1 && (<Card>
              <MKBox p={4} mb={4} textAlign="center">
             Were you distracted or influenced just now?
              </MKBox>
              <MKButton variant="text" color="info" onClick={() => handleOptionClick(true, pageNum)}>Yes</MKButton>
              <MKButton variant="text" color="info" onClick={() => handleOptionClick(false, pageNum)}>No</MKButton>
            </Card>)
            }


            { pageNum == 2 && (<Card>
              <MKBox p={4} mb={4} textAlign="center">
             Did you manage to use the tip to help yourself?
              </MKBox>
              <MKButton variant="text" color="info" onClick={() => handleOptionClick(true, pageNum)}>Yes</MKButton>
              <MKButton variant="text" color="info" onClick={() => handleOptionClick(false, pageNum)}>No</MKButton>
            </Card>)
            }

            {/* <br> */}
          
          </Grid>
        </Grid>
      </MKBox>
  
      );
}


export default QuestionComponent;