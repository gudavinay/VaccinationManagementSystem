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
import moment from "moment";
import NewAppointment from "../NewAppointment/NewAppointment";
import emailjs from "emailjs-com";
import { init } from "emailjs-com";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
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
  getVaccinationsForTable(list){
    let l = [];
    for(let item of list){
      l.push(item.vaccinationName);
    }
    return l.toString();
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
          <center style={{margin:'15px'}}>
            <Link to="/newAppointment">
              <Button variant="outline-success">New Appointment</Button>
            </Link>
          </center>
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
            <AccordionDetails>
              {this.state.futureAppointments.length > 0 ? <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Appointment ID</TableCell>
                                        <TableCell >Appointment Date</TableCell>
                                        <TableCell >Appointment Time</TableCell>
                                        <TableCell >Clinic</TableCell>
                                        <TableCell >Address</TableCell>
                                        <TableCell >Vaccinations</TableCell>
                                        <TableCell ></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.futureAppointments.map((row) => (
                                        <TableRow key={row.appointmentId}>
                                            <TableCell component="th" scope="row">
                                                {row.appointmentId}
                                            </TableCell>
                                            <TableCell >{row.appointmentDateStr}</TableCell>
                                            <TableCell >{row.appointmentTimeStr}</TableCell>
                                            <TableCell >{row.clinic.name}</TableCell>
                                            <TableCell >{row.clinic.address.street+" "+row.clinic.address.city}</TableCell>
                                            <TableCell >{this.getVaccinationsForTable(row.vaccinations)}</TableCell>
                                            <TableCell >
                                            {!row.isChecked ? (
                                              <>
                                              <Button variant="outline-success" onClick={(e) => this.handleCheckin(row)} disabled={moment(row.appointmentDateTime).diff(new Date(getMimicTime()), "seconds") > 86400} >
                                                Check In
                                              </Button>
                                              <Button style={{ marginLeft: "10px" }}variant="outline-danger" onClick={(e) => this.handleCancelAppointment(row)}>
                                              <i class="fa fa-window-close"></i>
                                            </Button>
                                            <Button style={{ margin: "0 10px" }} variant="outline-danger" onClick={(e) => this.setState({ navigateToUpdateAppointment: row })}>
                                              <i class="fa fa-edit"></i>
                                            </Button>
                                            </>
                                            ) : (
                                              <Button variant="primary" disabled>
                                                Checked In
                                              </Button>
                                            )}
                                            
                                        </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer> : "No Active Future Appointments"}
              </AccordionDetails>
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
            <AccordionDetails>
              {this.state.cancelledAppointments.length > 0 ? <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Appointment ID</TableCell>
                                        <TableCell >Appointment Date</TableCell>
                                        <TableCell >Appointment Time</TableCell>
                                        <TableCell >Clinic</TableCell>
                                        <TableCell >Address</TableCell>
                                        <TableCell >Vaccinations</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.cancelledAppointments.map((row) => (
                                        <TableRow key={row.appointmentId}>
                                            <TableCell component="th" scope="row">
                                                {row.appointmentId}
                                            </TableCell>
                                            <TableCell >{row.appointmentDateStr}</TableCell>
                                            <TableCell >{row.appointmentTimeStr}</TableCell>
                                            <TableCell >{row.clinic.name}</TableCell>
                                            <TableCell >{row.clinic.address.street+" "+row.clinic.address.city}</TableCell>
                                            <TableCell >{this.getVaccinationsForTable(row.vaccinations)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer> : "No Active Cancelled Appointments"}
              </AccordionDetails>
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
            <AccordionDetails>
              {this.state.pastAppointments.length > 0 ? <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Appointment ID</TableCell>
                                        <TableCell >Appointment Date</TableCell>
                                        <TableCell >Appointment Time</TableCell>
                                        <TableCell >Clinic</TableCell>
                                        <TableCell >Address</TableCell>
                                        <TableCell >Vaccinations</TableCell>
                                        <TableCell ></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.pastAppointments.map((row) => (
                                        <TableRow key={row.appointmentId}>
                                            <TableCell component="th" scope="row">
                                                {row.appointmentId}
                                            </TableCell>
                                            <TableCell >{row.appointmentDateStr}</TableCell>
                                            <TableCell >{row.appointmentTimeStr}</TableCell>
                                            <TableCell >{row.clinic.name}</TableCell>
                                            <TableCell >{row.clinic.address.street+" "+row.clinic.address.city}</TableCell>
                                            <TableCell >{this.getVaccinationsForTable(row.vaccinations)}</TableCell>
                                            <TableCell >
                                          {row.isChecked === 1 ? (
                                            <Button disabled variant="outline-success">
                                              Completed
                                            </Button>
                                          ) : (
                                            <Button disabled variant="outline-warning">
                                              No Show
                                            </Button>
                                          )}
                                        </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer> : "No Active Future Appointments"}
            </AccordionDetails>
          </Accordion>
        </Container>
        <pre>{JSON.stringify(this.state, "", 2)}</pre>
      </React.Fragment>
    );
  }
}

export default Appointments;
