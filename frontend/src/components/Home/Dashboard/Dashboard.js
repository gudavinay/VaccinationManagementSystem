import React, { Component } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import VaccinationHistory from "../VaccinationHistory/VaccinationHistory";
import Appointments from "../Appointments/Appointments";
import VaccinationsDue from "../VaccinationsDue/VaccinationsDue";
import Navbar from "./../../Navbar/Navbar";
import { Redirect } from "react-router";
import "./Dashboard.css";
import axios from "axios";
import backendServer from "../../../webConfig";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      window: 1,
    };
  }

  // getReports = () => {
  //   if (localStorage.getItem("userData")) {
  //     if (JSON.parse(localStorage.getItem("userData")).isAdmin) {
  //       axios.post(`${backendServer}/cancelAppointment`).then((response) => {
  //         if (response.status === 200) {
  //         }
  //       });
  //     } else {
  //       axios.post(`${backendServer}/`).then((response) => {
  //         if (response.status === 200) {
  //         }
  //       });
  //     }
  //   }
  // };

  render() {
    if (localStorage.getItem("userData") === null) {
      return <Redirect to="/" />;
    }
    if (localStorage.getItem("newUser")) {
      return <Redirect to="/passwordReset" />;
    }
    return (
      <React.Fragment>
        <Container>
          <Card>
            <Card.Header className="mb-2 text-muted" style={{ padding: "0" }}>
              <Row style={{ margin: "0" }}>
                <Col
                  md={2}
                  className={this.state.window === 1 ? "bgColor" : "windows"}
                  style={{ textAlign: "center", padding: "7px 10px" }}
                  onClick={() => {
                    if (this.state.window !== 1) this.setState({ window: 1 });
                  }}
                >
                  {localStorage.getItem("userData") &&
                  localStorage.getItem("userData").isAdmin
                    ? "System Report"
                    : "Patient Report"}
                </Col>
                <Col
                  md={2}
                  className={this.state.window === 2 ? "bgColor" : "windows"}
                  style={{ textAlign: "center", padding: "7px 10px" }}
                  onClick={() => {
                    if (this.state.window !== 2) this.setState({ window: 2 });
                  }}
                >
                  {localStorage.getItem("userData") &&
                  !localStorage.getItem("userData").isAdmin
                    ? "Vaccination History"
                    : null}
                </Col>
                <Col
                  md={2}
                  className={this.state.window === 3 ? "bgColor" : "windows"}
                  style={{ textAlign: "center", padding: "7px 10px" }}
                  onClick={() => {
                    if (this.state.window !== 3) this.setState({ window: 3 });
                  }}
                >
                  {localStorage.getItem("userData") &&
                  !localStorage.getItem("userData").isAdmin
                    ? "Appointments"
                    : null}
                </Col>
                <Col
                  md={2}
                  className={this.state.window === 4 ? "bgColor" : "windows"}
                  style={{ textAlign: "center", padding: "7px 10px" }}
                  onClick={() => {
                    if (this.state.window !== 4) this.setState({ window: 4 });
                  }}
                >
                  {localStorage.getItem("userData") &&
                  !localStorage.getItem("userData").isAdmin
                    ? "Vaccinations Due"
                    : null}
                </Col>
              </Row>
            </Card.Header>
            <Card.Body style={{ minHeight: "500px" }}>
              {this.state.window === 1 ? "Report" : null}
              {this.state.window === 2 ? <VaccinationHistory /> : null}
              {this.state.window === 3 ? <Appointments /> : null}
              {this.state.window === 4 ? <VaccinationsDue /> : null}
            </Card.Body>
          </Card>

          {/* <Card>
            <Card.Header className="mb-2 text-muted">
              Vaccination History
            </Card.Header>
            <Card.Body>
              <VaccinationHistory />
            </Card.Body>
          </Card>

          <Card>
            <Card.Header className="mb-2 text-muted">Appointments</Card.Header>
            <Card.Body>
              <Appointments />
            </Card.Body>
          </Card>

          <Card>
            <Card.Header className="mb-2 text-muted">
              Vaccinations Due
            </Card.Header>
            <Card.Body>
              <VaccinationsDue />
            </Card.Body>
          </Card> */}
        </Container>
      </React.Fragment>
    );
  }
}

export default Dashboard;
