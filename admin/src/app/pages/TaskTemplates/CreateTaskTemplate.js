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

import {Card, CardBody, CardHeader, CardHeaderToolbar,} from "../../../_metronic/_partials/controls";

export function CreateTaskTemplate(props) {

    const name = useRef();
    const taskno = useRef();
    const description = useRef();

    const [data, setData] = useState('');

    const createTaskTemplateHandler = (e) => {

        e.preventDefault();
        axios.post(API_URL + "backend/task-template/create",
            {
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
            })
            .catch((error) => {

                if (error.message === 'Request failed with status code 401') {
                    this.props.logout();
                }
            });
    }
    return (
        <Row>
            <Col md={12}>
                <Card>
                    <CardHeader title="Add New Task Template">
                        <CardHeaderToolbar>

                        </CardHeaderToolbar>
                    </CardHeader>
                    <CardBody>

                        <div className="mt-5">
                            <Form onSubmit={createTaskTemplateHandler}>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control ref={name} placeholder="Enter name"/>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>Task No.</Form.Label>
                                        <Form.Control ref={taskno} placeholder="Enter Task No"/>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Description</Form.Label>
                                        <CKEditor
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
        </Row>
    );
}