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

import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export function EditTaskTemplate(props) {
    const initialState = {
        taskTemplate: '',
        taskno: '',
    };

    const [taskTemplate, setTaskTemplate] = useState({});
    const [fields, setFields] = useState(initialState);
    const [data, setData] = useState('');

    const name = useRef();
    const taskno = useRef();
    const description = useRef();
    const id = props.match.params.id;

    useEffect(() => {
        axios.get(API_URL + 'backend/task-template/' + id).then((response) => {

            if (response.data.code === 200) {
                setTaskTemplate(response.data.data);
            } else if (response.data.code === 404) {
                alertify.error(response.data.message);
                return null;
            }
        })
    }, []);

    const editTaskTemplateHandler = (e) => {

        e.preventDefault();
        axios.post(API_URL + "backend/task-template/update",
            {
                id: id,
                name: name.current.value,
                taskno: taskno.current.value,
                description: data,
            }
        )
            .then((response) => {
                if (response.data.code == 200) {
                    alertify.success(response.data.message);
                    props.history.push("/task-template/all");
                } else if (response.data.code === 404) {
                    alertify.error(response.data.message);
                    return null;
                }
            });
    }
    return (
        <Row>
            <Col md={12}>
                <Card>
                    <CardHeader title="Edit Task Template">
                        <CardHeaderToolbar>
                        </CardHeaderToolbar>
                    </CardHeader>
                    <CardBody>

                        <div className="mt-5">
                            <Form onSubmit={editTaskTemplateHandler}>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control ref={name} defaultValue={taskTemplate.name}
                                                      placeholder="Enter name"/>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>Task No.</Form.Label>
                                        <Form.Control ref={taskno} defaultValue={taskTemplate.taskno}
                                                      placeholder="Enter Task No"/>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Description</Form.Label>

                                        <CKEditor
                                            data={taskTemplate.description}
                                            editor={ClassicEditor}
                                            onChange={(event, editor) => {
                                                setData(editor.getData());
                                            }}
                                            onReady={editor => {
                                                setData(editor.getData());
                                            }}
                                        />
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
            < /Row>
                );
                }