import React, {useEffect, useState} from "react";
import axios from "axios";
import $ from "jquery";
import {useHistory} from 'react-router';
import alertify from "alertifyjs";
import {API_URL} from '../constants.js';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import TabPane from 'react-bootstrap/TabPane';
import TabContent from 'react-bootstrap/TabContent';
import TabContainer from 'react-bootstrap/TabContainer';
import ProgressBar from 'react-bootstrap/ProgressBar';
import ListGroup from 'react-bootstrap/ListGroup';



import {Card, CardBody, CardHeader, CardHeaderToolbar,} from "../../../_metronic/_partials/controls";


export function UserDetail(props) {

    const [user, setUser] = useState({});
    const [projects, setProjects] = useState([]);
    const [portfolios, setPortfolios] = useState([]);
    const [files, setFiles] = useState([]);
    const history = useHistory()

    const id = props.match.params.id;

    useEffect(() => {

        axios.get(API_URL + 'backend/user/' + id).then((response) => {

            if (response.data.code === 200) {
                setUser(response.data.data);
                setProjects(response.data.data.user_projects);
                setPortfolios(response.data.data.portfolios);
                setFiles(response.data.data.all_files);

                $("#project_table").DataTable();
                $("#portfolio_table").DataTable();
                $("#file_table").DataTable();
            } else if (response.data.code === 404) {
                alertify.error(response.data.message);
                return null;
            }
        })
            .catch((error) => {

                if (error.message === 'Request failed with status code 401') {
                    //props.logout();
                }
            });

    }, []);

    return (
        <>
            <Row>
                <Col md={12}>
                    <Card>
                        <CardHeader title="User Detail">
                            <CardHeaderToolbar>
                            </CardHeaderToolbar>
                        </CardHeader>
                        <CardBody>
                            <TabContainer id="left-tabs-example" defaultActiveKey="user_detail">
                                <Row>
                                    <Col sm={3}>
                                        <Nav variant="pills" className="flex-column">
                                            <Nav.Item>
                                                <Nav.Link eventKey="user_detail">Personal Information</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="user_projects">Projects</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="user_tasks">Tasks</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="user_files">Files</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="user_portfolios">Portfolio</Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                    </Col>
                                    <Col sm={9}>
                                        <TabContent>
                                            <TabPane eventKey="user_detail">

                                                <table id="user_table" className="table table-bordered ">
                                                    <tbody>

                                                    <tr>
                                                        <th>First Name</th>
                                                        <td>{user.firstname}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Last Name</th>
                                                        <td>{user.lastname}</td>

                                                    </tr>
                                                    <tr>
                                                        <th>Email</th>
                                                        <td>{user.email}</td>

                                                    </tr>
                                                    <tr>
                                                        <th>Username</th>
                                                        <td>{user.username}</td>

                                                    </tr>
                                                    <tr>
                                                        <th>Phone</th>
                                                        <td>{user.phone}</td>

                                                    </tr>

                                                    <tr>
                                                        <th>Status</th>
                                                        <td>{user.status}</td>

                                                    </tr>

                                                    </tbody>
                                                </table>
                                            </TabPane>

                                            <TabPane eventKey="user_projects">
                                                <table id="project_table" className="stratprop_datatable">
                                                    <thead>
                                                    <tr>
                                                        <th>Image</th>
                                                        <th>Title</th>
                                                        <th>Date</th>
                                                        <th>Address</th>
                                                        <th>Description</th>

                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {projects.length > 0 ? (
                                                        projects.map((project, index) => (
                                                            <tr key={project.id}>
                                                                <td><img className='project_circle_image'
                                                                         src={project.image}/></td>
                                                                <td>{project.title}</td>
                                                                <td>{project.date}</td>
                                                                <td>{project.address}</td>
                                                                <td>{project.description}</td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan={5}>No project</td>
                                                        </tr>
                                                    )}
                                                    </tbody>
                                                </table>
                                            </TabPane>

                                            <TabPane eventKey="user_tasks">
                                                {
                                                    projects.length > 0 ? (
                                                        projects.map((project, index) => (
                                                            <Card className="user_project_tasks">
                                                                <CardHeader title={project.title}>
                                                                    <CardHeaderToolbar>
                                                                    </CardHeaderToolbar>
                                                                </CardHeader>
                                                                <CardBody>
                                                                    {
                                                                        project.tasks.map((task, index) => {
                                                                                return (
                                                                                    <>
                                                                                        <p>{task.name}</p>
                                                                                        <p><ProgressBar
                                                                                            now={task.status * 20}
                                                                                            label={`${task.status * 20}%`}/>
                                                                                        </p>
                                                                                    </>
                                                                                )
                                                                            }
                                                                        )
                                                                    }


                                                                </CardBody>
                                                            </Card>
                                                        ))
                                                    ) : (
                                                        <p>No project</p>
                                                    )
                                                }

                                            </TabPane>

                                            <TabPane eventKey="user_files">

                                                <ListGroup variant="flush">
                                                    {files.length > 0 ? (
                                                        files.map((file, index) => (

                                                            <ListGroup.Item>
                                                                <a className={`text-stratprop`} href={file.url}>
                                                                    <img src={`https://img.icons8.com/cotton/2x/document-1.png`} height={100} />
                                                                    {file.name}
                                                                </a>
                                                            </ListGroup.Item>

                                                        ))
                                                    ) : (
                                                        <ListGroup.Item>No File</ListGroup.Item>
                                                    )}
                                                </ListGroup>

                                            </TabPane>

                                            <TabPane eventKey="user_portfolios">
                                                <table id="portfolio_table" className="stratprop_datatable">
                                                    <thead>
                                                    <tr>
                                                        <th>Image</th>
                                                        <th>Title</th>
                                                        <th>Date</th>
                                                        <th>Address</th>
                                                        <th>Description</th>

                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {portfolios.length > 0 ? (
                                                        portfolios.map((portfolio, index) => (
                                                            <tr key={portfolio.id}>
                                                                <td><img className='project_circle_image'
                                                                         src={portfolio.image}/></td>
                                                                <td>{portfolio.title}</td>
                                                                <td>{portfolio.date}</td>
                                                                <td>{portfolio.address}</td>
                                                                <td>{portfolio.description}</td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan={5}>No portfolio</td>
                                                        </tr>
                                                    )}
                                                    </tbody>
                                                </table>
                                            </TabPane>

                                        </TabContent>
                                    </Col>
                                </Row>
                            </TabContainer>


                        </CardBody>
                    </Card>
                </Col>
            </Row>

        </>
    )
}