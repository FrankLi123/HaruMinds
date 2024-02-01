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
// import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";


// Images
import bgImage from "assets/images/bg-coworking.jpeg";

import config from "../../config.json";

function LandingPage() {

  console.log(config.frontEndUrl)
  const urlToLogIn = `${config.frontEndUrl}/self/authentication`;

  console.log("urlToLogIn is:" , urlToLogIn)
  return (
    <MKBox px={1} width="90%" height="100vh" mx="auto" position="relative" zIndex={2}>
      <MKBox component="nav" position="absolute" top="0.5rem" width="100%">
        
        <Container>
          <Grid container flexDirection="row" alignItems="center">
    
            <MKButton
              variant="outlined"
              color="white"
              sx={{ display: { xs: "block", lg: "none" }, ml: "auto" }}
            >
              <MKBox component="i" color="white" className="fas fa-bars" />
            </MKButton>
            <MKBox
              component="ul"
              display={{ xs: "none", lg: "flex" }}
              p={0}
              my={0}
              mx="auto"
              sx={{ listStyle: "none" }}
            >

            </MKBox>

            <MKBox
              component="ul"
              display={{ xs: "none", lg: "flex" }}
              p={5}
              m={4}
              sx={{ listStyle: "none" }}
            >
              <MKBox component="li">
              <MKButton variant="gradient" color="light" href={urlToLogIn} >
              Log In
            </MKButton>
              </MKBox>
            </MKBox>
          </Grid>
        </Container>
      </MKBox>
      <MKBox
        display="flex"
        alignItems="center"
        minHeight="100%"
        sx={{
          backgroundImage: ({ palette: { gradients }, functions: { linearGradient, rgba } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.5),
              rgba(gradients.dark.state, 0.5)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Container>
          <Grid container item xs={12} md={7} lg={6} flexDirection="column" justifyContent="center">
            <MKTypography
              variant="h1"
              color="white"
              mb={3}
              sx={({ breakpoints, typography: { size } }) => ({
                [breakpoints.down("md")]: {
                  fontSize: size["3xl"],
                },
              })}
            >
              Welcome to HaruMinds!
            </MKTypography>
            <MKTypography variant="body1" color="white" opacity={0.8} pr={6} mr={6}>
             Know more about Yourself, Be Friend With Yourself, Rebuild your Life.
            </MKTypography>
            <Stack direction="row" spacing={1} mt={3}>
            </Stack>
          </Grid>
        </Container>
      </MKBox>
    </MKBox>
  );
}

export default LandingPage;
