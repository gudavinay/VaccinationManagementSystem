import React, { Component } from "react";
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
import axios from "axios";
import { Redirect } from 'react-router-dom';
class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {
                firstName: "",
                lastName: "",
                middleName: "",
                email: "",
                password: "",
                gender:"",
                street: "",
                number: "",
                city: "",
                zipcode: "",
                state: ""
            },
            loginError: "",
            isSuccess: false,
        };
    }

    handleChange = e => {
        this.setState({
            userInfo: {
                ...this.state.userInfo,
                [e.target.name]: e.target.value
            }
        });
    };

    handleSubmit = async e => {
        e.preventDefault();
        axios.defaults.withCredentials = true;
        axios.post(`http://localhost:3001/signup`, this.state.userInfo)``.then((response) => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    this.setState({
                        isSuccess: true,
                        loginError: ""
                    });
                    this.SetLocalStorage(JSON.stringify(response.data));
                } else {
                    this.setState({
                        loginError: "User is already registered",
                        authFlag: false,
                        error: {},
                    });
                }
            })
            .catch(() => {
                this.setState({
                    loginError: "User is already registered",
                    authFlag: false,
                });
            });

    };

    SetLocalStorage(data) {
        if (typeof Storage !== "undefined") {
            localStorage.clear();
            localStorage.setItem("userData", data);
        }
    }

    render() {
        if (this.state.isSuccess) {
            return <Redirect to='/dashboard' />
        }
        return (
            <div className="container-fluid form-cont">
                <div className="flex-container">
                    <div className="row" style={{ padding: "120px" }}>
                        <div className="col col-sm-3"></div>
                        <div className="col col-sm-6">
                            <div
                                id="errorLogin"
                                hidden={this.state.loginError.length > 0 ? false : true}
                                className="alert alert-danger"
                                role="alert"
                            >
                                {this.state.loginError}
                            </div>
                            <h3>Create VMS Account</h3>
                            <Form onSubmit={this.handleSubmit} className="form-stacked">
                                <Row>
                                    <Col>
                                        <FormGroup>
                                            <Label for="firstName">
                                                First Name
                                            </Label>
                                            <Input
                                                type="text"
                                                id="firstName"
                                                name="firstName"
                                                placeholder="First Name"
                                                onChange={this.handleChange}
                                                required
                                            ></Input>
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <Label for="middleName">
                                                Middle Name
                                            </Label>
                                            <Input
                                                type="text"
                                                id="middleName"
                                                name="middleName"
                                                placeholder="Middle Name"
                                                onChange={this.handleChange}
                                            ></Input>
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <Label for="lastName">
                                                Last Name
                                            </Label>
                                            <Input
                                                type="text"
                                                id="lastName"
                                                name="lastName"
                                                placeholder="Last Name"
                                                onChange={this.handleChange}
                                                required
                                            ></Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <FormGroup>
                                            <Label for="gender">
                                                Gender
                                            </Label><br/>
                                            <ButtonGroup required>
                                                <Button color="outline-info" name="gender" value="1" onClick={this.handleChange} active={Number(this.state.userInfo.gender) === 1}>Male</Button>
                                                <Button color="outline-info" name="gender" value="2" onClick={this.handleChange} active={Number(this.state.userInfo.gender) === 2}>Female</Button>
                                                <Button color="outline-info" name="gender" value="3" onClick={this.handleChange} active={Number(this.state.userInfo.gender) === 3}>Other</Button>
                                            </ButtonGroup>
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <Label for="dob">
                                                Date of Birth
                                            </Label>
                                            <Input
                                                type="date"
                                                id="dob"
                                                name="dob"
                                                onChange={this.handleChange}
                                                required
                                            ></Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <FormGroup>
                                            <Label htmlFor="email">
                                                Here&apos;s my <strong>email address</strong>
                                            </Label>
                                            <Input
                                                data-testid="email-input-box"
                                                type="email"
                                                id="email"
                                                name="email"
                                                placeholder="Email"
                                                onChange={this.handleChange}
                                                required
                                            ></Input>
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <Label htmlFor="password">
                                                And here&apos;s my <strong>password</strong>
                                            </Label>
                                            <Input
                                                type="password"
                                                id="password"
                                                name="password"
                                                placeholder="Password"
                                                onChange={this.handleChange}
                                                required
                                            ></Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                    </Col>
                                    <Col>
                                    </Col>
                                </Row>
                                <FormGroup>
                                    <Label htmlFor="address">
                                        Address
                                    </Label>
                                    <Row>
                                        <Col>
                                            <Input
                                                type="text"
                                                id="street"
                                                name="street"
                                                placeholder="Street"
                                                onChange={this.handleChange}
                                                required
                                            ></Input>
                                        </Col>
                                        <Col><Input
                                            type="text"
                                            id="number"
                                            name="number"
                                            placeholder="Apt Number (Optional)"
                                            onChange={this.handleChange}
                                        ></Input>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col> <Input
                                            type="text"
                                            id="city"
                                            name="city"
                                            placeholder="City"
                                            onChange={this.handleChange}
                                            required
                                        ></Input>
                                        </Col>
                                        <Col> <Input
                                            type="text"
                                            id="zipcode"
                                            name="zipcode"
                                            placeholder="Zip Code"
                                            onChange={this.handleChange}
                                            required
                                        ></Input>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col> <Input
                                            type="text"
                                            id="state"
                                            name="state"
                                            placeholder="State"
                                            onChange={this.handleChange}
                                            required
                                        ></Input>
                                        </Col>
                                        <Col>
                                        </Col>
                                    </Row>
                                </FormGroup>
                                <FormGroup row>
                                    <Col>
                                        <Button
                                            type="submit"
                                            color="btn btn-info"
                                        >
                                            Sign me up!
                                        </Button>
                                        <Button
                                            type="submit"
                                            color="btn btn-info"
                                        >
                                            Signup with Google
                                        </Button>
                                    </Col>
                                </FormGroup>
                            </Form>
                <pre>{JSON.stringify(this.state, "", 2)}</pre>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignUp;
