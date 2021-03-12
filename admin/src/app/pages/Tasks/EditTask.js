import React, {useEffect, useState, useRef} from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import alertify from "alertifyjs";
import {API_URL} from '../constants.js';

import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import {
    Card,
    CardBody,
    CardHeader,
    CardHeaderToolbar,
} from "../../../_metronic/_partials/controls";

export function EditTask(props) {
    const initialState = {
        task: '',
        status: '',
    };

    const [task, setTask] = useState({});
    const [fields, setFields] = useState(initialState);
    const [data, setData] = useState('');
    const name = useRef();
    const status = useRef();
    const description = useRef();

    const id = props.match.params.id;
    const project_id = props.match.params.project_id;


    useEffect(() => {
        axios.get(API_URL + 'backend/task/' + id).then((response) => {

            if (response.data.code === 200) {
                response.data.data.status = response.data.data.status * 20;
                setTask(response.data.data);
            } else if (response.data.code === 404) {
                alertify.error(response.data.message);
                return null;
            }
        })
    }, []);

    const editTaskHandler = (e) => {

        e.preventDefault();
        axios.post(API_URL + "backend/task/update",
            {
                id: id,
                name: name.current.value,
                status: status.current.value,
                description: data,
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
            });
    }
    return (
        <Row>
            <Col md={12}>
                <Card>
                    <CardHeader title="Edit Task ">
                        <CardHeaderToolbar>
                        </CardHeaderToolbar>
                    </CardHeader>
                    <CardBody>

                        <div className="mt-5">
                            <Form onSubmit={editTaskHandler}>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control ref={name} defaultValue={task.name}
                                                      placeholder="Enter name"/>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>Progress.</Form.Label>
                                        <Form.Control ref={status} defaultValue={task.status}
                                                      placeholder="Progress (% - 0/20/40/60/80/100)"/>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Description</Form.Label>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={task.description}
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