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
import bgImage from "assets/images/rotating-card-bg-front.jpeg";
import config from "../../config.json";
// import { Link } from 'react-router-dom'; 

function InitialSettingPage() {


  const urlToPlanSettingPage = `${config.frontEndUrl}/self/planSetting`;

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
              DEsign your Path
            </MKTypography>
            <MKTypography variant="body1" color="white" opacity={0.8} mt={1} mb={3}>
            Have the AI assistant help you design the path toward good habits!
            </MKTypography>

            <MKBox display="flex" justifyContent="center" alignItems="center">
            </MKBox>
          </Grid>


            <MKBox position="absolute" ml="573.4px">
            {/* <Link to={`${urlToPlanSettingPage}?param1=${param1}&param2=${param2}`}> */}
          <MKButton
              variant="outlined"
              color="light"
              href={urlToPlanSettingPage}
            > Start
            </MKButton>
            {/* </Link> */}
            </MKBox>

        </Container>
      </MKBox>

    </>
  );
}

export default InitialSettingPage;
