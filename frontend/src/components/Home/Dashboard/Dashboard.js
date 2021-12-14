import React, { Component } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import VaccinationHistory from "../VaccinationHistory/VaccinationHistory";
import Appointments from "../Appointments/Appointments";
import VaccinationsDue from "../VaccinationsDue/VaccinationsDue";
import Navbar from "./../../Navbar/Navbar";
import { Redirect } from "react-router";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

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
          <Row>
            <Col>
              <Card>
                <Card.Header className="mb-2 text-muted">
                  Vaccination History
                </Card.Header>
                <Card.Body>
                  <VaccinationHistory />
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Header className="mb-2 text-muted">
                  Appointments
                </Card.Header>
                <Card.Body>
                  <Appointments />
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Header className="mb-2 text-muted">
                  Vaccinations Due
                </Card.Header>
                <Card.Body>
                  <VaccinationsDue />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default Dashboard;
