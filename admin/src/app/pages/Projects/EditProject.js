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
export function EditProject(props) {
    const initialState = {
        project: '',
        customer: '',
    };

    const [project, setProject] = useState({});
    const [fields, setFields] = useState(initialState);
    const [users, setUsers] = useState([]);
    const [data, setData] = useState('');

    const title = useRef();
    const description = useRef();
    const address = useRef();
    const date = useRef();
    const customer = useRef();
    const id = props.match.params.id;

    useEffect(() => {
        axios.get(API_URL + 'backend/user/all').then((response) => {

            if (response.data.code === 200) {
                setUsers(response.data.data);
            } else if (response.data.code === 404) {
                alertify.error(response.data.message);
                return null;
            }
        });

        axios.get(API_URL + 'backend/project/' + id).then((response) => {

            if (response.data.code === 200) {
                setFields({customer: response.data.data.customer, image: response.data.data.image});

                setProject(response.data.data);
            } else if (response.data.code === 404) {
                alertify.error(response.data.message);
                return null;
            }
        })
    }, []);

    const handleChange = (e) => {
        setFields({customer: e.target.value});
    }

    const handleImage = (e) => {
        var reader = new FileReader();

        reader.onload = (e) => {
            setProject((currentState) => ({
                ...currentState,
                image: e.target.result
            }));
        };
        reader.readAsDataURL(e.target.files[0]);
    }

    const editProjectHandler = (e) => {

        e.preventDefault();
        axios.post(API_URL + "backend/project/update",
            {
                id: id,
                title: title.current.value,
                description: data,
                address: address.current.value,
                date: date.current.value,
                image: project.image,
                customer: customer.current.value
            }
        )
            .then((response) => {
                if (response.data.code == 200) {
                    alertify.success(response.data.message);
                    props.history.push("/project/all");
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
                    <CardHeader title="Edit Project">
                        <CardHeaderToolbar>
                        </CardHeaderToolbar>
                    </CardHeader>
                    <CardBody>

                        <div className="mt-5">
                            <Form onSubmit={editProjectHandler}>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control ref={title} defaultValue={project.title} placeholder="Enter title"/>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>Date</Form.Label>
                                        <Form.Control type='date' defaultValue={project.date} ref={date} placeholder="Enter date"/>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Customer</Form.Label>
                                        <Form.Control as="select" ref={customer} onChange={handleChange} value={fields.customer}>
                                            <option value="">Select Customer</option>
                                            {users.map((user, key) => (
                                                <option key={user.userid} value={user.userid}>
                                                    {user.username} ({user.firstname} {user.lastname})
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>

                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control ref={address} defaultValue={project.address} placeholder="Enter address"/>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Description</Form.Label>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={project.description}
                                            onChange={(event, editor) => {
                                                 setData(editor.getData());
                                            }}
                                            onReady={editor => {
                                                setData(editor.getData());
                                            }}
                                        />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Image</Form.Label>
                                        <Row>
                                            <Col>
                                                <Form.Control type="file" onChange={handleImage}/>
                                            </Col>
                                            <Col>
                                                {project.image !== '' ? <img width='100' src={project.image}/> : ''}
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