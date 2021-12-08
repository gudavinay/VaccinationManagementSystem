import React, { Component } from "react";
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Col,
    Row,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle
  } from "reactstrap";
  import axios from "axios";
  import backendServer from "../../../webConfig";
  import Chip from "@material-ui/core/Chip";
  import Paper from "@material-ui/core/Paper";

class AddVaccination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error:"",
            vaccineName:"",
            manufacturer:"",
            noOfShot:0,
            duration:0,
            shotIntervalVal:0,
            listOfDisease:[],
            selectedDisease:[],
        };
    }

    componentDidMount(){
        this.getDiseaseFromDB();
    }

    async getDiseaseFromDB() {
        await axios
          .get(`${backendServer}/diseases`)
          .then(response => {
            this.setState({
                listOfDisease: response.data
            });
            console.log(this.state.listOfDisease);
          })
          .catch(error => {
          });
      }

      handleDiseaseSelection = disease => {
        const findDisease = this.state.selectedDisease.find(
          x => x.diseaseId == disease.diseaseId
        );
        if (typeof findDisease == "undefined") {
          this.setState(prevState => ({
            selectedDisease: [
              ...prevState.selectedDisease,
              {
                disease: disease.diseaseId,
              }
            ]
          }));
        }
    }

    handleDelete = (e, disease) => {
        e.preventDefault();
        let items = this.state.selectedDisease;
        items.splice(items.indexOf(disease), 1);
        this.setState({
            selectedDisease: items
        });
      };

      handleSubmit = async (e) => {
        e.preventDefault();
        axios.defaults.headers["Access-Control-Allow-Origin"] = true;
        let data = {
         vaccineName: this.state.vaccineName,
         manufacturer: this.state.manufacturer,
         noOfShot: this.state.noOfShot,
         duration: this.state.duration,
         shotIntervalVal:this.state.shotIntervalVal,
         selectedDisease:this.state.selectedDisease
        };
        axios
          .post(`${backendServer}/addVaccine`, data)
          .then((response) => {
            console.log("Status Code : ", response.status);
            if (response.status === 200) {
              this.setState({
                isSuccess: true,
                error: "",
              });
              this.SetLocalStorage(JSON.stringify(response.data));
            } else {
              this.setState({
                error: "Vaccination already present",
                authFlag: false,
                error: {},
              });
            }
          })
          .catch(() => {
            this.setState({
                error: "User is already registered",
              authFlag: false,
            });
          });
      };



    render() {
        let dropDownItem = null;
        let selectedDisease = null;
        if (this.state.listOfDisease != null && this.state.listOfDisease.length > 0) {
            dropDownItem = this.state.listOfDisease.map(disease => {
              return (
                <DropdownItem
                  key={disease.diseaseId}
                  onClick={() => this.handleDiseaseSelection(disease)}
                >
                  {disease.diseaseName}
                </DropdownItem>
              );
            });
            if (this.state.selectedDisease.length > 0) {
                selectedDisease = this.state.selectedDisease.map(disease => {
                return (
                  <Chip
                    key={disease.diseaseId}
                    label={disease.diseaseName}
                    onDelete={e => this.handleDelete(e, disease)}
                    className="chip"
                  />
                );
              });
            }
        }
          return (
            <React.Fragment>
            <div className="container-fluid form-cont">
              <div className="flex-container">
                <div className="row" style={{ padding: "120px" }}>
                  <div className="col col-sm-3">
                  </div>
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
                              onChange={(e) => { this.setState({ vaccineName: e.target.value })}}
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
                              onChange={(e) => { this.setState({ manufacturer: e.target.value })}}
                              required
                            ></Input>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormGroup>
                            <Label htmlFor="noOfShot">
                             No of Shot
                            </Label>
                            <Input
                              type="number"
                              id="noOfShot"
                              name="noOfShot"
                              placeholder="No of Shot"
                              onChange={(e) => { this.setState({ noOfShot: e.target.value })}}
                              required
                            ></Input>
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Label htmlFor="duration">
                              Duration
                            </Label>
                            <Input
                              type="number"
                              id="duration"
                              name="duration"
                              placeholder="Duration"
                              onChange={(e) => { this.setState({ duration: e.target.value })}}
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
                        <Label htmlFor="shotIntervalVal">Shot Internal Value</Label>
                        <Row>
                          <Col>
                            <Input
                              type="number"
                              id="shotIntervalVal"
                              name="shotIntervalVal"
                              placeholder="Short Interval Value"
                              onChange={(e) => { this.setState({ shotIntervalVal: e.target.value })}}
                              required
                            ></Input>
                          </Col>
                          <Col>
                          <FormGroup>
                          <Label htmlFor="disease">List of Disease</Label>
                            <Dropdown>
                                <DropdownToggle>Select disease</DropdownToggle>
                                <DropdownMenu>{dropDownItem}</DropdownMenu>
                            </Dropdown>
                            <Paper component="ul" className="root">
                                {selectedDisease}
                            </Paper>
                            </FormGroup>
                          </Col>
                        </Row>
                        </FormGroup>
                      <FormGroup row>
                        <Col>
                          <Button type="submit" color="btn btn-info">
                            Create Vaccination
                          </Button>
                        </Col>
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