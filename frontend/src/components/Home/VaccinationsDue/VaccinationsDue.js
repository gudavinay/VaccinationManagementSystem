import React, { Component } from "react";
import Navbar from "./../../Navbar/Navbar";

class VaccinationsDue extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        {this.props.history && localStorage.getItem("userData") === null
          ? this.props.history.push("/")
          : null}
        <Navbar />
        I'm in Vaccinations Due
      </React.Fragment>
    );
  }
}

export default VaccinationsDue;
