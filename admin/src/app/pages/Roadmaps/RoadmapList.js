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

export function RoadmapList(props, {id}) {

    const [roadmaps, setRoadmaps] = useState([]);
    const [roadmap, setRoadmap] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [show, setShow] = useState(false);
    const history = useHistory()

    const setCurrentRoadmap = (roadmap, index) => {
        setRoadmap(roadmap);
        setCurrentIndex(index);
        setShow(true);
    };

    const handleClose = () => setShow(false);

    const deleteRoadmap = () => {
        axios.post(
            API_URL + 'backend/roadmap/delete',
            {id: roadmap.id}
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
        const url = API_URL + 'backend/roadmap/all' + ( id ? '/' + id : '');
        axios.get(url).then((response) => {

            if (response.data.code === 200) {

                setRoadmaps(response.data.data);

                $("#roadmap_table").DataTable();
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

    }, []);

    return (
        <>
            <table id="roadmap_table" className="stratprop_datatable">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Deposit</th>
                    <th>Target Yield</th>
                    <th>Deposit</th>
                    <th>Target Growth</th>
                    <th>Buy Range</th>
                    <th>Recycle Growth</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {roadmaps.length > 0 ? (
                    roadmaps.map((roadmap, index) => (
                        <tr key={roadmap.id}>
                            <td>{index + 1}</td>
                            <td>{roadmap.first_property}</td>
                            <td>{roadmap.target_yield}</td>
                            <td>{roadmap.deposit}</td>
                            <td>{roadmap.taget_growth}</td>
                            <td>{roadmap.buy_range}</td>
                            <td>{roadmap.recycle_rate}</td>

                            <td>
                                <Link to={`/roadmap/edit/${roadmap.id}`}
                                      className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3">
		            		<span className="svg-icon svg-icon-md svg-icon-primary">
					          <SVG
                                  src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}
                              />
					        </span>
                                </Link>
                                <a
                                    onClick={() => setCurrentRoadmap(roadmap, index)}
                                    key={index}
                                    className="btn btn-icon btn-light btn-hover-danger btn-sm">
		            		<span className="svg-icon svg-icon-md svg-icon-danger">
					          <SVG src={toAbsoluteUrl("/media/svg/icons/General/Trash.svg")}/>
					        </span>
                                </a>

                            </td>

                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={6}>No Roadmap</td>
                    </tr>
                )}
                </tbody>
            </table>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Roadmap</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to Delete?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={deleteRoadmap}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}