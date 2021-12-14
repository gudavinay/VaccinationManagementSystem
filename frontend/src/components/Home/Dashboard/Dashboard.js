import React, { Component } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import VaccinationHistory from "../VaccinationHistory/VaccinationHistory";
import Appointments from "../Appointments/Appointments";
import VaccinationsDue from "../VaccinationsDue/VaccinationsDue";
import Navbar from "./../../Navbar/Navbar";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        {this.props.history && localStorage.getItem("userData") === null
          ? this.props.history.push("/")
          : null}
        <Navbar />
        Hello this is dashboard
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
