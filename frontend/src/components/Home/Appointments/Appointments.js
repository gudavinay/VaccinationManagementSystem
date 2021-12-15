import React, { Component } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Container } from "@mui/material";
import { Link, Redirect } from "react-router-dom";
import { Col, Row, Button, Card } from "react-bootstrap";
import axios from "axios";
import backendServer from "../../../webConfig";
import { getUserProfile, getMimicTime } from "../../Services/ControllerUtils";
import Navbar from "./../../Navbar/Navbar";
import moment from "moment";
import NewAppointment from "../NewAppointment/NewAppointment";
import emailjs from "emailjs-com";
import { init } from "emailjs-com";
import swal from "sweetalert";

class Appointments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: "panel1",
      allAppointments: [],
      futureAppointments: [],
      pastAppointments: [],
      cancelledAppointments: [],
      navigateToUpdateAppointment: false,
    };
  }

  handleCancelAppointment = (appointment) => {
    console.log(appointment);
    var data = {
      appointmentID: appointment.appointmentId,
    };
    axios.post(`${backendServer}/cancelAppointment`, data).then((response) => {
      if (response.status === 200) {
        alert(response.data);
        this.getAppointmentsForUser();
        this.sendEmailToClient(appointment);
      }
    });
  };

  sendEmailToClient(appointment) {
    swal("Success", "Appointment cancelled successfully. Please check your cancellation email for additional details", "success");
    init("user_VU6t0UaXlMzjO5o6MJQjc");
    let vaccinations = [];
    for(let vacc of appointment.vaccinations){
      vaccinations.push(vacc.vaccinationName);
    }
    let data = {
      to_name: getUserProfile().firstName +" "+ getUserProfile().lastName,
      clinic_name: appointment.clinic.name,
      vaccination_list: vaccinations.toString(),
      appointment_date: appointment.appointmentDateStr,
      start_time: appointment.appointmentTimeStr,
      to_email: getUserProfile().email,
      status: "cancelled"
    };
    console.log(data);
    emailjs
      .send("service_10aywqh", "template_8ht3awb", data)
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleCheckin = (appointment) => {
    console.log(appointment);
    let userData = getUserProfile();
    let noShowStatus=false;
    if(moment(appointment.appointmentDateTime).diff(new Date(getMimicTime()),"seconds") < 0)
    {
      noShowStatus=true;
      alert("Checkin time has expired. Please book another appointment");
    }
    var data = {
      user_Id: userData.mrn,
      vaccinations: appointment.vaccinations,
      appointmentId: appointment.appointmentId,
      checkInDate: getMimicTime(),
      noShow:noShowStatus
    };
    axios.post(`${backendServer}/checkInAppointment`, data).then((response) => {
      if (response.status === 200) {
        alert("Checkin Successfull");
        this.getAppointmentsForUser();
      }
    });
  };

  getAppointmentsForUser() {
    let userData = getUserProfile();
    if (userData != null) {
      axios
        .get(`${backendServer}/getAppointmentsForUser/?mrn=${userData.mrn} &time=${new Date(moment(getMimicTime()))}`)
        .then((response) => {
          let cancelled = [];
          let future = [];
          let past = [];
          if (response.status === 200) {
            this.setState({ allAppointments: response.data });
            for (let appointment of response.data) {// 0-New 1- checkin , 2- no show, 3 cancelled
              if (appointment.isChecked === 3) {
                cancelled.push(appointment);
              } else if ((appointment.isChecked==0||appointment.isChecked==1)  &&
                new Date(moment(appointment.appointmentDateTime)) >
                getMimicTime()
              ) {
                future.push(appointment);
              } else {
                past.push(appointment);
              }
            }
            this.setState({
              cancelledAppointments: cancelled,
              pastAppointments: past,
              futureAppointments: future,
            });
          } else {
            this.setState({
              cancelledAppointments: cancelled,
              pastAppointments: past,
              futureAppointments: future,
            });
          }
        });
    }
  }

  componentDidMount = () => {
    // let date = new Date().today;
    this.getAppointmentsForUser();
  };

  render() {
    if (localStorage.getItem("userData") === null) {
      return <Redirect to="/" />;
    }
    if (this.state.navigateToUpdateAppointment)
      return <NewAppointment data={this.state.navigateToUpdateAppointment} />;
    let futureAppointments = this.state.futureAppointments.map((item) => (
      <Card key={item.appointmentId}>
        <Card.Body>
          <Row>
            <Col md={8}>
              <div>Clinic: {item.clinic.name}</div>
              <div>
                Address: {item.clinic.address.street},{" "}
                {item.clinic.address.city}
              </div>
              <div>
                Appointment Date:{" "}
                {new Date(item.appointmentDateTime).toDateString()}
              </div>
              <div>Appointment Time: {item.appointmentTimeStr}</div>
              <div>
                <Col>
                  <Button
                    variant="primary"
                    onClick={(e) => this.handleCancelAppointment(item)}
                  >
                    Cancel
                  </Button>
                  <Button
                    style={{ margin: "20px" }}
                    variant="primary"
                    onClick={(e) =>
                      this.setState({ navigateToUpdateAppointment: item })
                    }
                  >
                    Update
                  </Button>

                  {/* {(moment(item.appointmentDateTime)).diff((new Date(getMimicTime())), 'seconds') } */}
                  {!item.isChecked ? (
                    <Button
                      variant="primary"
                      style={{ marginLeft: "20px" }}
                      onClick={(e) => this.handleCheckin(item)}
                      disabled={
                        moment(item.appointmentDateTime).diff(
                          new Date(getMimicTime()),
                          "seconds"
                        ) > 86400
                      }
                    >
                      Check In
                    </Button>
                  ) : (
                    <Button variant="primary" disabled>
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
            </Col>
          </Row>
        </Card.Body>
      </Card>
    ));
    let cancelledAppointments = this.state.cancelledAppointments.map((item) => (
      <Card key={item.appointmentId}>
        <Card.Body>
          <Row>
            <Col md={8}>
              <div>Clinic: {item.clinic.name}</div>
              <div>
                Address: {item.clinic.address.street},{" "}
                {item.clinic.address.city}
              </div>
              <div>
                Appointment Date:{" "}
                {new Date(item.appointmentDateTime).toDateString()}
              </div>
              <div>Appointment Time: {item.appointmentTimeStr}</div>
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
    ));
    let pastAppointments = this.state.pastAppointments.map((item) => (
      <Card key={item.appointmentId}>
        <Card.Body>
          <Row>
            <Col md={8}>
              <div>Clinic: {item.clinic.name}</div>
              <div>
                Address: {item.clinic.address.street},{" "}
                {item.clinic.address.city}
              </div>
              <div>
                Appointment Date:{" "}
                {new Date(item.appointmentDateTime).toDateString()}
              </div>
              <div>Appointment Time: {item.appointmentTimeStr}</div>
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
    ));
    return (
      <React.Fragment>
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
