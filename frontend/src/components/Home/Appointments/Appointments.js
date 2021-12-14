import React, { Component } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Container } from "@mui/material";
import { Link } from "react-router-dom";
import { Col, Row, Button, Card } from "react-bootstrap";
import axios from "axios";
import backendServer from "../../../webConfig";
import { getUserProfile, getMimicTime } from "../../Services/ControllerUtils";
import Navbar from "./../../Navbar/Navbar";
import moment from "moment";

class Appointments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: "panel1",
      allAppointments: [],
    };
  }

  handleCancelAppointment = (appointment) => {
    console.log(appointment);
    var data={
      appointmentID:appointment.appointmentId,
    };
    axios.post(`${backendServer}/cancelAppointment`, data).then((response) => {
      if (response.status === 200) {
        alert(response.data);
        this.getAppointmentsForUser();
      }
    });
  };

  handleUpdateAppointment=(appointment) => {

  }

  handleCheckin = (appointment) => {
    console.log(appointment);
    let userData = getUserProfile();
    var data = {
      user_Id: userData.mrn,
      vaccinations: appointment.vaccinations,
      appointmentId: appointment.appointmentId,
      checkInDate: getMimicTime(),
    };
    axios.post(`${backendServer}/checkInAppointment`, data).then((response) => {
      if (response.status === 200) {
        alert(response.data);
        this.getAppointmentsForUser();
      }
    });
  };

  getAppointmentsForUser() {
    let userData = getUserProfile();
    if (userData != null) {
      axios
        .get(`${backendServer}/getAppointmentsForUser/${userData.mrn}`)
        .then((response) => {
          this.setState({ allAppointments: response.data });
          for (let appointment of response.data) {
            console.log(new Date(moment(appointment.appointmentDateTime)) > getMimicTime());
          }
        });
    }
  }

  componentDidMount = () => {
    // let date = new Date().today;
    this.getAppointmentsForUser();
  };

  render() {
    let futureAppointments = this.state.allAppointments.map((item) =>
      ((new Date(moment(item.appointmentDateTime))) > (new Date(getMimicTime()))) ? (
        <Card key={item.appointmentId} >
          <Card.Body>
            <Row>
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
                  {item.appointmentTimeStr}
                </div>
                <div>
                  <Col>
                  <Button
                      variant="primary"
                      onClick={(e) => this.handleCancelAppointment(item)}
                    >
                      Cancel
                    </Button>
                    <Button
                      style={{margin:"20px"}}
                      variant="primary"
                      onClick={(e) => this.handleUpdateAppointment(item)}
                    >
                      Update
                    </Button>
                  
                  {/* {(moment(item.appointmentDateTime)).diff((new Date(getMimicTime())), 'seconds') } */}
                  {!item.isChecked ? (
                    <Button
                      variant="primary"
                      style={{marginLeft:"20px"}}
                      onClick={(e) => this.handleCheckin(item)}
                      disabled={(moment(item.appointmentDateTime)).diff((new Date(getMimicTime())), 'seconds') > 86400}
                    >
                      Check In
                    </Button>

                    
                  ) : (
                    <Button
                      variant="primary"
                      disabled
                    >
                      Checked In
                    </Button>
                  )}
                  </Col>
                </div>
              </Col>
              <Col>
                List of Vaccinations:
                <ul>
                  {item.vaccinations.map((elem) => (
                    <li>{elem.vaccinationName}</li>
                  ))}
                </ul>
              </Col></Row>
          </Card.Body>
        </Card>
      ) : null
    );
    let cancelledAppointments = this.state.allAppointments.map((item) =>
      new Date(item.appointmentDateTime) < new Date() &&
        item.isChecked === 3 ? (
        <Card key={item.appointmentId} >
          <Card.Body>
            <Row>
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
                {item.appointmentTimeStr}
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
          </Card.Body>

        </Card>
      ) : null
    );
    let pastAppointments = this.state.allAppointments.map((item) =>
      ((new Date(moment(item.appointmentDateTime))) < (new Date(getMimicTime()))) &&
        (item.isChecked === 1 || item.isChecked === 2) ? (
        <Card key={item.appointmentId} >
          <Card.Body>
          <Row>
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
              {item.appointmentTimeStr}
            </div>
            <div>
              {item.isChecked === 1 ? (
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
          </Card.Body>
        </Card>
      ) : null
    );
    return (
      <React.Fragment>
        {this.props.history && localStorage.getItem("userData") === null
          ? this.props.history.push("/")
          : null}
        <Navbar />
        {/* <pre>{JSON.stringify(this.state, "", 2)}</pre> */}
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
        <pre>{JSON.stringify(this.state, "", 2)}</pre>
      </React.Fragment>
    );
  }
}

export default Appointments;
