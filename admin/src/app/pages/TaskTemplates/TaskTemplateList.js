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

export function TaskTemplateList(props) {
    const [taskTemplates, setTaskTemplates] = useState([]);
    const [taskTemplate, setTaskTemplate] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [show, setShow] = useState(false);
    const history = useHistory()

    const setCurrentTaskTemplate = (taskTemplate, index) => {
        setTaskTemplate(taskTemplate);
        setCurrentIndex(index);
        setShow(true);

    };

    const handleClose = () => setShow(false);

    const deleteTaskTemplate = () => {
        axios.post(
            API_URL + 'backend/task-template/delete',
            {id: taskTemplate.id}
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

        axios.get(API_URL + 'backend/task-template/all').then((response) => {

            if (response.data.code === 200) {

                setTaskTemplates(response.data.data);

                $("#task_template_table").DataTable();
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
            {taskTemplates.length > 0 ? (
                taskTemplates.map((taskTemplate, index) => (

                    <Row key={taskTemplate.id}>
                        <Col md={12}>
                            <Card className={`tasktemplates`}>
                                <CardHeader title={`${taskTemplate.taskno}. ${taskTemplate.name}`}>
                                    <CardHeaderToolbar>
                                        <Link to={`/task-template/edit/${taskTemplate.id}`}
                                              className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3">
                                                <span className="svg-icon svg-icon-md svg-icon-primary"><SVG
                                                    src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}/></span>
                                        </Link>
                                        <a
                                            onClick={() => setCurrentTaskTemplate(taskTemplate, index)}
                                            key={index}
                                            className="btn btn-icon btn-light btn-hover-danger btn-sm">
													<span className="svg-icon svg-icon-md svg-icon-danger">
													  <SVG src={toAbsoluteUrl("/media/svg/icons/General/Trash.svg")}/>
													</span>
                                        </a>
                                    </CardHeaderToolbar>
                                </CardHeader>
                                <CardBody>
									<div dangerouslySetInnerHTML={{__html:taskTemplate.description}} />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                ))
            ) : (
                <p>No Task Template</p>
            )}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Task Template</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to Delete?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={deleteTaskTemplate}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}