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

export function EditUser(props) {
    const initialState = {
        user: '',
        status: '',
    };

    const [user, setUser] = useState({});
    const [fields, setFields] = useState(initialState);

    const firstname = useRef();
    const lastname = useRef();
    const email = useRef();
    const username = useRef();
    const password = useRef();
    const phone = useRef();
    const status = useRef();
    const video = useRef();
    const max_purchase_amount = useRef();
    const deposit_amount = useRef();
    const id = props.match.params.id;

    useEffect(() => {
        axios.get(API_URL + 'backend/user/' + id).then((response) => {

            if (response.data.code === 200) {

                setFields({status: response.data.data.status});

                setUser(response.data.data);
            } else if (response.data.code === 404) {
                alertify.error(response.data.message);
                return null;
            }
        })
    }, []);

    const handleChange = (e) => {
        setFields({status: e.target.value});
    }

    const editUserHandler = (e) => {

        e.preventDefault();
        axios.post(API_URL + "backend/user/update",
            {
                id: id,
                firstname: firstname.current.value,
                lastname: lastname.current.value,
                email: email.current.value,
                username: username.current.value,
                password: password.current.value,
                phone: phone.current.value,
                status: status.current.value,
                video: video.current.value,
                deposit_amount: deposit_amount.current.value,
                max_purchase_amount: max_purchase_amount.current.value,
            }
        )
            .then((response) => {
                if (response.data.code == 200) {
                    alertify.success(response.data.message);
                    props.history.push("/user/all");
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
                    <CardHeader title="Edit User">
                        <CardHeaderToolbar>
                        </CardHeaderToolbar>
                    </CardHeader>
                    <CardBody>

                        <div className="mt-5">
                            <Form onSubmit={editUserHandler}>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control ref={firstname} defaultValue={user.firstname}
                                                      placeholder="Enter first name"/>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control ref={lastname} defaultValue={user.lastname}
                                                      placeholder="Enter last name"/>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control ref={email} defaultValue={user.email} placeholder="Enter email"/>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control ref={username} defaultValue={user.username}
                                                      placeholder="Enter username"/>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Phone</Form.Label>
                                        <Form.Control ref={phone} defaultValue={user.phone} placeholder="Enter phone"/>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" defaultValue={user.password} ref={password}
                                                      placeholder="Enter password"/>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>

                                    <Form.Group as={Col}>
                                        <Form.Label>Status</Form.Label>
                                        <Form.Control as="select" ref={status} onChange={handleChange}
                                                      value={fields.status}>
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                            <option value="Email">Email</option>
                                            <option value="Review">Review</option>

                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>Video URL</Form.Label>
                                        <Form.Control ref={video} defaultValue={user.video} placeholder="Enter video url"/>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Deposit Amount</Form.Label>
                                        <Form.Control ref={deposit_amount} defaultValue={user.deposit_amount} placeholder="Enter deposit amount"/>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>Max Purchase Amount</Form.Label>
                                        <Form.Control ref={max_purchase_amount} defaultValue={user.max_purchase_amount} placeholder="Enter max purchase amount"/>
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