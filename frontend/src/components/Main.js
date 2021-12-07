import React, { Component } from "react";
import { Route } from "react-router-dom";
import AddClinic from "./Admin/AddClinic/AddClinic";
import AddDisease from "./Admin/AddDisease/Appointments";
import AddVaccination from "./Admin/AddVaccination/AddVaccination";
import Appointments from "./Home/Appointments/Appointments";
import Dashboard from "./Home/Dashboard/Dashboard";
import VaccinationHistory from "./Home/VaccinationHistory/VaccinationHistory";
import VaccinationsDue from "./Home/VaccinationsDue/VaccinationsDue";
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
          <Route path="/addClinic" component={AddClinic} />
          <Route path="/addDisease" component={AddDisease} />
          <Route path="/addVaccination" component={AddVaccination} />
          <Route path="/appointments" component={Appointments} />
          <Route path="/vaccinationHistory" component={VaccinationHistory} />
          <Route path="/vaccinationsDue" component={VaccinationsDue} />
      </React.Fragment>
    );
  }
}
//Export The Main Component
export default Main;
