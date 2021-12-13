import React, { Component } from "react";
import { Checkbox, Container, ListItemText, MenuItem } from "@mui/material";
import Axios from "axios";
import Select from '@material-ui/core/Select';
import backendServer from "../../../webConfig";
import SelectedClinicDetails from './SelectedClinicDetails'
import {
    Button,
    Form,
    Label,
    Col,
    Row
} from "reactstrap";
import { createTimeSlots } from "../../Services/ControllerUtils";
import axios from "axios";
import moment from "moment";
class NewAppointment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            minDate: moment().format("YYYY-MM-DD"),
            maxDate: moment().add(365, "days").format("YYYY-MM-DD"),
            expanded: "panel1",
            clinicData: [],
            vaccinationData: [],
            timeSlotsList: [],
            physiciansAvailable: 0,
            appointments: [],
            selectedVaccinations: [],
            selectedDate: "",
            selectedTime: ""
        };
    }

    getAllClinics() {
        Axios.get(`${backendServer}/getAllClinics`).then(result => {
            this.setState({ clinicData: result.data, clinicError: false });
        }).catch(err => {
            this.setState({ clinicData: [], clinicError: true });
        })
    }

    getAllVaccinations() {
        Axios.get(`${backendServer}/getAllVaccinations`).then(result => {
            this.setState({ vaccinationData: result.data, vaccinationError: false });
        }).catch(err => {
            this.setState({ vaccinationData: [], vaccinationError: true });
        })
    }

    getAllAppointmentsOnDate() { // TODO
        Axios.get(`${backendServer}/getAllAppointmentsOnDate?date=${this.state.selectedDate},clinic=${this.state.selectedClinicFullInfo.id}`).then(result => {
            console.log(result);
        }).catch(err => {
            console.log(err);
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        let listOfIds = [];
        for (let vaccination of this.state.selectedVaccinations) {
            listOfIds.push(this.state.vaccinationData.find(element => element.vaccinationName === vaccination).vaccinationId);
        }

        let data = {
            appointmentDateTime: this.state.selectedDate + " " + this.state.selectedTime,
            createdDate: "" + moment().format('yyyy-MM-DD hh:mm A'),
            vaccinations: listOfIds,
            clinic: this.state.selectedClinicFullInfo.id,
            user_id: 85887,
            userEmail: "test@test.com",
        };
        console.log(data);
        axios.post(`${backendServer}/createAppointment`, data)
            .then((response) => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
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

    componentDidMount() {
        this.getAllClinics();
        this.getAllVaccinations();
    }

    render() {
        let noSlotsAvailable = false;//this.state.physiciansAvailable === this.state.appointments.length; TODO
        return (
            <React.Fragment>
                {this.state.clinicError && <span style={{ color: "red" }}>Error fetching clinic data</span>}
                <Container>
                    <h2>NEW APPOINTMENT</h2>
                    <Form onSubmit={this.handleSubmit} className="form-stacked">
                        <Row>
                            <Col>
                                <Row>
                                    <Col>
                                        <Label>Select Clinic</Label>
                                        <Select style={{ width: 'inherit' }} value={this.state.selectedClinic} onChange={(e) => {
                                            const item = this.state.clinicData.find(element => element.name === e.target.value)
                                            this.setState({
                                                selectedClinic: e.target.value,
                                                selectedClinicFullInfo: item,
                                                timeSlotsList: createTimeSlots(item.startBussinessHour, item.endBussinessHour, false)
                                            });
                                        }}>
                                            {this.state.clinicData.map((element, index) =>
                                                <MenuItem key={index} value={element.name}>{element.name}</MenuItem>
                                            )}
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
                                        {this.state.vaccinationError ? <span style={{ color: "red" }}>Error fetching vaccinations</span> : <Select style={{ width: 'inherit' }} multiple value={this.state.selectedVaccinations}
                                            renderValue={(selected) => selected.join(', ')} onChange={(e) => {
                                                this.setState({
                                                    selectedVaccinations: e.target.value,
                                                });
                                            }}>
                                            {this.state.vaccinationData.map((element, index) =>
                                                <MenuItem key={index} value={element.vaccinationName}>
                                                    <Checkbox checked={this.state.selectedVaccinations.indexOf(element.vaccinationName) > -1} />
                                                    <ListItemText primary={element.vaccinationName} /></MenuItem>
                                            )}
                                        </Select>}
                                    </Col>
                                </Row>
                                <br />
                                <Row>
                                    <Col>
                                        <Label>Select Date of appointment</Label>
                                        <input className="form-control" type="date" onChange={(e) => {
                                            this.setState({ selectedDate: e.target.value });
                                            this.getAllAppointmentsOnDate();
                                        }} min={this.state.minDate} max={this.state.maxDate} placeholder="mm-dd-yyyy" />
                                    </Col>
                                    <Col>
                                        <Label>Available Time Slot {noSlotsAvailable && <span style={{ color: "red" }}>No Physicians Available</span>}</Label>
                                        <Select style={{ width: 'inherit' }} disabled={noSlotsAvailable} value={this.state.selectedTime} onChange={(e) => { this.setState({ selectedTime: e.target.value }); }}>
                                            {this.state.timeSlotsList.map((element, index) =>
                                                <MenuItem key={element} value={element}>{element}</MenuItem>
                                            )}
                                        </Select>
                                    </Col>
                                </Row>
                                <br />
                                <Row>
                                    {this.state.selectedClinicFullInfo && <span>Available Physicians: {this.state.selectedClinicFullInfo.noOfPhysician}</span>}
                                </Row>
                                <br />
                                <Row>
                                    <Button disabled={(!this.state.selectedDate || !this.state.selectedTime || !this.state.selectedClinic || !this.state.selectedVaccinations)}>Submit</Button>
                                </Row>
                            </Col>
                            <Col>
                                {this.state.selectedClinicFullInfo && <Row>
                                    <SelectedClinicDetails {...this.state.selectedClinicFullInfo} />
                                </Row>}
                            </Col>
                        </Row>


                    </Form>

                    <pre>{JSON.stringify(this.state, " ", 5)}</pre>
                </Container>

            </React.Fragment>
        );
    }
}

export default NewAppointment;