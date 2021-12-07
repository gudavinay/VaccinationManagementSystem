import React, { Component } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Button, Container } from "@mui/material";
import { Link } from "react-router-dom";
class Appointments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded : "panel1"
        };
    }

    render() {
        return (
            <React.Fragment>
                I'm in Appointments
                <Container>

                    <Link to="/newAppointment"><Button color="info" variant="outlined" style={{}}> 
                        New Appointment
                    </Button></Link>
                <Accordion square expanded={this.state.expanded === 'panel1'} onChange={(e) => { this.setState({ expanded: 'panel1' }) }}>
                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                        <Typography>Future Appointments</Typography>
                    </AccordionSummary>
                    <AccordionDetails >
                        Future Appointments
                        Each record shows info & view more and edit buttons
                    </AccordionDetails>
                </Accordion>
                <Accordion square expanded={this.state.expanded === 'panel2'} onChange={(e) => { this.setState({ expanded: 'panel2' }) }}>
                    <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                        <Typography>Cancelled Appointments</Typography>
                    </AccordionSummary>
                    <AccordionDetails >
                    Cancelled Appointments
                    </AccordionDetails>
                </Accordion>
                <Accordion square expanded={this.state.expanded === 'panel3'} onChange={(e) => { this.setState({ expanded: 'panel3' }) }}>
                    <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                        <Typography>Past Appointments</Typography>
                    </AccordionSummary>
                    <AccordionDetails >
                    Past Appointments
                    </AccordionDetails>
                </Accordion>
                </Container>
            </React.Fragment>
        );
    }
}

export default Appointments;