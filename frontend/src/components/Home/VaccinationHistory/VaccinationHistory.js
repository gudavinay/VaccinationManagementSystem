import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, Col, Row } from "reactstrap";
import axios from "axios";
import backendServer from "../../../webConfig";
import Select from "@material-ui/core/Select";
import { Checkbox, ListItemText, MenuItem } from "@material-ui/core";
class VaccinationHistory extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return <React.Fragment>I'm in Vaccination History</React.Fragment>;
	}
}

export default VaccinationHistory;
