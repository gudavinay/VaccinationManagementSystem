import React, { Component } from "react";
import { Col, Container, Nav, Row, NavDropdown } from "react-bootstrap";
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
import logo from "./../Resources/logo.svg";

class NavigationBar extends Component {
  constructor(props) {
    let maxDate = new Date(moment().add(1, "year"));
    super(props);
    this.state = {
      isAdmin: false,
      localTime: new Date(new Date(moment())),
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
      <div>
        <Container
          style={{
            boxShadow: "1px 1px 15px #808080, -5px -5px 10px #ffffff",
            borderRadius: "15px",
            marginTop: "5px",
            marginBottom: "15px",
          }}
        >
          <Row>
            <Col md={2}>
              <div>
                <Link to="/dashboard">
                  <div style={{ cursor: "pointer", display: "flex" }}>
                    <img src={logo} style={{ width: "100%", height: "60px" }} />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <span style={{ fontSize: "36px", paddingTop: "10px" }}>
                        VMS
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            </Col>
            <Col>
              <Row>
                <Col style={{ display: "flex" }} md={9}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      marginRight: "10px",
                    }}
                  >
                    <NavDropdown
                      id="nav-dropdown-dark-example"
                      title="Resources"
                      menuVariant="dark"
                      // style={{ paddingTop: "10px" }}
                    >
                      {localStorage.getItem("userData") &&
                      JSON.parse(localStorage.getItem("userData")).isAdmin ? (
                        <AdminSnippet />
                      ) : (
                        <UserSnippet />
                      )}
                    </NavDropdown>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                    }}
                  >
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
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          marginLeft: "10px",
                          width: "275px",
                          fontSize: "14px",
                        }}
                      >
                        <span>
                          Global Clock:{" "}
                          {moment(this.state.currentTime).format("MMM Do YYYY")}{" "}
                          <Clock
                            format={"HH:mm:ss"}
                            ticking={true}
                            timezone={"US/Pacific"}
                          />
                        </span>
                        <span>
                          Local Clock:{"  "}
                          {moment(this.state.localTime).format(
                            "MMM Do YYYY"
                          )}{" "}
                          <Clock
                            format={"HH:mm:ss"}
                            ticking={true}
                            timezone={"US/Pacific"}
                          />
                        </span>
                      </div>
                    </LocalizationProvider>
                    {/* {this.state.today} */}
                  </div>
                </Col>
                <Col style={{ display: "flex" }} md={3}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    {localStorage.getItem("userData") &&
                    JSON.parse(localStorage.getItem("userData")).isAdmin ? (
                      <span style={{ color: "red" }}>ADMIN</span>
                    ) : (
                      <span style={{ color: "green" }}>PATIENT</span>
                    )}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <NavDropdown
                      // style={{ paddingTop: "10px" }}
                      id="nav-dropdown-dark-example"
                      title={
                        localStorage.getItem("userData")
                          ? JSON.parse(localStorage.getItem("userData"))
                              .firstName
                          : ""
                      }
                      menuVariant="dark"
                    >
                      <NavDropdown.Item>
                        <Link to="/userProfile">User Profile</Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <Link
                          to="/"
                          onClick={() => {
                            this.signOut();
                          }}
                        >
                          Log Out
                        </Link>
                      </NavDropdown.Item>
                    </NavDropdown>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const AdminSnippet = () => {
  return (
    <React.Fragment>
      <NavDropdown.Item>
        <Link to="/addDisease">Add Disease</Link>
      </NavDropdown.Item>
      <NavDropdown.Item>
        <Link to="/addClinic">Add Clinic</Link>
      </NavDropdown.Item>
      <NavDropdown.Item>
        <Link to="/addVaccination">Add Vaccination</Link>
      </NavDropdown.Item>
    </React.Fragment>
  );
};
const UserSnippet = () => {
  return (
    <React.Fragment>
      <NavDropdown.Item>
        <Link to="/vaccinationHistory">Vaccination History</Link>
      </NavDropdown.Item>
      <NavDropdown.Item>
        <Link to="/appointments">Appointments</Link>
      </NavDropdown.Item>
      <NavDropdown.Item>
        <Link to="/vaccinationsDue">Vaccinations Due</Link>
      </NavDropdown.Item>
    </React.Fragment>
  );
};

export default NavigationBar;
