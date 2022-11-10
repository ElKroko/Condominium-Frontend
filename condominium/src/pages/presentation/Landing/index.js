import React from "react";

import AppBar from "./AppBar";
import Variants from "./Variants";
import Features from "./Features";

function Presentation() {
  return (
    <React.Fragment>
      <AppBar />
      <Variants />
      <Features />
    </React.Fragment>
  );
}

export default Presentation;
