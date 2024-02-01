/*
=========================================================
* Material Kit 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Material Kit 2 React pages
import React, { useState } from 'react';
import WelcomePage from "self/welcome/function";
import InitialSettingPage from "./function2";
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import Container from "@mui/material/Container";
import { Select, Box, Button, Menu, MenuItem, Popover } from "@mui/material";
import config from "../../config.json";
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { Link } from 'react-router-dom';


export default function SelfWelcomePage() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const navigate = useNavigate();

  const urlToPersonalPlanPage = `${config.frontEndUrl}/self/personalPlan`;


  const handleButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const handleSelectChange = (event) => {
    console.log("~~~~", urlToPersonalPlanPage)

    setSelectedOption(event.target.value);
    // navigate(urlToPersonalPlanPage);
  };

  const userId = sessionStorage.getItem('user_id');
  const open = Boolean(anchorEl);


  return (



    <>
        <MKBox px={1} width="90%" height="100vh" mx="auto" position="relative" zIndex={2}>
      <MKBox component="nav" position="absolute" top="0.5rem" width="100%">
      <Container>
      <Box
            component="ul"
            display={{ xs: 'none', lg: 'flex' }}
            p={5}
            m={4}
            sx={{ listStyle: 'none' }}
          >
            <Box component="li">
              <Button variant="gradient" color="light" onClick={handleButtonClick}>
                Setting
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
                <MenuItem component={Link} to={urlToPersonalPlanPage} onClick={(event) => handleSelectChange(event, 'personalPlan')}>
                  Personal Plan
                </MenuItem>
                {/* Add other menu items as needed */}
              </Menu>
            </Box>
          </Box>

      <InitialSettingPage userId={userId} />
      <br></br>
      <WelcomePage />


      </Container>
      </MKBox>
      </MKBox>
    </>
  );
}

