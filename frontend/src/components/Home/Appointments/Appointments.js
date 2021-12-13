import React, { Component } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Container } from "@mui/material";
import { Link } from "react-router-dom";
import { Col, Row, Button } from "react-bootstrap";
import axios from "axios";
import backendServer from "../../../webConfig";
class Appointments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: "panel1",
      allAppointments: [],
    };
  }

  componentDidMount = () => {
    let date = new Date().today;
    axios
      .get(`${backendServer}/getAppointmentsForUser/85887`)
      .then((response) => {
        this.setState({ allAppointments: response.data });
      });
  };

  render() {
    let futureAppointments = this.state.allAppointments.map((item) =>
      new Date(item.appointmentDateTime) > new Date() ? (
        <Row
          key={item.appointmentId}
          style={{
            border: "1px solid #bbb",
            borderRadius: "15px",
            padding: "10px 25px",
            margin: "10px",
          }}
        >
          <Col md={8}>
            <div>Clinic: {item.clinic.name}</div>
            <div>
              Address: {item.clinic.address.street}, {item.clinic.address.city}
            </div>
            <div>
              Appointment Date:{" "}
              {new Date(item.appointmentDateTime).toDateString()}
            </div>
            <div>
              Appointment Time:{" "}
              {new Date(item.appointmentDateTime).toTimeString()}
            </div>
            <div>
              <Button variant="primary">Check In</Button>
            </div>
          </Col>
          <Col>
            List of Vaccinations:
            <ul>
              {item.vaccinations.map((elem) => (
                <li>{elem.vaccinationName}</li>
              ))}
            </ul>
          </Col>
        </Row>
      ) : null
    );
    let cancelledAppointments = this.state.allAppointments.map((item) =>
      new Date(item.appointmentDateTime) < new Date() &&
      item.isCheckedIn == 3 ? (
        <Row
          key={item.appointmentId}
          style={{
            border: "1px solid #bbb",
            borderRadius: "15px",
            padding: "10px 25px",
            margin: "10px",
          }}
        >
          <Col md={8}>
            <div>Clinic: {item.clinic.name}</div>
            <div>
              Address: {item.clinic.address.street}, {item.clinic.address.city}
            </div>
            <div>
              Appointment Date:{" "}
              {new Date(item.appointmentDateTime).toDateString()}
            </div>
            <div>
              Appointment Time:{" "}
              {new Date(item.appointmentDateTime).toTimeString()}
            </div>
            <div>
              <Button disabled variant="danger">
                Cancelled
              </Button>
            </div>
          </Col>
          <Col>
            List of Vaccinations:
            <ul>
              {item.vaccinations.map((elem) => (
                <li>{elem.vaccinationName}</li>
              ))}
            </ul>
          </Col>
        </Row>
      ) : null
    );
    let pastAppointments = this.state.allAppointments.map((item) =>
      new Date(item.appointmentDateTime) < new Date() &&
      (item.isCheckedIn == 1 || item.isCheckedIn == 2) ? (
        <Row
          key={item.appointmentId}
          style={{
            border: "1px solid #bbb",
            borderRadius: "15px",
            padding: "10px 25px",
            margin: "10px",
          }}
        >
          <Col md={8}>
            <div>Clinic: {item.clinic.name}</div>
            <div>
              Address: {item.clinic.address.street}, {item.clinic.address.city}
            </div>
            <div>
              Appointment Date:{" "}
              {new Date(item.appointmentDateTime).toDateString()}
            </div>
            <div>
              Appointment Time:{" "}
              {new Date(item.appointmentDateTime).toTimeString()}
            </div>
            <div>
              {item.isCheckedIn == 1 ? (
                <Button disabled variant="success">
                  Completed
                </Button>
              ) : (
                <Button disabled variant="warning">
                  No Show
                </Button>
              )}
            </div>
          </Col>
          <Col>
            List of Vaccinations:
            <ul>
              {item.vaccinations.map((elem) => (
                <li>{elem.vaccinationName}</li>
              ))}
            </ul>
          </Col>
        </Row>
      ) : null
    );
    return (
      <React.Fragment>
        {/* <pre>{JSON.stringify(this.state, "", 2)}</pre> */}
        I'm in Appointments
        <Container>
          <Link to="/newAppointment">
            <Button variant="outline-primary">New Appointment</Button>
          </Link>
          <Accordion
            square
            expanded={this.state.expanded === "panel1"}
            onChange={(e) => {
              this.setState({ expanded: "panel1" });
            }}
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <Typography>Future Appointments</Typography>
            </AccordionSummary>
            <AccordionDetails>{futureAppointments}</AccordionDetails>
          </Accordion>
          <Accordion
            square
            expanded={this.state.expanded === "panel2"}
            onChange={(e) => {
              this.setState({ expanded: "panel2" });
            }}
          >
            <AccordionSummary
              aria-controls="panel2d-content"
              id="panel2d-header"
            >
              <Typography>Cancelled Appointments</Typography>
            </AccordionSummary>
            <AccordionDetails>{cancelledAppointments}</AccordionDetails>
          </Accordion>
          <Accordion
            square
            expanded={this.state.expanded === "panel3"}
            onChange={(e) => {
              this.setState({ expanded: "panel3" });
            }}
          >
            <AccordionSummary
              aria-controls="panel3d-content"
              id="panel3d-header"
            >
              <Typography>Past Appointments</Typography>
            </AccordionSummary>
            <AccordionDetails>{pastAppointments}</AccordionDetails>
          </Accordion>
        </Container>
      </React.Fragment>
    );
  }
}

export default Appointments;
