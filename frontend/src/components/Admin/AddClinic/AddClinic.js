import React, { Component } from "react";
import axios from "axios";
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
import { Link, Redirect } from "react-router-dom";
import backendServer from "../../../webConfig";
class AddClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clinicInfo:{
                name:"",
                noOfPhysician:0,
                aptNo: "",
                street: "",
                number: "",
                city: "",
                zipcode: "",
                state: "",
                startBussinessHour:0,
                endBussinessHour:0
            },
            error:""
        };
    }

    handleChange = (e) => {
        this.setState({
          clinicInfo: {
            ...this.state.clinicInfo,
            [e.target.name]: e.target.value,
          },
        });
      };

      handleSubmit = async (e) => {
        e.preventDefault();
        axios.defaults.headers["Access-Control-Allow-Origin"] = true;
        let data = {
          name: this.state.clinicInfo.name,
          noOfPhysician: this.state.clinicInfo.noOfPhysician,
          startBussinessHour: this.state.clinicInfo.startBussinessHour,
          endBussinessHour: this.state.clinicInfo.endBussinessHour,
          address: {
            street: this.state.clinicInfo.street,
            aptNo: this.state.clinicInfo.aptNo,
            city: this.state.clinicInfo.city,
            state: this.state.clinicInfo.state,
            zipcode: this.state.clinicInfo.zipcode,
          },
        };
        axios
          .post(`${backendServer}/clinic`, data)
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
                error: "User is already registered",
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
        return (
            <React.Fragment>
     <div className="container-fluid form-cont">
        <div className="flex-container">
          <div className="row" style={{ padding: "120px" }}>
            <div className="col col-sm-3"></div>
            <div className="col col-sm-6">
              <div
                id="errorLogin"
                hidden={this.state.error.length > 0 ? false : true}
                className="alert alert-danger"
                role="alert"
              >
                {this.state.error}
              </div>
              <h3>Create Clinic</h3>
              <Form onSubmit={this.handleSubmit} className="form-stacked">
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="clinicName">Clinic Name</Label>
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Clinic Name"
                        onChange={this.handleChange}
                        required
                      ></Input>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="noOfPhysician">No of Physician</Label>
                      <Input
                        type="number"
                        id="noOfPhysician"
                        name="noOfPhysician"
                        placeholder="Clinic Name"
                        onChange={this.handleChange}
                        required
                      ></Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                <Col><Label for="firstName">Start Bussiness Hour</Label>
                      <Input
                        type="number"
                        id="startBussinessHour"
                        name="startBussinessHour"
                        placeholder="Clinic Name"
                        onChange={this.handleChange}
                        required
                      ></Input></Col>
                  <Col><Label for="firstName">End Bussiness Hour</Label>
                      <Input
                        type="number"
                        id="endBussinessHour"
                        name="endBussinessHour"
                        placeholder="Clinic Name"
                        onChange={this.handleChange}
                        required
                      ></Input></Col>
                </Row>
                <FormGroup>
                  <Label htmlFor="address">Address</Label>
                  <Row>
                    <Col>
                      <Input
                        type="text"
                        id="street"
                        name="street"
                        placeholder="Street"
                        onChange={this.handleChange}
                        required
                      ></Input>
                    </Col>
                    <Col>
                      <Input
                        type="text"
                        id="number"
                        name="number"
                        placeholder="Apt Number (Optional)"
                        onChange={this.handleChange}
                      ></Input>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      {" "}
                      <Input
                        type="text"
                        id="city"
                        name="city"
                        placeholder="City"
                        onChange={this.handleChange}
                        required
                      ></Input>
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="number"
                        id="zipcode"
                        name="zipcode"
                        placeholder="Zip Code"
                        onChange={this.handleChange}
                        required
                      ></Input>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      {" "}
                      <Input
                        type="text"
                        id="state"
                        name="state"
                        placeholder="State"
                        onChange={this.handleChange}
                        required
                      ></Input>
                    </Col>
                    <Col></Col>
                  </Row>
                </FormGroup>
                <FormGroup row>
                  <Col>
                    <Button type="submit" color="btn btn-info">
                      Create Clinic
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

export default AddClinic;