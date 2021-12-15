import React, { Component } from "react";
import { Checkbox, Container, ListItemText, MenuItem } from "@mui/material";
import Axios from "axios";
import Select from "@material-ui/core/Select";
import backendServer from "../../../webConfig";
import SelectedClinicDetails from "./SelectedClinicDetails";
import { Button, Form, Label, Col, Row } from "reactstrap";
import {
  createTimeSlots,
  getMimicTime,
  getUserProfile,
} from "../../Services/ControllerUtils";
import axios from "axios";
import moment from "moment";
import { Redirect } from "react-router-dom";
import emailjs from "emailjs-com";
import { init } from "emailjs-com";
import swal from "sweetalert";

class NewAppointment extends Component {
  constructor(props) {
    super(props);
    let mimicTime = moment(getMimicTime());
    let data = {
      minDate: mimicTime.add(1, "days").format("YYYY-MM-DD"),
      updatedMinDate: "",
      maxDate: mimicTime.add(365, "days").format("YYYY-MM-DD"),
      expanded: "panel1",
      clinicData: [],
      vaccinationData: [],
      timeSlotsList: [],
      appointments: [],
      selectedVaccinations: [],
      selectedDate: "",
      selectedTime: "",
      existingBookings: [],
      disabledVaccinations: [],
    };

    if (this.props.data && this.props.data.appointmentId) {
      let d = this.props.data;
      data.selectedClinic = d.clinic.name;
      let vaccData = [];
      for (let vac of d.vaccinations) vaccData.push(vac.vaccinationName);
      data.selectedVaccinations = vaccData;
      data.selectedClinicFullInfo = d.clinic;
      data.timeSlotsList = createTimeSlots(
        d.clinic.startBussinessHour,
        d.clinic.endBussinessHour,
        false
      );
      data.selectedDate = moment(d.appointmentDateStr).format("YYYY-MM-DD");
      console.log( data.selectedDate);
      data.selectedTime = d.appointmentTimeStr;
      data.appointmentId = d.appointmentId;
    }

    this.state = data;
  }

  getAllClinics() {
    Axios.get(`${backendServer}/getAllClinics`)
      .then((result) => {
        this.setState({ clinicData: result.data, clinicError: false });
      })
      .catch((err) => {
        this.setState({ clinicData: [], clinicError: true });
      });
  }

  getAllVaccinations() {
    Axios.get(`${backendServer}/getAllVaccinations/${getUserProfile().mrn}`)
      .then((result) => {
        this.setState({
          vaccinationData: result.data,
          vaccinationError: false,
        });
        this.getVaccineDueDates();
      })
      .catch((err) => {
        this.setState({ vaccinationData: [], vaccinationError: true });
      });
  }

