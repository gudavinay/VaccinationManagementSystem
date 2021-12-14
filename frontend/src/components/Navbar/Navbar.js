import React, { Component } from "react";
import { Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { DatePicker } from "@mui/lab";
import { Link, Redirect } from "react-router-dom";
import { TextField } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import moment from "moment";
import Clock from "react-live-clock";
import { getMimicTime } from "../Services/ControllerUtils";
import { firebase } from "./../../Firebase/firebase";

class NavigationBar extends Component {
  constructor(props) {
    let maxDate = new Date(moment().add(1, "year"));
    super(props);
    this.state = {
      isAdmin: false,
      currentTime: getMimicTime(),
      maxDate: maxDate,
      signOut: false,
    };
  }
  signOut = () => {
    firebase.auth().signOut();
    localStorage.clear();
    this.setState({ signOut: true });
  };
  render() {
    if (this.state.signOut) {
      return <Redirect to="/" />;
    }

    return (
      <div style={{ marginBottom: "10%" }}>
        <Navbar
          className="justify-content-end"
          expand="lg"
          bg="dark"
          variant="dark"
          fixed="top"
        >
          <Navbar.Brand>
            <Link to="/dashboard">Vaccination Management System </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {localStorage.getItem("userData") &&
              JSON.parse(localStorage.getItem("userData")).isAdmin ? (
                <AdminSnippet />
              ) : (
                <UserSnippet />
              )}
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="GLOBAL DATE"
                  value={this.state.currentTime}
                  onChange={(e) => {
                    localStorage.setItem("time", e);
                    window.location.reload();
                    this.setState({ currentTime: e });
                  }}
                  renderInput={(params) => <TextField {...params} />}
                  minDate={this.state.currentTime}
                  maxDate={this.state.maxDate}
                />
                <div style={{ color: "whitesmoke" }}>
                  Global Clock:{" "}
                  {moment(this.state.currentTime).format("MMM Do YYYY")}{" "}
                  <Clock
                    format={"HH:mm:ss"}
                    ticking={true}
                    timezone={"US/Pacific"}
                  />
                </div>
              </LocalizationProvider>
              {this.state.today}
              {/* {this.state.maxDate} */}
              {/* } */}
              <Nav.Link
                className="justify-content-end"
                onClick={() => {
                  this.signOut();
                }}
              >
                Log out
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

const AdminSnippet = () => {
  return (
    <React.Fragment>
      <Nav.Link>
        <Link to="/addDisease">Add Disease</Link>
      </Nav.Link>
      <Nav.Link>
        <Link to="/addClinic">Add Clinic</Link>
      </Nav.Link>
      <Nav.Link>
        <Link to="/addVaccination">Add Vaccination</Link>
      </Nav.Link>
    </React.Fragment>
  );
};
const UserSnippet = () => {
  return (
    <React.Fragment>
      <Nav.Link>
        <Link to="/vaccinationHistory">Vaccination History</Link>
      </Nav.Link>
      <Nav.Link>
        <Link to="/appointments">Appointments</Link>
      </Nav.Link>
      <Nav.Link>
        <Link to="/vaccinationsDue">Vaccinations Due</Link>
      </Nav.Link>
    </React.Fragment>
  );
};

export default NavigationBar;
