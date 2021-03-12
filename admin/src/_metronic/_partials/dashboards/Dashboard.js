import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import alertify from "alertifyjs";
import {API_URL} from '../../../app/pages/constants.js';
import {Line, Pie, Bar, Doughnut} from 'react-chartjs-2';
import { toAbsoluteUrl } from "../../_helpers";
import SVG from "react-inlinesvg";
import {DashboardWidget} from "../widgets/mixed/DashboardWidget.js";

import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../_metronic/_partials/controls";



export function Dashboard() {

  const [monthWiseProjects, setMonthWiseProjects] = useState({});
	const colors = [getRandomColor(),getRandomColor(),getRandomColor()];

  const [terminalWiseProjects, setTerminalWiseProjects] = useState({});
  const [cityWiseProjects, setCityWiseProjects] = useState({});
  const [dayWiseProjects, setDayWiseProjects] = useState({});

  const [dashboard, setDashboard] = useState({
    total_users: 0,
    total_projects: 0,
    total_portfolios: 0,
    total_staff: 0,
  });

    useEffect( () => {



  axios.get(API_URL + 'backend/dashboard/stats').then( (response) => {
      
      if(response.data.code === 200){
                
      setDashboard(response.data.data);
      setDayWiseProjects({
        labels: response.data.data.day_wise_projects.labels,
        datasets: [{
            barPercentage: 1,
            barThickness: 50,
            maxBarThickness:50,
            minBarLength: 0,
            data: response.data.data.day_wise_projects.data,
            backgroundColor: [
            getRandomColor(),
            getRandomColor(),
            getRandomColor(),
            getRandomColor(),
            getRandomColor(),
            getRandomColor(),
            getRandomColor(),
            
          ],
        }]
      });

      // Month Wise Projects Line Chart
      setMonthWiseProjects({
        labels: response.data.data.month_wise_projects.labels,
          datasets: [
            {
              label: 'All Projects',
              fill: false,
              lineTension: 0.1,
              backgroundColor: colors[0],
              borderColor: colors[0],
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: colors[0],
              pointBackgroundColor: colors[0],
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: colors[0],
              pointHoverBorderColor: colors[0],
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: response.data.data.month_wise_projects.data.all
            }
          ]
        });



    }

            else if(response.data.code === 404){
                alertify.error(response.data.message);
                return null;
            }
    })
    .catch((error) => {
            
            if(error.message === 'Request failed with status code 401'){
                //props.logout();
            }
        });

  }, []);


const options={
            responsive: true,
            legend: {
                display: false,
            },
           
            scales: {
                
                yAxes: [{
                    stacked: true
                }]
            }
        };		
	return(
		
		<>
		<Row>
			<Col md={3}>
				<DashboardWidget  
					className="gutter-b"
	                symbolShape="circle"
	                baseColor="danger"
	                mainTitle="Total Users"
	                value={dashboard.total_users}
	                icon="General/User.svg"
				/>
			</Col>

			<Col md={3}>
				<DashboardWidget  
					className="gutter-b"
	                symbolShape="circle"
	                baseColor="primary"
	                mainTitle="Total Projects"
	                value={dashboard.total_projects}
	                icon="Custom/Layout-3d.svg"
				/>
			</Col>

			<Col md={3}>
				<DashboardWidget  
					className="gutter-b"
	                symbolShape="circle"
	                baseColor="warning"
	                mainTitle="Total portfolios"
	                value={dashboard.total_portfolios}
	                icon="Layout/Layout-4-blocks.svg"
				/>
			</Col>

			<Col md={3}>
				<DashboardWidget  
					className="gutter-b"
	                symbolShape="circle"
	                baseColor="success"
	                mainTitle="Total Agents"
	                value={dashboard.total_staff}
	                icon="General/User.svg"
				/>
			</Col>
			

		</Row>
      	<Row>
	        <Col md={6}>
				<Card>
	      			<CardHeader title="Projects Per Day (Last 7 Days)">
				        <CardHeaderToolbar>
				          
				        </CardHeaderToolbar>
				    </CardHeader>
				    <CardBody>
		            	<Bar data={dayWiseProjects} options={options} />
		            </CardBody>
		        </Card>
	        </Col>
	        <Col md={6}>

				<Card>
	      			<CardHeader title="Projects Per Month (Last 12 Months)">
				        <CardHeaderToolbar>
				          
				        </CardHeaderToolbar>
				    </CardHeader>
				    <CardBody>
		            	<Line data={monthWiseProjects} />
		            </CardBody>
		        </Card>
	        </Col>
	        
		</Row>
      	</>
	)
}


function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 10)];
  }
  return color;
}


function random_number(number = 100) {
	
	return Math.floor(Math.random() * number)
}