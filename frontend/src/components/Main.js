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
import PasswordReset from "./UserProfile/PasswordReset";
import UserProfile from "./UserProfile/UserProfile";
import Navbar from "./Navbar/Navbar";

class Main extends Component {
  render() {
    return (
      <React.Fragment>
        {localStorage.getItem("userData") ? <Navbar /> : ""}
        <Route exact path="/" component={Landing} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/addClinic" component={AddClinic} />
        <Route path="/addDisease" component={AddDisease} />
        <Route path="/addVaccination" component={AddVaccination} />
        <Route path="/appointments" component={Appointments} />
        <Route path="/vaccinationHistory" component={VaccinationHistory} />
        <Route path="/vaccinationsDue" component={VaccinationsDue} />
        <Route path="/newAppointment" component={NewAppointment} />
        <Route path="/userProfile" component={UserProfile} />
        <Route path="/passwordReset" component={PasswordReset} />
      </React.Fragment>
    );
  }
}
//Export The Main Component
export default Main;
