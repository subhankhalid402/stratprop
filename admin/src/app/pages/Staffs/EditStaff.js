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

export function EditStaff(props) {
    const initialState = {
        staff: '',
        status: '',
    };

    const [staff, setStaff] = useState({});
    const [fields, setFields] = useState(initialState);

    const firstname = useRef();
    const lastname = useRef();
    const email = useRef();
    const username = useRef();
    const password = useRef();
    const phone = useRef();
    const status = useRef();
    const id = props.match.params.id;

    useEffect(() => {
        axios.get(API_URL + 'backend/staff/' + id).then((response) => {

            if (response.data.code === 200) {

                setFields({status: response.data.data.status});

                setStaff(response.data.data);
            } else if (response.data.code === 404) {
                alertify.error(response.data.message);
                return null;
            }
        })
    }, []);

    const handleChange = (e) => {
        setFields({status: e.target.value});
    }

    const editStaffHandler = (e) => {

        e.preventDefault();
        axios.post(API_URL + "backend/staff/update",
            {
                id: id,
                firstname: firstname.current.value,
                lastname: lastname.current.value,
                email: email.current.value,
                username: username.current.value,
                password: password.current.value,
                phone: phone.current.value,
                status: status.current.value
            }
        )
            .then((response) => {
                if (response.data.code == 200) {
                    alertify.success(response.data.message);
                    props.history.push("/staff/all");
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
                    <CardHeader title="Edit Staff">
                        <CardHeaderToolbar>
                        </CardHeaderToolbar>
                    </CardHeader>
                    <CardBody>

                        <div className="mt-5">
                            <Form onSubmit={editStaffHandler}>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control ref={firstname} defaultValue={staff.firstname}
                                                      placeholder="Enter first name"/>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control ref={lastname} defaultValue={staff.lastname}
                                                      placeholder="Enter last name"/>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control ref={email} defaultValue={staff.email} placeholder="Enter email"/>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control ref={username} defaultValue={staff.username}
                                                      placeholder="Enter username"/>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Phone</Form.Label>
                                        <Form.Control ref={phone} defaultValue={staff.phone} placeholder="Enter phone"/>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" defaultValue={staff.password} ref={password}
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