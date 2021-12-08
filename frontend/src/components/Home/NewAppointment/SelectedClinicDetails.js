




import moment from "moment";
import React, { Component } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Label } from "reactstrap";
class AddVaccination extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
        };
    }

    render() {
        return (
            <React.Fragment>       
                <Container>                         
                <Card >
            <Card.Header className="mb-2 text-muted">
                Selected Clinic Details
            </Card.Header>
            <Card.Body>
                <Row>
                    <Label>Name: {this.props.name}</Label>
                    <Label>Opens at: {new moment(this.props.startBussinessHour).format("HH:mm")} {this.props.startBussinessHour}</Label>
                    <Label>Closes at: {new moment(this.props.endBussinessHour).format("hh:mm")}</Label>
                    <Label>Number of Physicians Available: {this.props.noOfPhysician}</Label>
                </Row>
            </Card.Body>
        </Card>
        </Container>
            </React.Fragment>
        );
    }
}

export default AddVaccination;