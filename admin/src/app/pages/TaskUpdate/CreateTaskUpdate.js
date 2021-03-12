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

export function CreateTaskUpdate(props) {

    const taskupdate = useRef();
    const link_text = useRef();
    const link_url = useRef();
    const video_url = useRef();
    const video_embed_code = useRef();
    const [file, setFile] = useState('');

    const task_id = props.match.params.task_id;
    const project_id = props.match.params.project_id;

    const handleFile = (e) => {
        setFile(e.target.files[0]);
    }

    const createTaskUpdateHandler = (e) => {

        e.preventDefault();

        const formData = new FormData();
        formData.append('taskupdate', taskupdate.current.value);
        formData.append('link_text', link_text.current.value);
        formData.append('link_url', link_url.current.value);
        formData.append('video_url', video_url.current.value);
        formData.append('video_embed_code', video_embed_code.current.value);
        formData.append('file', file);
        formData.append('task_id', task_id);

        axios.post(API_URL + "backend/taskupdate/create",
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
                    <CardHeader title="Add New Task Update">
                        <CardHeaderToolbar>

                        </CardHeaderToolbar>
                    </CardHeader>
                    <CardBody>

                        <div className="mt-5">
                            <Form onSubmit={createTaskUpdateHandler}>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Text</Form.Label>
                                        <Form.Control as="textarea" ref={taskupdate} placeholder="Enter Text"/>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Link Text</Form.Label>
                                        <Form.Control ref={link_text} placeholder="Enter Link Text"/>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>Link URL</Form.Label>
                                        <Form.Control ref={link_url} placeholder="Enter Link Url"/>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Video URL</Form.Label>
                                        <Form.Control ref={video_url} placeholder="Enter Video Url"/>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>Video Embed Code</Form.Label>
                                        <Form.Control ref={video_embed_code} placeholder="Enter Video Embed Vode"/>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>File</Form.Label>
                                        <Row>
                                            <Col>
                                                <Form.Control type="file" onChange={handleFile}/>
                                            </Col>
                                            <Col>
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