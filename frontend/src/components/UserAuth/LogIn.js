import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  ButtonGroup,
} from "reactstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";
class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        email: "",
        password: "",
      },
      loginError: "",
      isSuccess: false,
    };
  }

  handleChange = (e) => {
    this.setState({
      userInfo: {
        ...this.state.userInfo,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    axios.post(`http://localhost:3001/signup`, this.state.userInfo)``
      .then((response) => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          this.setState({
            isSuccess: true,
            loginError: "",
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
      return <Redirect to="/dashboard" />;
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
              <h3>LogIn VMS Account</h3>
              <Form onSubmit={this.handleSubmit} className="form-stacked">
                <Row>
                  <Col>
                    <FormGroup>
                      <Label htmlFor="email">
                        <strong>email address</strong>
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
                        <strong>password</strong>
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

                <FormGroup row>
                  <Col>
                    <Button type="submit" color="btn btn-info">
                      Log In
                    </Button>
                    <Button type="submit" color="btn btn-info">
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

export default LogIn;
