import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, Col, Row } from "reactstrap";
import axios from "axios";
import backendServer from "../../../webConfig";
import Select from "@material-ui/core/Select";
import { Checkbox, ListItemText, MenuItem } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import Navbar from "./../../Navbar/Navbar";

class AddVaccination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      vaccineName: "",
      manufacturer: "",
      noOfShot: 0,
      duration: 0,
      shotIntervalVal: 0,
      diseaseData: [],
      selectedDiseases: [],
    };
  }

  componentDidMount() {
    this.getDiseaseFromDB();
  }

  async getDiseaseFromDB() {
    await axios
      .get(`${backendServer}/diseases`)
      .then((response) => {
        this.setState({
          diseaseData: response.data,
          diseaseError: false,
        });
      })
      .catch((error) => {
        this.setState({
          diseaseData: [],
          diseaseError: true,
        });
      });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    // axios.defaults.headers["Access-Control-Allow-Origin"] = true;

    let listOfIds = [];
    for (let disease of this.state.selectedDiseases) {
      listOfIds.push(
        this.state.diseaseData.find(
          (element) => element.diseaseName === disease
        ).diseaseId
      );
    }

    let data = {
      vaccinationName: this.state.vaccineName,
      manufacturer: this.state.manufacturer,
      numberOfShots: Number(this.state.noOfShot),
      duration: Number(this.state.duration),
      shotIntervalVal: Number(this.state.shotIntervalVal),
      diseases: listOfIds,
    };

    axios
      .post(`${backendServer}/addVaccination`, data)
      .then((response) => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          this.setState({
            isSuccess: true,
            error: "",
          });
        } else {
          this.setState({
            error: "Error in adding vaccine to the database",
          });
        }
      })
      .catch(() => {
        this.setState({
          error: "Error in adding vaccine to the database",
        });
      });
  };

  render() {
    if (this.state.isSuccess) {
      return <Redirect to="/dashboard" />;
    } else
      return (
        <React.Fragment>
          {this.props.history && localStorage.getItem("userData") === null
            ? this.props.history.push("/")
            : null}
          <Navbar />
          <div className="container-fluid form-cont">
            <div className="flex-container">
              <div className="row" style={{ padding: "120px" }}>
                <div className="col col-sm-3"></div>
                <div className="col col-sm-6">
                  <div
                    id="error"
                    hidden={this.state.error.length > 0 ? false : true}
                    className="alert alert-danger"
                    role="alert"
                  >
                    {this.state.error}
                  </div>
                  <h3>Add Vaccination</h3>
                  <Form onSubmit={this.handleSubmit} className="form-stacked">
                    <Row>
                      <Col>
                        <FormGroup>
                          <Label for="vaccName">Vaccination Name</Label>
                          <Input
                            type="text"
                            id="vaccineName"
                            name="vaccineName"
                            placeholder="Vaccination Name"
                            onChange={(e) => {
                              this.setState({ vaccineName: e.target.value });
                            }}
                            required
                          ></Input>
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <Label for="manufacturer">Manufacturer</Label>
                          <Input
                            type="text"
                            id="manufacturer"
                            name="manufacturer"
                            placeholder="Manufacturer"
                            onChange={(e) => {
                              this.setState({ manufacturer: e.target.value });
                            }}
                            required
                          ></Input>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <FormGroup>
                          <Label htmlFor="noOfShot">No of Shot</Label>
                          <Input
                            type="number"
                            id="noOfShot"
                            name="noOfShot"
                            placeholder="No of Shot"
                            onChange={(e) => {
                              this.setState({ noOfShot: e.target.value });
                            }}
                            required
                          ></Input>
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <Label htmlFor="duration">Duration</Label>
                          <Input
                            type="number"
                            id="duration"
                            name="duration"
                            placeholder="Duration"
                            onChange={(e) => {
                              this.setState({ duration: e.target.value });
                            }}
                            required
                          ></Input>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col></Col>
                      <Col></Col>
                    </Row>
                    <FormGroup>
                      <Label htmlFor="shotIntervalVal">
                        Shot Internal Value
                      </Label>
                      <Row>
                        <Col>
                          <Input
                            type="number"
                            id="shotIntervalVal"
                            name="shotIntervalVal"
                            placeholder="Short Interval Value"
                            onChange={(e) => {
                              this.setState({
                                shotIntervalVal: e.target.value,
                              });
                            }}
                            required
                          ></Input>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Label>List of Diseases </Label>
                            {this.state.diseaseError ? (
                              <span style={{ color: "red" }}>
                                Error fetching diseases
                              </span>
                            ) : (
                              <Select
                                style={{ width: "inherit" }}
                                multiple
                                value={this.state.selectedDiseases}
                                renderValue={(selected) => selected.join(", ")}
                                onChange={(e) => {
                                  this.setState({
                                    selectedDiseases: e.target.value,
                                  });
                                }}
                              >
                                {this.state.diseaseData.map(
                                  (element, index) => (
                                    <MenuItem
                                      key={index}
                                      value={element.diseaseName}
                                    >
                                      <Checkbox
                                        checked={
                                          this.state.selectedDiseases.indexOf(
                                            element.diseaseName
                                          ) > -1
                                        }
                                      />
                                      <ListItemText
                                        primary={element.diseaseName}
                                      />
                                    </MenuItem>
                                  )
                                )}
                              </Select>
                            )}
                          </FormGroup>
                        </Col>
                      </Row>
                    </FormGroup>
                    <FormGroup>
                      <center>
                        <Button
                          type="submit"
                          disabled={
                            this.state.diseaseError ||
                            this.state.selectedDiseases.length === 0
                          }
                          color="btn btn-info"
                        >
                          Create Vaccination
                        </Button>
                      </center>
                    </FormGroup>
                  </Form>
                  <pre>{JSON.stringify(this.state, "", 2)}</pre>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
  }
}

export default AddVaccination;
