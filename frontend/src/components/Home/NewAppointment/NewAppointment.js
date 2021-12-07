import React, { Component } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Container, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import Axios from "axios";
import Select from '@material-ui/core/Select';
import backendServer from "../../../webConfig";
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Col,
    Row,
    ButtonGroup
} from "reactstrap";
import { FormControl, InputGroup } from "react-bootstrap";
import { createTimeSlots } from "../../Services/ControllerUtils";
class NewAppointment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: "panel1",
            clinicOptions: <option key="CLINIC" value="CLINIC">hello1</option>,
            vaccineOptions: <option key="VACCINE" value="VACCINE">hello2</option>,
            timeList: createTimeSlots("10:30", "22:30", false),
            physiciansAvailable: 0
        };
    }

    getAllClinics() {
        Axios.defaults.headers["Access-Control-Allow-Origin"] = '*';
        Axios.get(`${backendServer}/getAllClinics`).then(result => {
            this.setState({ clinicData: result, clinicError: false });
            this.setState({ clinicOptions: <option key="1" value="1"></option> });
        }).catch(err => {
            this.setState({ clinicError: true });
        })
    }

    componentDidMount() {
        this.getAllClinics();
    }

    render() {
        return (
            <React.Fragment>
                <h1>NEW APPOINTMENT</h1>

                <pre>{JSON.stringify(this.state, " ", 5)}</pre>

                {this.state.clinicError && <span style={{ color: "red" }}>Error fetching clinic data</span>}
                <Container>
                    <Form onSubmit={this.handleSubmit} className="form-stacked">
                        <Row>
                            <Row>
                                <Input id="clinics" onChange={(e) => this.setState({ selectedClinic: e.target.value })} type="text" list="clinicsList" placeholder="Enter Clinic Name" />
                                <datalist id="clinicsList">{this.state.clinicOptions}</datalist>
                            </Row>
                            <Row>
                                <Input id="vaccinations" onChange={(e) => this.setState({ selectedVaccination: e.target.value })} type="text" list="vaccinesList" placeholder="Enter Vaccine Name" />
                                <datalist id="vaccinesList">{this.state.vaccineOptions}</datalist>
                            </Row>
                            <Row>
                                <Label>Select Time Slot</Label>
                                <Select value={this.state.selectedTime} onChange={(e) => { this.setState({ selectedTime: e.target.value }); }}>
                                    {this.state.timeList.map((element, index) =>
                                        <MenuItem key={element} value={element}>{element}</MenuItem>
                                    )}
                                </Select>
                            </Row>
                            <Row>
                                Available Physicians: {this.state.physiciansAvailable}
                            </Row>
                            <Row>
                                <Button>Submit</Button>
                            </Row>

                        </Row>
                    </Form>
                </Container>

            </React.Fragment>
        );
    }
}

export default NewAppointment;