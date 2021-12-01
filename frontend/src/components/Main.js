import React, { Component } from "react";
import { Route } from "react-router-dom";
import SignUp from "./SignUp/SignUp";

class Main extends Component {
  render() {
    return (
      <React.Fragment>
          <Route exact path="/" component={SignUp} />
          <Route path="/signup" component={SignUp} />
      </React.Fragment>
    );
  }
}
//Export The Main Component
export default Main;
