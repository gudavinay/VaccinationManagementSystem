import React, { Component } from "react";
import Navbar from "./../../Navbar/Navbar";
import axios from "axios";
import backendServer from "../../../webConfig";
// import Select from "@material-ui/core/Select";
// import { Checkbox, ListItemText, MenuItem } from "@material-ui/core";
import moment from "moment";
import { getUserProfile, getMimicTime } from "../../Services/ControllerUtils";
import { Redirect } from "react-router";

class VaccinationsDue extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = async () => {
    const user_mrn = getUserProfile().mrn;
    const currentDate = getMimicTime();
    const currentDateMoment = moment(getMimicTime());
    const currentDate2 = new Date(getMimicTime());
    console.log("currentDate : " + currentDate);
    console.log("currentDateMoment : " + currentDateMoment);
    console.log("currentDate2 : " + currentDate2);

    //axios.defaults.withCredentials = true;
    axios
      .get(
        `${backendServer}/getVaccinationsDueForUser/?user_mrn=${user_mrn}&currentDate=${currentDateMoment}`
      )
      .then((response) => {
        console.log(
          "response data from getVaccinationsDueForUser",
          response.data
        );
        if (response.status === 200) {
          this.setState({
            vaccinationDue: response.data,
            vaccinationDueError: false,
          });
        }
      })
      .catch((error) => {
        console.log("error:", error);
        this.setState({
          vaccinationDue: [],
          vaccinationDueError: true,
        });
      });
  };

  render() {
    if (localStorage.getItem("userData") === null) {
      return <Redirect to="/" />;
    }
    return <React.Fragment>I'm in Vaccinations Due</React.Fragment>;
  }
}

export default VaccinationsDue;
