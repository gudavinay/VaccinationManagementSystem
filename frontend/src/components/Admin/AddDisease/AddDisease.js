import React, { Component } from "react";
import { Link, Redirect } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, Col, Row, ButtonGroup } from "reactstrap";
import { Container } from 'react-bootstrap';
import axios from "axios";
import backendServer from "../../../webConfig";
class AddDisease extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }



    handleSubmit = async (e) => {
        e.preventDefault();
        axios.defaults.headers["Access-Control-Allow-Origin"] = true;
        axios.post(`${backendServer}/addDisease`, this.state)
            .then((response) => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    this.setState({
                        isSuccess: true,
                        error: "",
                    });
                    this.SetLocalStorage(JSON.stringify(response.data));
                } else {
                    this.setState({
                        error: "Error adding disease",
                        isSuccess: false,
                    });
                }
            })
            .catch(() => {
                this.setState({
                    error: "Error adding disease",
                    isSuccess: false,
                });
            });
    };


    render() {
        if (this.state.isSuccess) {
            return <Redirect to="" />
        }
        return (
            <React.Fragment>
                <Container>
                    <Form onSubmit={this.handleSubmit} >
                        <Row>
                            <FormGroup>
                                <Label for="diseaseName">Disease Name</Label>
                                <Input
                                    type="text"
                                    id="diseaseName"
                                    name="diseaseName"
                                    placeholder="Disease Name"
                                    onChange={(e) => { this.setState({ diseaseName: e.target.value }) }}
                                    required
                                ></Input>
                            </FormGroup>
                        </Row>
                        <Row>
                            <FormGroup>
                                <Label for="diseaseDesc">Disease Description</Label>
                                <Input
                                    type="textarea"
                                    id="diseaseDesc"
                                    name="diseaseDesc"
                                    placeholder="Disease Description"
                                    onChange={(e) => { this.setState({ diseaseDesc: e.target.value }) }}
                                    required
                                ></Input>
                            </FormGroup>
                        </Row>
                        <FormGroup row>
                            <Button type="submit" color="btn btn-info">
                                Add disease
                            </Button>
                        </FormGroup>
                    </Form>
                    <pre>{JSON.stringify(this.state, "", 2)}</pre>
                </Container>
            </React.Fragment>
        );
    }
}

export default AddDisease;