  sendEmailToClient() {
    swal("Success", "Booking successful. Please check your confirmation email for additional details", "success");
    init("user_VU6t0UaXlMzjO5o6MJQjc");
    let data = {
      to_name: getUserProfile().firstName + " "+getUserProfile().lastName,
      clinic_name: this.state.selectedClinicFullInfo.name,
      vaccination_list: this.state.selectedVaccinations.toString(),
      appointment_date: this.state.selectedDate,
      start_time: this.state.selectedTime,
      to_email: getUserProfile().email,
      status: (this.props.data && this.props.data.appointmentId) ? "updated" :"created"
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
    this.setState({ redirectVar: <Redirect to="/dashboard/bookings" /> });
  }

  getAllAppointmentsOnDate(date) {
    // TODO
    Axios.get(
      `${backendServer}/getAllAppointmentsOnDate/?date=${date}&clinicId=${this.state.selectedClinicFullInfo.id}`
    )
      .then((result) => {
        this.setState({ existingBookings: result.data });
        const map = new Map();
        for (let item of result.data) {
          map.set(item, map.has(item) ? map.get(item) + 1 : 1);
        }
        console.log(map);
        let timeSlotsList = this.state.timeSlotsList;
        console.log("Before" + timeSlotsList);
        map.forEach((value, key) => {
          if (value >= this.state.selectedClinicFullInfo.noOfPhysician) {
            console.log(
              "removing " +
                key +
                " as count is " +
                value +
                " which is greater than " +
                this.state.selectedClinicFullInfo.noOfPhysician
            );
            timeSlotsList.splice(timeSlotsList.indexOf(key), 1);
          }
        });
        console.log("After" + timeSlotsList);
        this.setState({ timeSlotsList: timeSlotsList });
      })
      .catch((err) => {
        this.setState({ existingBookings: [] });
      });
  }

  getPendingVaccinations() {
    const user_mrn = getUserProfile().mrn;
    axios
      .get(
        `${backendServer}/getCheckedInAppointmentsForUser/?user_mrn=${user_mrn}&isChecked=0`
      )
      .then((response) => {
        if (response.status === 200) {
          let disabledVaccinations = this.state.disabledVaccinations;
          for (let appointment of response.data) {
            for (let vaccine of appointment.vaccinations) {
              disabledVaccinations.push(vaccine.vaccinationName);
            }
          }
          if (this.props.data && this.props.data.appointmentId) {
            for (let vacc of this.state.selectedVaccinations) {
              if (disabledVaccinations.indexOf(vacc) !== -1) {
                disabledVaccinations.splice(
                  disabledVaccinations.indexOf(vacc),
                  1
                );
              }
            }
          }
          this.setState({ disabledVaccinations: disabledVaccinations });
        }
      })
      .catch((error) => {
        console.log("error:", error);
      });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    let listOfIds = [];
    for (let vaccination of this.state.selectedVaccinations) {
      listOfIds.push(
        this.state.vaccinationData.find(
          (element) => element.vaccinationName === vaccination
        ).vaccinationId
      );
    }
    var userData = getUserProfile();
    let data = {
      appointmentDateTime:
        this.state.selectedDate + " " + this.state.selectedTime,
      createdDate: "" + moment().format("yyyy-MM-DD hh:mm A"),
      vaccinations: listOfIds,
      clinic: this.state.selectedClinicFullInfo.id,
      userId: userData.mrn,
      userEmail: userData.email,
      appointmentDateStr: this.state.selectedDate,
      appointmentTimeStr: this.state.selectedTime,
    };

    if (this.props.data && this.props.data.appointmentId) {
      data.appointmentID = this.state.appointmentId;
    }
    console.log(data);
    axios
      .post(`${backendServer}/createAppointment`, data)
      .then((response) => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          this.sendEmailToClient(); // TODO: uncomment later to send email
          this.setState({
            isSuccess: true,
            error: "",
          });
        } else {
          this.setState({
            error: "Error in adding vaccine to the database",
          });
        }
      })
      .catch(() => {
        this.setState({
          error: "Error in adding vaccine to the database",
        });
      });
  };

  getVaccineDueDates() {
    const user_mrn = getUserProfile().mrn;
    axios
      .get(`${backendServer}/getVaccineDueDates/?user_mrn=${user_mrn}`)
      .then((response) => {
        if (response.status === 200) {
          let vaccinationDataFromState = this.state.vaccinationData;
          for (let vaccine of response.data) {
            for (let v of vaccinationDataFromState) {
              if (v.vaccinationId === vaccine.vaccination_id) {
                v["nextAppointmentDate"] = vaccine.nextAppointmentTime;
              }
            }
          }
          this.setState({ vaccinationData: vaccinationDataFromState });
        }
      })
      .catch((error) => {
        console.log("error:", error);
      });
  }

  componentDidMount() {
    this.getAllClinics();
    this.getAllVaccinations();
    this.getPendingVaccinations();
    if (this.props.data && this.props.data.appointmentId) {
      document.getElementById("dateselector").value = this.state.selectedDate;
    }
  }

  render() {
    if (localStorage.getItem("userData") === null) {
      return <Redirect to="/" />;
    }
    let noSlotsAvailable = false; //this.state.physiciansAvailable === this.state.appointments.length; TODO
    if (this.state.isSuccess) {
      return <Redirect to="/dashboard" />;
    } else
      return (
        <React.Fragment>
          {this.state.clinicError && (
            <span style={{ color: "red" }}>Error fetching clinic data</span>
          )}
          <Container>
            <h2>NEW APPOINTMENT</h2>
            <Form onSubmit={this.handleSubmit} className="form-stacked">
              <Row>
                <Col>
                  <Row>
                    <Col>
                      <Label>Select Clinic</Label>
                      <Select
                        style={{ width: "inherit" }}
                        value={this.state.selectedClinic}
                        onChange={(e) => {
                          const item = this.state.clinicData.find(
                            (element) => element.name === e.target.value
                          );
                          this.setState({
                            selectedClinic: e.target.value,
                            selectedClinicFullInfo: item,
                            timeSlotsList: createTimeSlots(
                              item.startBussinessHour,
                              item.endBussinessHour,
                              false
                            ),
                          });
                        }}
                      >
                        {this.state.clinicData.map((element, index) => (
                          <MenuItem key={index} value={element.name}>
                            {element.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col>
                      <Label>Select Vaccination</Label>
                      {/* <Select style={{ width: 'inherit' }} value={this.state.selectedVaccination} onChange={(e) => {
                                            const item = this.state.vaccinationData.find(element => element.vaccinationName === e.target.value)
                                            this.setState({
                                                selectedVaccination: e.target.value,
                                                selectedVaccinationFullInfo: item
                                            });
                                        }}>
                                            {this.state.vaccinationData.map((element, index) =>
                                                <MenuItem key={index} value={element.vaccinationName}>{element.vaccinationName}</MenuItem>
                                            )}
                                        </Select> */}
                      {this.state.vaccinationError ? (
                        <span style={{ color: "red" }}>
                          Error fetching vaccinations
                        </span>
                      ) : (
                        <Select
                          style={{ width: "inherit" }}
                          multiple
                          value={this.state.selectedVaccinations}
                          renderValue={(selected) => selected.join(", ")}
                          onChange={(e) => {
                            this.setState({
                              selectedVaccinations: e.target.value,
                            });
                            let minDate = this.state.minDate;
                            for (let vaccine of e.target.value) {
                              for (let v of this.state.vaccinationData) {
                                if (vaccine === v.vaccinationName) {
                                  if (v.nextAppointmentDate) {
                                    let next = moment(
                                      v.nextAppointmentDate
                                    ).format("YYYY-MM-DD");
                                    let curr = moment(
                                      this.state.minDate
                                    ).format("YYYY-MM-DD");
                                    minDate = next > curr ? next : curr;
                                  }
                                }
                              }
                            }
                            this.setState({
                              updatedMinDate:
                                minDate === this.state.minDate ? "" : minDate,
                            });
                          }}
                        >
                          {this.state.vaccinationData.map((element, index) => (
                            <MenuItem
                              key={index}
                              value={element.vaccinationName}
                              disabled={
                                this.state.disabledVaccinations.indexOf(
                                  element.vaccinationName
                                ) !== -1
                              }
                            >
                              <Checkbox
                                checked={
                                  this.state.selectedVaccinations.indexOf(
                                    element.vaccinationName
                                  ) > -1
                                }
                              />
                              <ListItemText primary={element.vaccinationName} />
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    </Col>
                  </Row>{" "}
                  <br />
                  {this.state.selectedClinic && (
                    <Row>
                      <Col>
                        <Label>Select Date of appointment</Label>
                        <br />
                        <input
                          className="form-control"
                          type="date"
                          id="dateselector"
                          value={this.state.selectedDate}
                          onChange={(e) => {
                            this.setState({
                              selectedDate: e.target.value,
                              timeSlotsList: createTimeSlots(
                                this.state.selectedClinicFullInfo
                                  .startBussinessHour,
                                this.state.selectedClinicFullInfo
                                  .endBussinessHour,
                                false
                              ),
                            });
                            console.log(this.state.selectedDate);
                            this.getAllAppointmentsOnDate(e.target.value);
                          }}
                          min={
                            this.state.updatedMinDate
                              ? this.state.updatedMinDate
                              : this.state.minDate
                          }
                          max={this.state.maxDate}
                          placeholder="mm-dd-yyyy"
                        />
                        <span style={{ fontSize: "10px", color: "red" }}>
                          Note:Book atleast 1 day proir to the start of
                          appointment
                        </span>
                      </Col>
                      <Col>
                        {this.state.selectedDate && (
                          <Row>
                            <Label>
                              Available Time Slot{" "}
                              {noSlotsAvailable && (
                                <span style={{ color: "red" }}>
                                  No Physicians Available
                                </span>
                              )}
                            </Label>
                            <Select
                              disabled={noSlotsAvailable}
                              value={this.state.selectedTime}
                              onChange={(e) => {
                                this.setState({ selectedTime: e.target.value });
                              }}
                            >
                              {this.state.timeSlotsList.map(
                                (element, index) => (
                                  <MenuItem key={element} value={element}>
                                    {element}
                                  </MenuItem>
                                )
                              )}
                            </Select>
                          </Row>
                        )}
                      </Col>
                    </Row>
                  )}
                  <br />
                  <Row>
                    <Button
                      disabled={
                        !this.state.selectedDate ||
                        !this.state.selectedTime ||
                        !this.state.selectedClinic ||
                        !this.state.selectedVaccinations
                      }
                    >
                      Submit
                    </Button>
                  </Row>
                </Col>
                <Col>
                  {this.state.selectedClinicFullInfo && (
                    <Row>
                      <SelectedClinicDetails
                        {...this.state.selectedClinicFullInfo}
                      />
                    </Row>
                  )}
                </Col>
              </Row>
            </Form>

            <br />
            <br />
            <br />
            <pre>{JSON.stringify(this.state, " ", 5)}</pre>
            <pre>{JSON.stringify(this.props, " ", 5)}</pre>
          </Container>
        </React.Fragment>
      );
  }
}

export default NewAppointment;
