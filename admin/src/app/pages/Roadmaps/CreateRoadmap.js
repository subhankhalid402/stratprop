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

export function CreateRoadmap(props) {

    const id = props.match.params.id;

    const first_property = useRef();
    const target_yield = useRef();
    const deposit = useRef();
    const taget_growth = useRef();
    const buy_range = useRef();
    const recycle_rate = useRef();
    const user_id = useRef();

    const [users, setUsers] = useState([]);

    const createRoadmapHandler = (e) => {

        e.preventDefault();
        axios.post(API_URL + "backend/roadmap/create",
            {
                first_property: first_property.current.value,
                target_yield: target_yield.current.value,
                deposit: deposit.current.value,
                taget_growth: taget_growth.current.value,
                buy_range: buy_range.current.value,
                recycle_rate: recycle_rate.current.value,
                user_id: id ? id : user_id.current.value
            }
        )
            .then((response) => {
                if (response.data.code == 200) {
                    alertify.success(response.data.message);

                    props.history.push("/roadmap/all");
                } else if (response.data.code === 404) {
                    alertify.error(response.data.message);
                    return null;
                }
            })
            .catch((error) => {

                if (error.message === 'Request failed with user_id code 401') {
                    //props.logout();
                }
            });
    }

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

    return (
        <Row>
            <Col md={12}>
                <Card>
                    <CardHeader title="Add New Roadmap">
                        <CardHeaderToolbar>

                        </CardHeaderToolbar>
                    </CardHeader>
                    <CardBody>

                        <div className="mt-5">
                            <Form onSubmit={createRoadmapHandler}>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>First Property</Form.Label>
                                        <Form.Control ref={first_property} placeholder="Enter first property"/>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>Target Yield</Form.Label>
                                        <Form.Control ref={target_yield} placeholder="Enter target yeild"/>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Deposit</Form.Label>
                                        <Form.Control ref={deposit} placeholder="Enter deposit"/>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>Target Growth</Form.Label>
                                        <Form.Control ref={taget_growth} placeholder="Enter taget growth"/>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Recycle Rate</Form.Label>
                                        <Form.Control ref={recycle_rate} placeholder="Enter recycle rate"/>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>Buy Range</Form.Label>
                                        <Form.Control ref={buy_range} placeholder="Enter buy range"/>
                                    </Form.Group>
                                </Form.Row>
                                {!id ?
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <Form.Label>Customer</Form.Label>
                                            <Form.Control as="select" ref={user_id}>
                                                <option value="">Select Customer</option>
                                                {users.map((user, key) => (
                                                    <option key={user.id} value={user.id}>
                                                        {user.username} ({user.firstname} {user.lastname})
                                                    </option>
                                                ))}
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                        </Form.Group>
                                    </Form.Row>
                                    : <></>
                                }
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