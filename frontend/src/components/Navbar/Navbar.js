import React, { Component } from "react";
import { Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: false,
    };
  }
  render() {
    return (
      <div style={{ marginBottom: "5%" }}>
        <Navbar className="justify-content-end" expand="lg" bg="dark" variant="dark" fixed="top">
          <Navbar.Brand ><Link to="/dashboard">Vaccination Management System </Link></Navbar.Brand>
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

const AdminSnippet = () => {
  return <React.Fragment>
    <Nav.Link >
      <Link to="/addDisease">
        Add Disease
      </Link>
    </Nav.Link>
    <Nav.Link >
      <Link to="/addClinic">
        Add Clinic
      </Link>
    </Nav.Link>
    <Nav.Link >
      <Link to="/addVaccination">
        Add Vaccination
      </Link>
    </Nav.Link>
  </React.Fragment>

}
const UserSnippet = () => {
  return <React.Fragment>
  <Nav.Link >
    <Link to="/vaccinationHistory">
      Vaccination History
    </Link>
  </Nav.Link>
    <Nav.Link >
      <Link to="/appointments">
        Appointments
      </Link>
    </Nav.Link>
    <Nav.Link >
      <Link to="/vaccinationsDue">
        Vaccinations Due
      </Link>
    </Nav.Link>
  </React.Fragment>
}

export default NavigationBar;
