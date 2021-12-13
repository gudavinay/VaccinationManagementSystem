import React, { Component } from "react";
import { Alert, Button, Container } from "react-bootstrap";
import { Form, FormGroup, Label, Input, ButtonGroup } from "reactstrap";

class SignUp extends Component {
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
      signInFailed: false,
      pageOne: true,
      emailExists: false,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.props.allEmails.contains(this.state.email)) {
      this.setState({ emailExists: true });
    } else {
      let data = { ...this.state };
      this.setState({
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
      });
      console.log(data);
    }
    //SignUp
  };

  render = () => {
    // console.log(this.props);
    return (
      <>
        <Container style={{ border: "1px solid #ddd" }}>
          <pre>{JSON.stringify(this.state, "", 2)}</pre>
          <pre>{JSON.stringify(this.props, "", 2)}</pre>
          <div>SignUp</div>
          <div>Please sign in to continue</div>
          <Form onSubmit={(e) => this.handleSubmit(e)} className="form-stacked">
            {this.state.pageOne ? (
              <>
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
                    required
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
                    required
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label for="email">Email Address</Label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={this.state.email}
                    onChange={(e) => this.setState({ email: e.target.value })}
                    required
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
                    required
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Button
                    variant="secondary"
                    disabled={
                      !(
                        this.state.firstName &&
                        this.state.lastName &&
                        this.state.email &&
                        this.state.password
                      )
                    }
                    onClick={(e) => {
                      e.preventDefault();

                      this.setState({ pageOne: false });
                    }}
                  >
                    Continue
                  </Button>
                </FormGroup>
              </>
            ) : (
              <>
                <FormGroup>
                  <Label for="gender">Gender</Label>
                  <br />
                  <ButtonGroup required>
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
                    required
                  ></Input>
                </FormGroup>
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
                    required
                  ></Input>
                  <Input
                    type="text"
                    id="number"
                    name="number"
                    placeholder="Apt Number (Optional)"
                    value={this.state.number}
                    onChange={(e) => {
                      this.setState({ number: e.target.value });
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
                    required
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
                    required
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
                    required
                  ></Input>
                </FormGroup>
                <FormGroup style={{ display: "flex" }}>
                  <Button
                    variant="secondary"
                    style={{ marginRight: "10px" }}
                    onClick={(e) => {
                      e.preventDefault();
                      this.setState({ pageOne: true });
                    }}
                  >
                    Previous
                  </Button>
                  <Button type="submit" variant="info">
                    Sign Me Up
                  </Button>
                </FormGroup>
              </>
            )}
          </Form>
          {this.state.signInFailed ? (
            <Alert variant="warning">
              Email or Password incorrect. Please try again
            </Alert>
          ) : (
            ""
          )}
        </Container>
      </>
    );
  };
}

export default SignUp;
