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

// Sections components
// import BaseLayout from "layouts/sections/components/BaseLayout";
// import View from "layouts/sections/components/View";

// PageHeaders page components
import LandingPage from "self/landing/function";

function SelfLandingPage() {
  return (
    // <BaseLayout
    //   title="Page Headers"
    //   breadcrumb={[
    //     { label: "Page Sections", route: "/self/landing" },
    //     { label: "Page Headers" },
    //   ]}
    // >
      // <View title="Header 1" height="40rem">
        <LandingPage />
      // </View>
    /* // </BaseLayout> */
  );
}

export default SelfLandingPage;
