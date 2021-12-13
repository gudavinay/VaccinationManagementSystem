import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
import { firebase } from "./../../Firebase/firebase";
import axios from "axios";
import backendServer from "../../webConfig";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signIn: false,
      user: null,
      allEmails: [],
      logInFlag: false,
      newUser: false,
    };
  }

  componentDidMount = () => {
    this.getAllUsers();
  };

  getAllUsers = () => {
    axios.get(`${backendServer}/allEmails`).then((response) => {
      this.setState({ allEmails: response.data });
    });
  };

  signInWithFirebase = () => {
    let googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((res) => {
        console.log(res);
        if (!this.state.allEmails.includes(res.user.email)) {
          this.setState({ newUser: true });
          firebase.auth().currentUser.sendEmailVerification();
        } else {
          this.proceedWithSignUp();
        }
        console.log(res.user.emailVerified);
        this.setState({ signIn: true, user: res });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  proceedWithSignUp = () => {
    console.log(this.state.newUser);
    console.log(this.state.signIn);
    console.log(this.state.user.user.emailVerified);
    if (
      !this.state.newUser &&
      this.state.signIn &&
      this.state.user.user.emailVerified
    ) {
      let emailId = this.state.user.additionalUserInfo.profile.email;
      let user = {
        email: emailId,
        firstName: this.state.user.additionalUserInfo.profile.given_name,
        middleName: "",
        lastName: this.state.user.additionalUserInfo.profile.family_name,
        dob: new Date().toDateString(),
        gender: "Male",
        isVerified: true,
        role: emailId.substring(emailId.indexOf("@")) === "@sjsu.edu" ? 0 : 1,
        address: {
          street: "",
          aptNo: "",
          city: "San Jose",
          state: "CA",
          zipcode: 95110,
        },
      };
      console.log(user);
    }
  };

  signOut = () => {
    firebase.auth().signOut();
    this.setState({ signIn: false, user: null });
  };

  render = () => {
    console.log(this.state);
    return (
      <>
        <Container style={{ height: "100vh" }}>
          <Row
            style={{
              height: "100%",
            }}
          >
            <Col
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              {/* <pre>{JSON.stringify(this.state, "", 2)}</pre> */}
              <Container>
                {this.state.signIn ? (
                  <Button variant="dark" onClick={this.signOut}>
                    Sign Out
                  </Button>
                ) : (
                  <Button variant="dark" onClick={this.signInWithFirebase}>
                    Sign in with google
                  </Button>
                )}
              </Container>
              {this.state.newUser ? (
                <div>
                  Verify your email and{" "}
                  <span
                    style={{ color: "blue", cursor: "pointer" }}
                    onClick={async () => {
                      await this.setState({ newUser: false });
                      this.proceedWithSignUp();
                    }}
                  >
                    click here
                  </span>{" "}
                  to continue
                </div>
              ) : null}
            </Col>
            <Col
              style={{
                backgroundColor: "whitesmoke",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div style={{ width: "80%", margin: "auto" }}>
                {this.state.logInFlag ? (
                  <Login />
                ) : (
                  <SignUp allEmails={this.state.allEmails} />
                )}
                {this.state.logInFlag ? (
                  <div>
                    Don't have an account?{" "}
                    <span
                      style={{ color: "blue", cursor: "pointer" }}
                      onClick={() => this.setState({ logInFlag: false })}
                    >
                      Sign Up
                    </span>
                  </div>
                ) : (
                  <div>
                    Already have an account?{" "}
                    <span
                      style={{ color: "blue", cursor: "pointer" }}
                      onClick={() => this.setState({ logInFlag: true })}
                    >
                      Sign In
                    </span>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </>
    );
  };
}

export default Landing;
