import React, { Component } from "react";
import { Container, MenuItem } from "@mui/material";
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
class NewAppointment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: "panel1",
            clinicData: [],
            vaccinationData: [],
            timeSlotsList: [],
            physiciansAvailable: 0,
            appointments: [],
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

    handleSubmit = async (e) => {
        e.preventDefault();
        let data = {
            appointmentDateTime: "2009-12-31",
            vaccinations: this.state.selectedVaccinationFullInfo.vaccinationId,
            clinic: this.state.selectedClinicFullInfo.id,
            user_id: 895388947
        };

        axios
            .post(`${backendServer}/createAppointment`, data)
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
                                        <Select style={{ width: 'inherit' }} value={this.state.selectedVaccination} onChange={(e) => {
                                            const item = this.state.vaccinationData.find(element => element.vaccinationName === e.target.value)
                                            this.setState({
                                                selectedVaccination: e.target.value,
                                                selectedVaccinationFullInfo: item
                                            });
                                        }}>
                                            {this.state.vaccinationData.map((element, index) =>
                                                <MenuItem key={index} value={element.vaccinationName}>{element.vaccinationName}</MenuItem>
                                            )}
                                        </Select>
                                    </Col>
                                </Row>
                                <br />
                                <Row>
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
                                    <Button>Submit</Button>
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