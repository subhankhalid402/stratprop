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

export function StaffList(props) {
    const [staffs, setStaffs] = useState([]);
    const [staff, setStaff] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [show, setShow] = useState(false);
    const history = useHistory()

    const setCurrentStaff = (staff, index) => {
        setStaff(staff);
        setCurrentIndex(index);
        setShow(true);

    };

    const handleClose = () => setShow(false);

    const deleteStaff = () => {
        axios.post(
            API_URL + 'backend/staff/delete',
            {id: staff.id}
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

        axios.get(API_URL + 'backend/staff/all').then((response) => {

            if (response.data.code === 200) {

                setStaffs(response.data.data);

                $("#staff_table").DataTable();
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
            <table id="staff_table" className="stratprop_datatable">
                <thead>
                <tr>
                    <th>SR#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Username</th>
                    <th>Phone</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {staffs.length > 0 ? (
                    staffs.map((staff, index) => (
                        <tr key={staff.id}>
                            <td>{index + 1}</td>
                            <td>{staff.firstname}</td>
                            <td>{staff.lastname}</td>
                            <td>{staff.email}</td>
                            <td>{staff.username}</td>
                            <td>{staff.phone}</td>

                            <td>
                                <Link to={`/staff/edit/${staff.id}`}
                                      className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3">
		            		<span className="svg-icon svg-icon-md svg-icon-primary">
					          <SVG
                                  src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}
                              />
					        </span>
                                </Link>
                                <a
                                    onClick={() => setCurrentStaff(staff, index)}
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
                        <td colSpan={6}>No Staff</td>
                    </tr>
                )}
                </tbody>
            </table>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Staff</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to Delete?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={deleteStaff}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}