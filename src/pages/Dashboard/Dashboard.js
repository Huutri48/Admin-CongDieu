import React from 'react'
import { Col, Row } from 'antd'
// import imageHeaderDashboard from "../../asset/image-header-dashboard.webp"
import { Line, Doughnut } from "react-chartjs-2";
import './Dashboard.css'

const dataLineChart = {
	labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
	datasets: [
		{
			label: "First dataset",
			data: [33, 53, 85, 41, 44, 65],
			fill: true,
			backgroundColor: "rgba(75,192,192,0.2)",
			borderColor: "#4bc7d2"
		},
		{
			label: "Second dataset",
			data: [33, 25, 35, 51, 54, 76],
			fill: false,
			borderColor: "#3a57e8"
		}
	]
};

const dataCycleChart = {
	labels: [
		"Africa",
		"Asia",
	],
	datasets: [
		{
			label: "Population (millions)",
			backgroundColor: [
				"#3e95cd",
				"#8e5ea2",
			],
			data: [2478, 5267]
		}
	]
}

function Dashboard() {
	return (
		<div className="wrapper-dashboard">
			<div className="dashboard-header">
				<div className="content-dashboard-header">
					<h3>Hello Devs !</h3>
					<p>Think different. </p>
				</div>
			</div>
			<div className="content-dashboard-main">
				<Row>
					<Col md={8}>
						<div className="cart-body">
							<div className="cart-body-left cart-left-first">
								<i className="far fa-cloud"></i>
							</div>
							<div className="cart-body-right">
								<p>
									Total sales
								</p>
								<h4>450K VND</h4>
							</div>
						</div>
					</Col>
					<Col md={8}>
						<div className="cart-body cart-body-second">
							<div className="cart-body-left cart-left-second">
								<i className="far fa-cloud"></i>
							</div>
							<div className="cart-body-right">
								<p>
									Total sales
								</p>
								<h4>450K VND</h4>
							</div>
						</div>
					</Col>
					<Col md={8}>
						<div className="cart-body">
							<div className="cart-body-left cart-left-third">
								<i className="far fa-cloud"></i>
							</div>
							<div className="cart-body-right">
								<p>
									Total sales
								</p>
								<h4>450K VND</h4>
							</div>
						</div>
					</Col>
				</Row>

				<div className="wrapper-chart">
					<div className="wrapper-chart-left">
						<div className="wrapper-line-chart" >
							<Line data={dataLineChart} />
						</div>
					</div>
					<div className="wrapper-chart-right">
						<div className="wrapper-cycle-chart">
							<Doughnut
								data={dataCycleChart}
								option={{
									title: {
										display: true,
										text: "Predicted world population (millions) in 2050"
									}
								}}
							/>
						</div>
					</div>
				</div>

			</div>
		</div >
	)
}

export default Dashboard
