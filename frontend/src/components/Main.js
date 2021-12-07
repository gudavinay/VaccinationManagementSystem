import React, { Component } from "react";
import { Route } from "react-router-dom";
import Dashboard from "./Home/Dashboard/Dashboard";
import Navbar from "./Navbar/Navbar";
import SignUp from "./SignUp/SignUp";

class Main extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar/>
          <Route exact path="/" component={SignUp} />
          <Route path="/signup" component={SignUp} />
          <Route path="/dashboard" component={Dashboard} />
      </React.Fragment>
    );
  }
}
//Export The Main Component
export default Main;
