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

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
// import Card from "@mui/material/Card";
// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";

// import {useLocation } from 'react-router-dom';

// Material Kit 2 React examples
// import DefaultNavbar from "examples/Navbars/DefaultNavbar";
// import DefaultFooter from "examples/Footers/DefaultFooter";

// About Us page sections
// import Information from "pages/LandingPages/AboutUs/sections/Information";
// import Team from "pages/LandingPages/AboutUs/sections/Team";
// import Featuring from "pages/LandingPages/AboutUs/sections/Featuring";
// import Newsletter from "pages/LandingPages/AboutUs/sections/Newsletter";

// Routes
// import routes from "routes";
// import footerRoutes from "footer.routes";

// Images
import bgImage from "assets/images/rotating-card-bg-back.jpeg";

import config from "../../config.json";

function WelcomePage() {

  console.log(config.frontEndUrl)
    const handleStartClick = () =>{
        window.open(`${config.frontEndUrl}/self/main`, '_blank', 'width=600,height=800');
    
      }

  return (
    <>
     
      <MKBox
        minHeight="75vh"
        width="100%"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Container>
          <Grid
            container
            item
            xs={12}
            lg={8}
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            sx={{ mx: "auto", textAlign: "center" }}
          >
            <MKTypography
              variant="h1"
              color="white"
              sx={({ breakpoints, typography: { size } }) => ({
                [breakpoints.down("md")]: {
                  fontSize: size["3xl"],
                },
              })}>
              Start Your Session
            </MKTypography>
            <MKTypography variant="body1" color="white" opacity={0.8} mt={1} mb={3}>
            Go Step onto a Road of Self-Discovery and know more about yourself ! A popped-out window will show up once you Click the Start Button.
            </MKTypography>

            <MKBox display="flex" justifyContent="center" alignItems="center">
            </MKBox>
          </Grid>

      
            
            <MKBox position="absolute" ml="573.4px">
          <MKButton
              variant="outlined"
              color="light"
              onClick={handleStartClick}
            > Start
            </MKButton>
            </MKBox>


        </Container>
      </MKBox>

    </>
  );
}

export default WelcomePage;
