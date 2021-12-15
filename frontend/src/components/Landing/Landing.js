import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
import { firebase } from "./../../Firebase/firebase";
import axios from "axios";
import backendServer from "../../webConfig";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import { setLocalStorage } from "../Services/ControllerUtils";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signIn: false,
      user: null,
      allEmails: [],
      logInFlag: true,
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
      .then(async (res) => {
        console.log(res);
        await this.setState({ signIn: true, user: res });
        if (!this.state.allEmails.includes(res.user.email)) {
          this.setState({ newUser: true });
          firebase.auth().currentUser.sendEmailVerification();
        } else {
          this.getUser();
        }
        console.log(res.user.emailVerified);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getUser = () => {
    axios
      .get(
        `${backendServer}/getUser/${this.state.user.additionalUserInfo.profile.email}`
      )
      .then(async (response) => {
        if (response.status === 200) {
          console.log(response.data);
          let responseUser = {
            mrn: response.data.mrn,
            email: response.data.email,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            isAdmin: response.data.admin,
          };
          console.log(responseUser);
          await localStorage.setItem("userData", JSON.stringify(responseUser));
          this.getAllUsers();
          this.setState({
            isSuccess: true,
            loginError: "",
          });
          window.location.reload();
        }
      });
  };

  proceedWithSignUp = () => {
    if (
      !this.state.newUser &&
      this.state.signIn &&
      this.state.user.user.emailVerified
    ) {
      let emailId = this.state.user.additionalUserInfo.profile.email;
      let user = {
        email: emailId,
        password: "",
        firstName: this.state.user.additionalUserInfo.profile.given_name,
        middleName: "",
        lastName: this.state.user.additionalUserInfo.profile.family_name,
        dob: new Date().toDateString(),
        gender: "Male",
        verified: true,
        admin:
          emailId.substring(emailId.indexOf("@")) === "@sjsu.edu"
            ? true
            : false,
        address: {
          street: "",
          aptNo: "",
          city: "San Jose",
          state: "CA",
          zipcode: 95110,
        },
      };
      console.log(user);
      axios.post(`${backendServer}/signup`, user).then(async (response) => {
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
          setLocalStorage(JSON.stringify(responseUser));
          localStorage.setItem("newUser", true);
          this.getAllUsers();
          this.setState({
            isSuccess: true,
            loginError: "",
          });
          window.location.reload();
        }
      });
    }
  };

  signOut = () => {
    firebase.auth().signOut();
    this.setState({ signIn: false, user: null });
    localStorage.clear();
  };

  render = () => {
    if (localStorage.getItem("userData")) {
      return <Redirect to="/dashboard" />;
    }
    console.log(this.state);
    console.log(localStorage.getItem("userData"));
    if (localStorage.getItem("userData")) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              margin: "70px 0 50px 0",
            }}
          >
            {/* <pre>{JSON.stringify(this.state, "", 2)}</pre> */}
            <Container>
              <Button
                variant="dark"
                disabled={this.state.signIn}
                onClick={this.signInWithFirebase}
              >
                Sign in with google
              </Button>
              {/* {this.state.signIn ? (
                <Button variant="dark" onClick={this.signOut}>
                  Sign Out
                </Button>
              ) : (
                <Button variant="dark" onClick={this.signInWithFirebase}>
                  Sign in with google
                </Button>
              )} */}
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
          </div>
          <div>
            <div
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div>
                {this.state.logInFlag ? (
                  <div>
                    <Login />
                  </div>
                ) : (
                  <div>
                    <SignUp allEmails={this.state.allEmails} />
                  </div>
                )}
                {this.state.logInFlag ? (
                  <div
                    style={{
                      width: "30%",
                      margin: "auto",
                      paddingLeft: "15px",
                    }}
                  >
                    Don't have an account?{" "}
                    <span
                      style={{
                        color: "blue",
                        cursor: "pointer",
                      }}
                      onClick={() => this.setState({ logInFlag: false })}
                    >
                      Sign Up
                    </span>
                  </div>
                ) : (
                  <div
                    style={{
                      width: "70%",
                      margin: "auto",
                      paddingLeft: "15px",
                    }}
                  >
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
            </div>
          </div>
        </div>
      </>
    );
  };
}

export default Landing;
