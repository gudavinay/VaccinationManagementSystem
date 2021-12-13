import React, { Component } from "react";
import { Alert, Button, Container } from "react-bootstrap";
import { Form, FormGroup, Label, Input } from "reactstrap";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      signInFailed: false,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let data = { ...this.state };
    this.setState({
      email: "",
      password: "",
    });
    console.log(data);
    //login
  };

  render = () => {
    return (
      <>
        <Container style={{ border: "1px solid #ddd" }}>
          <pre>{JSON.stringify(this.state, "", 2)}</pre>
          <div>Login</div>
          <div>Please sign in to continue</div>
          <Form onSubmit={(e) => this.handleSubmit(e)} className="form-stacked">
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
  };
}

export default Login;