import React, { Component } from "react";
import { Alert, Button, Container } from "react-bootstrap";
import {
  Form,
  FormGroup,
  // Label,
  Input,
} from "reactstrap";
import backendServer from "../../webConfig";
import axios from "axios";
import { Redirect } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      signInFailed: false,
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`${backendServer}/login`);
    var data = {
      email: this.state.email,
      password: this.state.password,
    };
    axios.defaults.headers["Access-Control-Allow-Origin"] = true;
    axios
      .post(`${backendServer}/login`, data)
      .then((response) => {
        console.log("Status Code : ", response);
        if (response.status === 200) {
          let responseUser = {
            mrn: response.data.mrn,
            email: response.data.email,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            isAdmin: response.data.admin,
          };
          localStorage.setItem("userData", JSON.stringify(responseUser));
          this.setState({
            isSuccess: true,
            loginError: "",
          });
        } else {
          this.setState({
            loginError: "Unable to verify user",
            authFlag: false,
            error: {},
          });
        }
      })
      .catch(() => {
        this.setState({
          loginError: "Unable to verify user",
          authFlag: false,
        });
      });
  };

  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   let data = { ...this.state };
  //   this.setState({
  //     email: "",
  //     password: "",
  //   });
  //   console.log(data);
  //   //login
  // };

  render = () => {
    if (this.state.isSuccess) return <Redirect to="/dashboard" />;
    else {
      return (
        <>
          <Container style={{ border: "1px solid #ddd" }}>
            {/* <pre>{JSON.stringify(this.state, "", 2)}</pre> */}
            <div>Login</div>
            <div>Please sign in to continue</div>
            <Form
              onSubmit={(e) => this.handleSubmit(e)}
              className="form-stacked"
            >
              <FormGroup>
                <Input
                  type="email"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={(e) => this.setState({ email: e.target.value })}
                  required
                ></Input>
              </FormGroup>
              <FormGroup>
                <Input
                  type="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={(e) => this.setState({ password: e.target.value })}
                  required
                ></Input>
              </FormGroup>
              <FormGroup>
                <Button type="submit" variant="outline-dark">
                  Log In
                </Button>
              </FormGroup>
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
    }
  };
}

export default Login;
