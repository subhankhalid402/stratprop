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
export function CreateProject(props) {

    const title = useRef();
    const address = useRef();
    const description = useRef();
    const email = useRef();
    const date = useRef();
    const customer = useRef();

    const [image, setImage] = useState('');
    const [users, setUsers] = useState([]);
    const [data, setData] = useState('');

    useEffect(() => {
        axios.get(API_URL + 'backend/user/all').then((response) => {

            if (response.data.code === 200) {
                setUsers(response.data.data);
            } else if (response.data.code === 404) {
                alertify.error(response.data.message);
                return null;
            }
        });
    }, []);

    const createProjectHandler = (e) => {

        e.preventDefault();
        axios.post(API_URL + "backend/project/create",
            {
                title: title.current.value,
                date: date.current.value,
                description: data,
                customer: customer.current.value,
                address: address.current.value,
                customer: customer.current.value,
                image: image
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
            })
            .catch((error) => {

                if (error.message === 'Request failed with status code 401') {
                    //props.logout();
                }
            });
    }

    const handleImage = (e) => {
        var reader = new FileReader();
        reader.onload = (e) => {
            //e.target.result;
            setImage(e.target.result);
        };
        reader.readAsDataURL(e.target.files[0]);
    }

    return (
        <Row>
            <Col md={12}>
                <Card>
                    <CardHeader title="Add New Project">
                        <CardHeaderToolbar>

                        </CardHeaderToolbar>
                    </CardHeader>
                    <CardBody>

                        <div className="mt-5">
                            <Form onSubmit={createProjectHandler}>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control ref={title} placeholder="Enter title"/>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>Date</Form.Label>
                                        <Form.Control type='date' ref={date} placeholder="Enter date"/>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Customer</Form.Label>
                                        <Form.Control as="select" ref={customer}>
                                            <option value="">Select Customer</option>
                                            {users.map((user, key) => (
                                                <option key={user.userid} value={user.userid}>
                                                    {user.username} ({user.firstname} {user.lastname})
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>
                                            Customer Email
                                            <small>(email will be sent to this address)</small>
                                        </Form.Label>
                                        <Form.Control ref={email} type='email'
                                                      placeholder="Enter description"/>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control ref={address} placeholder="Enter address"/>
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
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Image</Form.Label>
                                        <Row>
                                            <Col>
                                                <Form.Control type="file" onChange={handleImage}/>
                                            </Col>
                                            <Col>
                                                {image !== '' ? <img width='100' src={image}/> : ''}
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