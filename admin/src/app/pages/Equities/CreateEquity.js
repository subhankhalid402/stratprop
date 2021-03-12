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

export function CreateEquity(props) {

    const amount = useRef();
    const cashflow = useRef();
    const date = useRef();

    const project_id = props.match.params.project_id;

    const [pdf, setPdf] = useState('');
    const [users, setUsers] = useState([]);

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

    const createEquityHandler = (e) => {

        e.preventDefault();
        axios.post(API_URL + "backend/equity/create",
            {
                project_id: project_id,
                date: date.current.value,
                amount: amount.current.value,
                cashflow: cashflow.current.value,
                pdf: pdf
            }
        )
            .then((response) => {
                if (response.data.code == 200) {
                    alertify.success(response.data.message);

                    props.history.push("/equity/all/" + project_id);
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

    const handlePdf = (e) => {
        var reader = new FileReader();
        reader.onload = (e) => {
            //e.target.result;
        };
        setPdf(e.target.result);
        reader.readAsDataURL(e.target.files[0]);
    }

    return (
        <Row>
            <Col md={12}>
                <Card>
                    <CardHeader title="Add New Equity & Cashflow">
                        <CardHeaderToolbar>

                        </CardHeaderToolbar>
                    </CardHeader>
                    <CardBody>

                        <div className="mt-5">
                            <Form onSubmit={createEquityHandler}>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Date</Form.Label>
                                        <Form.Control type='date' ref={date} placeholder="Enter date"/>
                                    </Form.Group>

                                    <Form.Group as={Col}>
                                        <Form.Label>Pdf</Form.Label>
                                        <Row>
                                            <Col>
                                                <Form.Control type="file" onChange={handlePdf}/>
                                            </Col>
                                            <Col>
                                                {pdf !== '' ? <img width='100' src={pdf}/> : ''}
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Equity Amount</Form.Label>
                                        <Form.Control ref={amount} placeholder="Enter equity"/>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>Casflow</Form.Label>
                                        <Form.Control ref={cashflow} placeholder="Enter cashflow"/>
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