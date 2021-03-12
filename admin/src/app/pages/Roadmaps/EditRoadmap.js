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

export function EditRoadmap(props) {
    const initialState = {
        roadmap: '',
        user_id: '',
    };

    const [roadmap, setRoadmap] = useState({});
    const [fields, setFields] = useState(initialState);
    const [users, setUsers] = useState([]);

    const first_property = useRef();
    const target_yield = useRef();
    const deposit = useRef();
    const taget_growth = useRef();
    const buy_range = useRef();
    const recycle_rate = useRef();
    const user_id = useRef();
    const id = props.match.params.id;

    useEffect(() => {
        axios.get(API_URL + 'backend/roadmap/' + id).then((response) => {

            if (response.data.code === 200) {

                setFields({user_id: response.data.data.user_id});

                setRoadmap(response.data.data);
            } else if (response.data.code === 404) {
                alertify.error(response.data.message);
                return null;
            }
        });

        axios.get(API_URL + 'backend/user/all').then((response) => {

            if (response.data.code === 200) {
                setUsers(response.data.data);
                setFields({user_id: response.data.data.user_id});
            } else if (response.data.code === 404) {
                alertify.error(response.data.message);
                return null;
            }
        });
    }, []);
    
    const handleChange = (e) => {
        setFields({user_id: e.target.value});
    }

    const editRoadmapHandler = (e) => {

        e.preventDefault();
        axios.post(API_URL + "backend/roadmap/update",
            {
                id: id,
                first_property: first_property.current.value,
                target_yield: target_yield.current.value,
                deposit: deposit.current.value,
                taget_growth: taget_growth.current.value,
                buy_range: buy_range.current.value,
                recycle_rate: recycle_rate.current.value,
                user_id: user_id.current.value
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
            });
    }
    return (
        <Row>
            <Col md={12}>
                <Card>
                    <CardHeader title="Edit Roadmap">
                        <CardHeaderToolbar>
                        </CardHeaderToolbar>
                    </CardHeader>
                    <CardBody>

                        <div className="mt-5">
                            <Form onSubmit={editRoadmapHandler}>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>First Property</Form.Label>
                                        <Form.Control ref={first_property} defaultValue={roadmap.first_property}
                                                      placeholder="Enter first property"/>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>Target Yield</Form.Label>
                                        <Form.Control ref={target_yield} defaultValue={roadmap.target_yield}
                                                      placeholder="Enter target yield"/>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Deposit</Form.Label>
                                        <Form.Control ref={deposit} defaultValue={roadmap.deposit}
                                                      placeholder="Enter deposit"/>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>Target Growth</Form.Label>
                                        <Form.Control ref={taget_growth} defaultValue={roadmap.taget_growth}
                                                      placeholder="Enter taget growth"/>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Recycle Rate</Form.Label>
                                        <Form.Control ref={recycle_rate} defaultValue={roadmap.recycle_rate}
                                                      placeholder="Enter recycle rate"/>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>Buy Range</Form.Label>
                                        <Form.Control defaultValue={roadmap.buy_range} ref={buy_range}
                                                      placeholder="Enter buy range"/>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>

                                    <Form.Group as={Col}>
                                        <Form.Label>Customer</Form.Label>
                                        <Form.Control as="select" ref={user_id} onChange={handleChange}>
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