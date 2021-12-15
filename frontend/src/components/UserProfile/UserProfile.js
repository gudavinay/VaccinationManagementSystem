import React, { Component } from "react";
import axios from "axios";
import backendServer from "../../webConfig";
import Navbar from "./../Navbar/Navbar";
import { Col, Container, Row, Button, Alert } from "react-bootstrap";
import { Form, FormGroup, Label, Input, ButtonGroup } from "reactstrap";
import { Link, Redirect } from "react-router-dom";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      password: "",
      gender: 1,
      dob: "",
      street: "",
      number: "",
      city: "",
      state: "",
      zipcode: "",
    };
  }

  componentDidMount = () => {
    if (localStorage.getItem("userData")) {
      let user = JSON.parse(localStorage.getItem("userData"));
      axios
        .get(`${backendServer}/getUser/${user.email}`)
        .then(async (response) => {
          if (response.status === 200) {
            console.log(response.data);
            let gender = 1;
            if (response.data.gender !== "Male")
              gender = response.data.gender === "Female" ? 2 : 3;
            this.setState({
              mrn: response.data.mrn,
              firstName: response.data.firstName,
              middleName: response.data.middleName,
              lastName: response.data.lastName,
              email: response.data.email,
              gender: gender,
              dob: response.data.dob,
              street: response.data.address.street,
              aptNo: response.data.address.aptNo,
              city: response.data.address.city,
              state: response.data.address.state,
              zipcode: response.data.address.zipcode,
            });
          }
        });
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    let gender = "Male";
    if (this.state.gender !== 1)
      gender = this.state.gender === 2 ? "Female" : "Other";
    let user = {
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      middleName: this.state.middleName,
      lastName: this.state.lastName,
      dob: this.state.dob,
      gender: gender,
      verified: true,
      admin:
        this.state.email.substring(this.state.email.indexOf("@")) ===
        "@sjsu.edu"
          ? true
          : false,
      address: {
        street: this.state.street,
        aptNo: this.state.aptNo,
        city: this.state.city,
        state: this.state.state,
        zipcode: this.state.zipcode,
      },
    };
    axios
      .post(`${backendServer}/updateUser/${this.state.mrn}`, user)
      .then(async (response) => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          console.log(response.data);
          let responseUser = {
            mrn: response.data.mrn,
            email: response.data.email,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            isAdmin: response.data.admin,
          };
          localStorage.setItem("userData", JSON.stringify(responseUser));
          this.setState({ success: true });
          window.reload();
        }
      });
  };

  render = () => {
    if (localStorage.getItem("userData") === null) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <Container style={{ padding: "0 100px" }}>
          <Form onSubmit={(e) => this.handleSubmit(e)} className="form-stacked">
            <Row>
              <Col>
                <FormGroup>
                  <Label for="name">Full Name</Label>
                  <Input
                    type="text"
                    name="name"
                    placeholder="First Name"
                    value={this.state.firstName}
                    onChange={(e) =>
                      this.setState({ firstName: e.target.value })
                    }
                  ></Input>
                  <Input
                    type="text"
                    placeholder="Middle Name (Optional)"
                    value={this.state.middleName}
                    onChange={(e) =>
                      this.setState({ middleName: e.target.value })
                    }
                  ></Input>
                  <Input
                    type="text"
                    placeholder="Last Name"
                    value={this.state.lastName}
                    onChange={(e) =>
                      this.setState({ lastName: e.target.value })
                    }
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label for="email">Email Address</Label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={this.state.email}
                    disabled
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label for="password">password</Label>
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={(e) =>
                      this.setState({ password: e.target.value })
                    }
                  ></Input>
                </FormGroup>
              </Col>
              <Col>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="gender">Gender</Label>
                      <br />
                      <ButtonGroup>
                        <Button
                          variant="outline-info"
                          name="gender"
                          value="1"
                          onClick={(e) => {
                            e.preventDefault();
                            this.setState({ gender: 1 });
                          }}
                          active={Number(this.state.gender) === 1}
                        >
                          Male
                        </Button>
                        <Button
                          variant="outline-info"
                          name="gender"
                          value="2"
                          onClick={(e) => {
                            e.preventDefault();
                            this.setState({ gender: 2 });
                          }}
                          active={Number(this.state.gender) === 2}
                        >
                          Female
                        </Button>
                        <Button
                          variant="outline-info"
                          name="gender"
                          value="3"
                          onClick={(e) => {
                            e.preventDefault();
                            this.setState({ gender: 3 });
                          }}
                          active={Number(this.state.gender) === 3}
                        >
                          Other
                        </Button>
                      </ButtonGroup>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="dob">Date of Birth</Label>
                      <Input
                        type="date"
                        id="dob"
                        name="dob"
                        value={this.state.dob}
                        onChange={(e) => {
                          this.setState({ dob: e.target.value });
                        }}
                      ></Input>
                    </FormGroup>
                  </Col>
                </Row>

                <FormGroup>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    type="text"
                    id="street"
                    name="street"
                    placeholder="Street"
                    value={this.state.street}
                    onChange={(e) => {
                      this.setState({ street: e.target.value });
                    }}
                  ></Input>
                  <Input
                    type="text"
                    id="number"
                    name="number"
                    placeholder="Apt Number (Optional)"
                    value={this.state.aptNo}
                    onChange={(e) => {
                      this.setState({ aptNo: e.target.value });
                    }}
                  ></Input>
                  <Input
                    type="text"
                    id="city"
                    name="city"
                    placeholder="City"
                    value={this.state.city}
                    onChange={(e) => {
                      this.setState({ city: e.target.value });
                    }}
                  ></Input>
                  <Input
                    type="text"
                    id="state"
                    name="state"
                    placeholder="State"
                    value={this.state.state}
                    onChange={(e) => {
                      this.setState({ state: e.target.value });
                    }}
                  ></Input>
                  <Input
                    type="text"
                    id="zipcode"
                    name="zipcode"
                    placeholder="Zip Code"
                    value={this.state.zipcode}
                    onChange={(e) => {
                      this.setState({ zipcode: e.target.value });
                    }}
                  ></Input>
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Button type="submit" variant="info">
                Update Details
              </Button>
            </FormGroup>
            <FormGroup>
              {this.state.success ? (
                <Alert variant="success">User details updated</Alert>
              ) : null}
            </FormGroup>
          </Form>
        </Container>
      </div>
    );
  };
}

export default UserProfile;
