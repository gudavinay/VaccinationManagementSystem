import React, { Component } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Container } from "@mui/material";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
// import { Link } from "react-router-dom";
import { Link, Redirect } from "react-router-dom";
import {
	Col,
	Row,
	// Button
} from "react-bootstrap";
import axios from "axios";
import backendServer from "../../../webConfig";
// import Select from "@material-ui/core/Select";
// import { Checkbox, ListItemText, MenuItem } from "@material-ui/core";
import Navbar from "./../../Navbar/Navbar";
import { getUserProfile, getMimicTime } from "../../Services/ControllerUtils";
import moment from "moment";

class VaccinationHistory extends Component {
	constructor(props) {
		super(props);
		this.state = {
			expanded: "panel1",
			vaccinationData: [],
		};
	}

	componentDidMount() {
		//const userMrn = localStorage.getItem("user_id");
		this.getAllVaccinations();
		this.getVaccinationHistory();
	}

	getAllVaccinations() {
		axios
			.get(`${backendServer}/getTotalVaccinationsinRepo`)
			.then((result) => {
				console.log(
					"response data from getTotalVaccinationsinRepo",
					result.data
				);
				this.setState({
					vaccinationData: result.data,
					vaccinationError: false,
				});
			})
			.catch((err) => {
				this.setState({ vaccinationData: [], vaccinationError: true });
			});
	}

	getVaccinationHistory() {
		let user_mrn = "";
		if (getUserProfile()) user_mrn = getUserProfile().mrn;
		axios
			.get(
				`${backendServer}/getCheckedInAppointmentsForUser/?user_mrn=${user_mrn}&isChecked=1`
			)
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
					checkedInAppointments: [],
					vaccinationHistoryError: true,
				});
			});
	}
	render() {
		let len = this.state.vaccinationData.length;
		let shotCount = new Array(len + 1);
		for (let i = 0; i < shotCount.length; i++) {
			shotCount[i] = 0;
		}

		if (localStorage.getItem("userData") === null) {
			return <Redirect to="/" />;
		}
		let vacciHistory = "";
		if (
			this.state &&
			this.state.checkedInAppointments &&
			new Date(moment(this.state.checkedInAppointments.appointmentDateTime)) <
				getMimicTime()
		) {
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
					<Col>
						<div>
							<strong>Clinic Name:</strong> {item.clinic.name}
						</div>
						<div>
							<strong>Clinic Address:</strong> {item.clinic.address.street},{" "}
							{item.clinic.address.city}
						</div>
						<div>
							<strong>Appointment Date:</strong> {item.appointmentDateStr}
						</div>
						<div>
							<strong>Appointment Time:</strong> {item.appointmentTimeStr}
						</div>
					</Col>

					<Col>
						<strong>
							<VaccinesIcon />
							Vaccinations taken
						</strong>
						<Accordion>
							{item.vaccinations && item.vaccinations.length > 0 ? (
								<ul className="list-group">
									{item.vaccinations.map((elem) => (
										<div key={elem.vaccinationId}>
											<li className="list-group-item">
												{" "}
												<strong>Vaccination name:</strong>{" "}
												{elem.vaccinationName}
											</li>
											<li className="list-group-item">
												<strong>Shot number taken:</strong>{" "}
												{elem.duration == 0 && elem.numberOfShots == 1
													? parseInt(elem.numberOfShots)
													: parseInt(++shotCount[parseInt(elem.vaccinationId)])}
											</li>
										</div>
									))}
								</ul>
							) : (
								<small>No vaccinations mapped</small>
							)}
						</Accordion>
					</Col>
				</Row>
			));
		} else {
			vacciHistory = <h6>You have not taken any vaccines yet</h6>;
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
							<Typography>
								<MedicalServicesIcon />
								<strong>Vaccination History</strong>
							</Typography>
						</AccordionSummary>
						<AccordionDetails>{vacciHistory}</AccordionDetails>
					</Accordion>
				</Container>
				{/* <pre>{JSON.stringify(this.state, " ", 5)}</pre> */}
			</React.Fragment>
		);
	}
}

export default VaccinationHistory;
