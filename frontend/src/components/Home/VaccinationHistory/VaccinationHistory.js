import React, { Component } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Container } from "@mui/material";
import { Link } from "react-router-dom";
import { Col, Row, Button } from "react-bootstrap";
import axios from "axios";
import backendServer from "../../../webConfig";
import Select from "@material-ui/core/Select";
import { Checkbox, ListItemText, MenuItem } from "@material-ui/core";
class VaccinationHistory extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount = async () => {
		//const userMrn = localStorage.getItem("user_id");
		const user_mrn = "101";
		//axios.defaults.withCredentials = true;
		axios
			.get(`${backendServer}/getCheckedInAppointmentsForUser/${user_mrn}`)
			.then((response) => {
				console.log(
					"response data from getCheckedInAppointmentsForUser",
					response.data
				);
				if (response.status === 200) {
					this.setState({
						checkedInAppointments: response.data,
						vaccinationHistoryError: false,
					});
				}
			})
			.catch((error) => {
				console.log("error:", error);
				this.setState({
					checkedInAppointments: {},
					vaccinationHistoryError: true,
				});
			});
	};

	render() {
		let vacciHistory = "";
		if (this.state && this.state.checkedInAppointments) {
			vacciHistory = this.state.checkedInAppointments.map((item) => (
				<Row
					key={item.appointmentId}
					style={{
						border: "1px solid #bbb",
						borderRadius: "15px",
						padding: "10px 25px",
						margin: "10px",
					}}
				>
					<Col md={8}>
						<div>Clinic: {item.clinic.name}</div>
						<div>
							Address: {item.clinic.address.street}, {item.clinic.address.city}
						</div>
						<div>
							Appointment Date:{" "}
							{new Date(item.appointmentDateTime).toDateString()}
						</div>
						<div>
							Appointment Time:{" "}
							{new Date(item.appointmentDateTime).toTimeString()}
						</div>
					</Col>
					<Col>
						Vaccinations taken
						{item.vaccinations && item.vaccinations.length > 0 ? (
							<ul className="list-group">
								{item.vaccinations.map((elem) => (
									<div key={elem.vaccinationId}>
										<li className="list-group-item">
											{" "}
											Vaccination name: {elem.vaccinationName}
										</li>
										<li className="list-group-item">
											Number of shots taken:{elem.numberOfShots}
										</li>
									</div>
								))}
							</ul>
						) : (
							<div>No vaccinations mapped</div>
						)}
					</Col>
				</Row>
			));
		} else {
			vacciHistory = <h3>You have not taken any vaccines yet</h3>;
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
							<Typography>Vaccination History</Typography>
						</AccordionSummary>
						<AccordionDetails>{vacciHistory}</AccordionDetails>
					</Accordion>
				</Container>
			</React.Fragment>
		);
	}
}

export default VaccinationHistory;
