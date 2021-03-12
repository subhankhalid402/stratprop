import React, {useEffect, useState} from "react";
import axios from "axios";
import $ from "jquery";
import {Link} from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {useHistory} from 'react-router';
import {toAbsoluteUrl} from "../../../_metronic/_helpers";
import SVG from "react-inlinesvg";
import alertify from "alertifyjs";
import {API_URL} from '../constants.js';
import DataTable from "datatables.net";
import {Card, CardBody, CardHeader, CardHeaderToolbar,} from "../../../_metronic/_partials/controls";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export function ProjectList(props) {
    const [projects, setProjects] = useState([]);
    const [project, setProject] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [show, setShow] = useState(false);
    const history = useHistory()

    const setCurrentProject = (project, index) => {
        setProject(project);
        setCurrentIndex(index);
        setShow(true);
    };

    const handleClose = () => setShow(false);

    const deleteProject = () => {
        axios.post(
            API_URL + 'backend/project/delete',
            {id: project.id}
        ).then((response) => {
            if (response.data.code == 200) {
                history.go(0);
                setShow(false);
                alertify.success(response.data.message);
            } else if (response.data.code === 404) {
                alertify.error(response.data.message);
                return null;
            }
        })
    }

    useEffect(() => {

        axios.get(API_URL + 'backend/project/all').then((response) => {

            if (response.data.code === 200) {

                setProjects(response.data.data);
            } else if (response.data.code === 404) {
                alertify.error(response.data.message);
                return null;
            }
        })
            .catch((error) => {

                if (error.message === 'Request failed with status code 401') {
                    this.props.logout();
                }
            });

    }, []);

    return (
        <>
            {projects.length > 0 ? (
                projects.map((project, index) => (

                    <Row key={project.id}>
                        <Col md={12}>
                            <Card className={`projects`}>
                                <CardHeader title={`${project.title} - (${project.date})`}>
                                    <CardHeaderToolbar>
                                        <Link to={`/project/detail/${project.id}`}
                                                  className="btn btn-icon btn-light btn-hover-success  btn-sm">
		            		                <span className="svg-icon svg-icon-md svg-icon-success "><SVG
                                                src={toAbsoluteUrl("/media/svg/icons/General/Visible.svg")}
                                            /></span>
                                            </Link>
                                        <Link to={`/project/edit/${project.id}`}
                                              className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3">
                                                <span className="svg-icon svg-icon-md svg-icon-primary"><SVG
                                                    src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}/></span>
                                        </Link>
                                        <a
                                            onClick={() => setCurrentProject(project, index)}
                                            key={index}
                                            className="btn btn-icon btn-light btn-hover-danger btn-sm">
													<span className="svg-icon svg-icon-md svg-icon-danger">
													  <SVG src={toAbsoluteUrl("/media/svg/icons/General/Trash.svg")}/>
													</span>
                                        </a>
                                    </CardHeaderToolbar>
                                </CardHeader>
                                <CardBody>
                                    <div dangerouslySetInnerHTML={{__html:project.description}} />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                ))
            ) : (
                <p>No Project</p>
            )}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to Delete?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={deleteProject}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}