import React, { Component } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import VaccinationHistory from "../VaccinationHistory/VaccinationHistory";
import Appointments from "../Appointments/Appointments";
import VaccinationsDue from "../VaccinationsDue/VaccinationsDue";
import Navbar from "./../../Navbar/Navbar";
import { Redirect } from "react-router";
import "./Dashboard.css";
import axios from "axios";
import backendServer from "../../../webConfig";
import { Label } from "reactstrap";
import { Checkbox, ListItemText, MenuItem } from "@mui/material";
import Select from "@material-ui/core/Select";
import {
  createTimeSlots,
  getMimicTime,
  getUserProfile,
} from "../../Services/ControllerUtils";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      window: 1,
      clinic: "",
      startDate: "",
      endDate: "",
      appointments: [],
      clinics: [],
      total: 0,
      noShow: 0,
      ratio: 0,
    };
  }

  componentDidMount = () => {
    if (this.isAdmin()) {
      this.getClinics();
    }
  };

  isAdmin = () => {
    return (
      localStorage.getItem("userData") &&
      JSON.parse(localStorage.getItem("userData")).isAdmin
    );
  };

  getClinics = () => {
    axios.get(`${backendServer}/getAllClinics`).then((response) => {
      if (response.status === 200) {
        this.setState({ clinics: response.data });
      }
    });
  };

  isDisabled = () => {
    if (this.state.startDate !== "" && this.state.endDate !== "") {
      if ((this.isAdmin() && this.state.clinic !== "") || !this.isAdmin()) {
        return false;
      }
    }
    return true;
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.getReports();
  };

  calculateReport = () => {
    let noShow = 0;
    if (this.state.appointments) {
      this.state.appointments.map((element) => {
        if (element.isChecked === 2) noShow = noShow + 1;
      });

      this.setState({
        total: this.state.appointments.length,
        noShow: noShow,
        ratio:
          this.state.appointments.length > 0
            ? noShow / this.state.appointments.length
            : 0,
      });
    }
  };

  getReports = () => {
    if (localStorage.getItem("userData")) {
      if (JSON.parse(localStorage.getItem("userData")).isAdmin) {
        let clinicId = null;
        this.state.clinics.map((element) => {
          if (element.name === this.state.clinic) {
            clinicId = element.id;
          }
        });
        if (clinicId !== null) {
          axios
            .get(
              `${backendServer}/getPatientReportForAdmin/?clinicID=${clinicId}&startDate=${this.state.startDate}&endDate=${this.state.endDate}`
            )
            .then((response) => {
              if (response.status === 200) {
                this.setState({ appointments: response.data, success2: true });
              }
            });
        }
      } else {
        let userMrn = JSON.parse(localStorage.getItem("userData")).mrn;
        axios
          .get(
            `${backendServer}/getPatientReport/?usermrn=${userMrn}&startDate=${this.state.startDate}&endDate=${this.state.endDate}`
          )
          .then((response) => {
            if (response.status === 200) {
              this.setState({ appointments: response.data, success1: true });
            }
          });
      }
    }
    this.calculateReport();
  };

  render() {
    if (localStorage.getItem("userData") === null) {
      return <Redirect to="/" />;
    }
    if (localStorage.getItem("newUser")) {
      return <Redirect to="/passwordReset" />;
    }
    return (
      <React.Fragment>
        <Container>
          <Card>
            <Card.Header className="mb-2 text-muted" style={{ padding: "0" }}>
              <Row style={{ margin: "0" }}>
                <Col
                  md={2}
                  className={this.state.window === 1 ? "bgColor" : "windows"}
                  style={{ textAlign: "center", padding: "7px 10px" }}
                  onClick={() => {
                    if (this.state.window !== 1) this.setState({ window: 1 });
                  }}
                >
                  {this.isAdmin() ? "System Report" : "Patient Report"}
                </Col>
                <Col
                  md={2}
                  className={this.state.window === 2 ? "bgColor" : "windows"}
                  style={{ textAlign: "center", padding: "7px 10px" }}
                  onClick={() => {
                    if (this.state.window !== 2) this.setState({ window: 2 });
                  }}
                >
                  {!this.isAdmin() ? "Vaccination History" : null}
                </Col>
                <Col
                  md={2}
                  className={this.state.window === 3 ? "bgColor" : "windows"}
                  style={{ textAlign: "center", padding: "7px 10px" }}
                  onClick={() => {
                    if (this.state.window !== 3) this.setState({ window: 3 });
                  }}
                >
                  {!this.isAdmin() ? "Appointments" : null}
                </Col>
                <Col
                  md={2}
                  className={this.state.window === 4 ? "bgColor" : "windows"}
                  style={{ textAlign: "center", padding: "7px 10px" }}
                  onClick={() => {
                    if (this.state.window !== 4) this.setState({ window: 4 });
                  }}
                >
                  {!this.isAdmin() ? "Vaccinations Due" : null}
                </Col>
              </Row>
            </Card.Header>
            <Card.Body style={{ minHeight: "500px" }}>
              {this.state.window === 1 ? (
                <>
                  {/* <pre>{JSON.stringify(this.state, "", 2)}</pre> */}
                  <div className="reportMain" style={{ display: "flex" }}>
                    {this.isAdmin() ? (
                      <div>
                        <div>Select Clinic</div>
                        <div>
                          <Select
                            // style={{ width: "inherit" }}
                            value={this.state.clinic}
                            onChange={(e) => {
                              this.setState({ clinic: e.target.value });
                            }}
                          >
                            {this.state.clinics.map((element) => (
                              <MenuItem key={element.id} value={element.name}>
                                {element.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                    <div>
                      <span className="reportSub">Start date</span>
                      <div>
                        <input
                          className="form-control"
                          type="date"
                          id="dateselector"
                          defaultValue={this.state.startDate}
                          onChange={(e) => {
                            this.setState({
                              startDate: e.target.value,
                            });
                          }}
                          // placeholder="mm-dd-yyyy"
                        />
                      </div>
                    </div>
                    <div>
                      <span className="reportSub">End date</span>
                      <div>
                        <input
                          className="form-control"
                          type="date"
                          id="dateselector"
                          defaultValue={this.state.endDate}
                          onChange={(e) => {
                            this.setState({
                              endDate: e.target.value,
                            });
                          }}
                          // placeholder="mm-dd-yyyy"
                        />
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <div style={{ color: "#fff" }}>submit</div>
                      <Button
                        disabled={this.isDisabled()}
                        type="submit"
                        variant="info"
                        onClick={(e) => {
                          this.handleSubmit(e);
                        }}
                      >
                        Get Reports
                      </Button>
                    </div>
                  </div>
                  <div className="ReportShow">
                    <div>Total Appointments: {this.state.total}</div>
                    <div>Total No Shows: {this.state.noShow}</div>
                    <div>No Show Rate: {this.state.ratio}</div>
                  </div>
                </>
              ) : null}
              {this.state.window === 2 ? <VaccinationHistory /> : null}
              {this.state.window === 3 ? <Appointments /> : null}
              {this.state.window === 4 ? <VaccinationsDue /> : null}
            </Card.Body>
          </Card>

          {/* <Card>
            <Card.Header className="mb-2 text-muted">
              Vaccination History
            </Card.Header>
            <Card.Body>
              <VaccinationHistory />
            </Card.Body>
          </Card>

          <Card>
            <Card.Header className="mb-2 text-muted">Appointments</Card.Header>
            <Card.Body>
              <Appointments />
            </Card.Body>
          </Card>

          <Card>
            <Card.Header className="mb-2 text-muted">
              Vaccinations Due
            </Card.Header>
            <Card.Body>
              <VaccinationsDue />
            </Card.Body>
          </Card> */}
        </Container>
      </React.Fragment>
    );
  }
}

export default Dashboard;
