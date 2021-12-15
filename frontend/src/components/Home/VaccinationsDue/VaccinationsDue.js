import React, { Component } from "react";
import Navbar from "./../../Navbar/Navbar";
import { Col, Row } from "react-bootstrap";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Container } from "@mui/material";
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
				} else {
					this.setState({
						vaccinationDue: [],
						vaccinationDueError: "No vaccinations present",
					});
				}
			})
			.catch((error) => {
				console.log("error:", error);
				this.setState({
					vaccinationDue: [],
					vaccinationDueError: "Error",
				});
			});
	};

	render() {
		if (localStorage.getItem("userData") === null) {
			return <Redirect to="/" />;
		}
		let vacciDue = "";
		if (this.state && this.state.vaccinationDue) {
			vacciDue = this.state.vaccinationDue.map((item) => (
				<Row
					key={item.vaccinationId}
					style={{
						border: "1px solid #bbb",
						borderRadius: "15px",
						padding: "10px 25px",
						margin: "10px",
					}}
				>
					<Col md={8}>
						<div>Vaccination Name: {item.vaccinationName}</div>
						<div>Vaccination shot number due: {item.numberOfShotDue}</div>
						<div>Due Date: {new Date(item.dueDate).toDateString()}</div>
					</Col>
					<Col>
						Appointment Scheduled
						{item.appointment && item.appointment.length > 0 ? (
							<ul className="list-group">
								{item.appointment.map((elem) => (
									<div key={elem.appointmentId}>
										<li className="list-group-item">
											{" "}
											Clinic name: {elem.clinic.name}
										</li>
										<li className="list-group-item">
											Clinic Address:{elem.clinic.address.street},{" "}
											{elem.clinic.address.city}
										</li>
									</div>
								))}
							</ul>
						) : (
							<div>No Appointment schduled</div>
						)}
					</Col>
				</Row>
			));
		} else {
			vacciDue = <h6>You have no vaccination due</h6>;
		}
		return (
			<React.Fragment>
				<Container>
					<Accordion
						square
						expanded={this.state.expanded === "panel1"}
						onChange={(e) => {
							this.setState({ expanded: "panel1" });
						}}
					>
						<AccordionSummary
							aria-controls="panel1d-content"
							id="panel1d-header"
						>
							<Typography>Vaccination Due</Typography>
						</AccordionSummary>
						<AccordionDetails>{vacciDue}</AccordionDetails>
					</Accordion>
				</Container>
			</React.Fragment>
		);
	}
}

export default VaccinationsDue;
