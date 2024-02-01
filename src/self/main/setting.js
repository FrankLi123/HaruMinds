// SettingPage.js
import React, { useState, useEffect } from "react";
// import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import MKBox from "components/MKBox";
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MKTypography from "components/MKTypography";
// import Typography from '@mui/material/Typography';
import TaskCreationPage from "./taskCreationPage"; // Import the new component
import { retrieveDailyPlanRequest } from "./api/handler";

const SettingPage = ({updateMainPageState}) => {
  
  // eslint-disable-next-line no-unused-vars
  // const [recordTime, setRecordTime] = useState('');
  const [dailyPlanText, setDailyPlanText] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [tasks, setTasks] = useState([]);

  const addTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const removeTask = (index) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  const handleFormSettingChange = () => {
    updateMainPageState(tasks);
    console.log("the tasks are:", tasks)
  };


  const handleNextClick = () => {
    setPageNumber(pageNumber + 1);
  };

  const handleStartClick = () => {
    handleFormSettingChange();
  };

  const userId = sessionStorage.getItem('user_id');

  const showDailyPlanResponse = async () => {
    try {
      const res = await retrieveDailyPlanRequest(userId);

      console.log("showDailyPlanResponse, the res :", res);
      setDailyPlanText(res.message);
    } catch (error) {
      console.log(error);
    }
  };
  

  useEffect(() => {
    showDailyPlanResponse();
  }, []);

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
          {pageNumber === 1 && (
            <>
              <MKTypography color="white"> Welcome Back!</MKTypography>
              <Card>
                <MKBox mx={5} mt={3} p={4} mb={4} textAlign="center">
                  Hello! {dailyPlanText}
                </MKBox>
              </Card>
              <MKButton onClick={handleNextClick}> Next </MKButton>
            </>
          )}

          {pageNumber === 2 && (
            <>
              <TaskCreationPage addTask={addTask} removeTask={removeTask}
              />

              <MKButton variant="outlined" color="light" onClick={handleStartClick}>
                START
              </MKButton>
            </>
          )}
        </Grid>
      </MKBox>
    </>
  );
};

export default SettingPage;