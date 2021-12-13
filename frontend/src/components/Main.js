import React, { Component } from "react";
import { Route } from "react-router-dom";
import AddClinic from "./Admin/AddClinic/AddClinic";
import AddDisease from "./Admin/AddDisease/AddDisease";
import AddVaccination from "./Admin/AddVaccination/AddVaccination";
import Appointments from "./Home/Appointments/Appointments";
import Dashboard from "./Home/Dashboard/Dashboard";
import NewAppointment from "./Home/NewAppointment/NewAppointment";
import VaccinationHistory from "./Home/VaccinationHistory/VaccinationHistory";
import VaccinationsDue from "./Home/VaccinationsDue/VaccinationsDue";
import Landing from "./Landing/Landing";
import Navbar from "./Navbar/Navbar";
import SignUp from "./UserAuth/SignUp";
import Login from "./LogIn/LogIn";

class Main extends Component {
  render() {
    return (
      <React.Fragment>
        {localStorage.getItem("user") ? <Navbar /> : null}
        <Route exact path="/" component={Landing} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/addClinic" component={AddClinic} />
        <Route path="/addDisease" component={AddDisease} />
        <Route path="/addVaccination" component={AddVaccination} />
        <Route path="/appointments" component={Appointments} />
        <Route path="/vaccinationHistory" component={VaccinationHistory} />
        <Route path="/vaccinationsDue" component={VaccinationsDue} />
        <Route path="/newAppointment" component={NewAppointment} />
      </React.Fragment>
    );
  }
}
//Export The Main Component
export default Main;
