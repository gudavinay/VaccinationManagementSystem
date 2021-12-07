import React, { Component } from "react";
import { Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: false,
    };
  }
  render() {
    return (
      <div style={{marginBottom:"4%"}}>
        <Navbar className="justify-content-end" expand="lg" bg="dark" variant="dark" fixed="top">
          <Navbar.Brand style={{ cursor: "pointer" }} onClick={() => {
              this.props.history.push("/");
            }} > Vaccination Management System </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {/* {this.state.isAdmin ?  */}
              <AdminSnippet /> : <UserSnippet /> 
              {/* } */}
              <Nav.Link
              className="justify-content-end"
                onClick={() => {
                  localStorage.clear();
                  this.props.history.push("/");
                }}
              >
                Log out
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar >
      </div >
    );
  }
}

function AdminSnippet() {
  return  <>
  <Nav.Link
    onClick={() => {
      this.props.history.push("/addDisease");
    }}
  >
    Add Disease
  </Nav.Link>
  <Nav.Link
    onClick={() => {
      this.props.history.push("/addClinic");
    }}
  >
    Add Clinic
  </Nav.Link>
  <Nav.Link
    onClick={() => {
      this.props.history.push("/addVaccination");
    }}
  >
    Add Vaccination
  </Nav.Link>
  </>
  
}
function UserSnippet() {
  return <>
    <Nav.Link
      onClick={() => {
        this.props.history.push("/appointments");
      }} >
      Appointments
    </Nav.Link>
    <Nav.Link
      onClick={() => {
        this.props.history.push("/vaccinationHistory");
      }} >
      Vaccination History
    </Nav.Link>
    <Nav.Link
      onClick={() => {
        this.props.history.push("/vaccinationsDue");
      }} >
      Vaccinations Due
    </Nav.Link>
  </>
}

export default NavigationBar;
