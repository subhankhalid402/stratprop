import React, {useEffect, useState} from "react";
import axios from "axios";
import $ from "jquery";
import {Link} from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {useHistory} from 'react-router';
import {toAbsoluteUrl} from "../../../_metronic/_helpers";
import SVG from "react-inlinesvg";
import alertify from "alertifyjs";
import {API_URL} from '../constants.js';
import DataTable from "datatables.net";
import {Card, CardBody, CardHeader, CardHeaderToolbar,} from "../../../_metronic/_partials/controls";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export function PortfolioList(props) {
    const [portfolios, setPortfolios] = useState([]);
    const [portfolio, setPortfolio] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [show, setShow] = useState(false);
    const history = useHistory()

    const setCurrentPortfolio = (portfolio, index) => {
        setPortfolio(portfolio);
        setCurrentIndex(index);
        setShow(true);

    };

    const handleClose = () => setShow(false);

    const deletePortfolio = () => {
        axios.post(
            API_URL + 'backend/project/delete',
            {id: portfolio.id}
        ).then((response) => {
            if (response.data.code == 200) {
                history.go(0);
                setShow(false);
                alertify.success(response.data.message);
            } else if (response.data.code === 404) {
                alertify.error(response.data.message);
                return null;
            }
        })
    }

    useEffect(() => {

        axios.get(API_URL + 'backend/portfolio/all').then((response) => {

            if (response.data.code === 200) {

                setPortfolios(response.data.data);
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

    }, []);

    return (
        <>
            {portfolios.length > 0 ? (
                portfolios.map((portfolio, index) => (

                    <Row key={portfolio.id}>
                        <Col md={12}>
                            <Card className={`portfolios`}>
                                <CardHeader title={`${portfolio.title} - (${portfolio.date})`}>
                                    <CardHeaderToolbar>
                                        <Link to={`/project/detail/${portfolio.id}`}
                                                  className="btn btn-icon btn-light btn-hover-success  btn-sm">
		            		                <span className="svg-icon svg-icon-md svg-icon-success "><SVG
                                                src={toAbsoluteUrl("/media/svg/icons/General/Visible.svg")}
                                            /></span>
                                            </Link>
                                        <Link to={`/project/edit/${portfolio.id}`}
                                              className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3">
                                                <span className="svg-icon svg-icon-md svg-icon-primary"><SVG
                                                    src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}/></span>
                                        </Link>
                                        <a
                                            onClick={() => setCurrentPortfolio(portfolio, index)}
                                            key={index}
                                            className="btn btn-icon btn-light btn-hover-danger btn-sm">
													<span className="svg-icon svg-icon-md svg-icon-danger">
													  <SVG src={toAbsoluteUrl("/media/svg/icons/General/Trash.svg")}/>
													</span>
                                        </a>
                                    </CardHeaderToolbar>
                                </CardHeader>
                                <CardBody>
                                    <div dangerouslySetInnerHTML={{__html:portfolio.description}} />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                ))
            ) : (
                <p>No Portfolio</p>
            )}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Portfolio</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to Delete?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={deletePortfolio}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}