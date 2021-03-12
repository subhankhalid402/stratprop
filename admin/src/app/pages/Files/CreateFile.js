import React, {useEffect, useState, useRef} from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import alertify from "alertifyjs";
import {API_URL} from '../constants.js';

import {
    Card,
    CardBody,
    CardHeader,
    CardHeaderToolbar,
} from "../../../_metronic/_partials/controls";

export function CreateFile(props) {

    const name = useRef();
    const [file, setFile] = useState('');

    const project_id = props.match.params.project_id;
    const task_id = props.match.params.task_id;

    const handleFile = (e) => {
        setFile(e.target.files[0]);
    }

    const createFileHandler = (e) => {

        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name.current.value);
        formData.append('task_id', task_id);
        formData.append('file', file);

        axios.post(API_URL + "backend/file/create",
            formData,
            {
                'content-type': 'multipart/form-data'
            }
        )
            .then((response) => {
                if (response.data.code == 200) {
                    alertify.success(response.data.message);

                    props.history.push("/project/detail/" + project_id);
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
    }
    return (
        <Row>
            <Col md={12}>
                <Card>
                    <CardHeader title="Add New File">
                        <CardHeaderToolbar>

                        </CardHeaderToolbar>
                    </CardHeader>
                    <CardBody>

                        <div className="mt-5">
                            <Form onSubmit={createFileHandler}>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control ref={name} placeholder="Enter name"/>
                                    </Form.Group>

                                    <Form.Group as={Col}>
                                        <Form.Label>File</Form.Label>
                                        <Row>
                                            <Col>
                                                <Form.Control type="file" onChange={handleFile}/>
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                </Form.Row>
                                <Button variant="primary" className="float-right" type="submit">
                                    Save
                                </Button>
                            </Form>

                        </div>

                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
}