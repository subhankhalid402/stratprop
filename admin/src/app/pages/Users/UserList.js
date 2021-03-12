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
import {Card, CardBody, CardHeader, CardHeaderToolbar,} from "../../../_metronic/_partials/controls";
import DataTable from "datatables.net";

import {makeStyles} from '@material-ui/core/styles';
import TelegramIcon from '@material-ui/icons/Telegram';
import BlockIcon from '@material-ui/icons/Block';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles(theme => ({
    root: {
        color: theme.palette.text.primary,
    },
    icon: {
        margin: theme.spacing(1),
        fontSize: 32,
    },
}));

export function UserList(props) {
    const classes = useStyles();
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [show, setShow] = useState(false);
    const [invitationShow, setInvitationShow] = useState(false);
    const history = useHistory()

    const setCurrentUser = (user, index, type) => {
        setUser(user);
        setCurrentIndex(index);

        if (type == 'status')
            setShow(true);
        else if (type == 'invitation')
            setInvitationShow(true);
    };

    const handleClose = () => setShow(false);
    const handleInvitationClose = () => setInvitationShow(false);

    const updateUserStatus = () => {
        axios.post(
            API_URL + 'backend/user/update-status',
            {
                id: user.id,
                status: user.status == 'Active' ? 'Inactive' : 'Active'
            }
        ).then((response) => {
            if (response.data.code == 200) {
                setShow(false);
                history.go(0);
                alertify.success(response.data.message);
            } else if (response.data.code === 404) {
                alertify.error(response.data.message);
                return null;
            }
        })
    }

    const sendUserInvitation = (e) => {
        axios.post(
            API_URL + 'backend/user/send-invitation',
            {
                id: user.id,
            }
        ).then((response) => {
            if (response.data.code == 200) {
                setInvitationShow(false);
                history.go(0);
                alertify.success(response.data.message);
            } else if (response.data.code === 404) {
                alertify.error(response.data.message);
                return null;
            }
        });
    }

    useEffect(() => {

        axios.get(API_URL + 'backend/user/all').then((response) => {

            if (response.data.code == 200) {
                setUsers(response.data.data);
                $(".stratprop_datatable").DataTable();

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
            <Card>
                <CardHeader title="User List">
                    <CardHeaderToolbar>
                        <h3>Total: {users.length}</h3>
                    </CardHeaderToolbar>
                </CardHeader>
                <CardBody>

                    <div className="mt-5">
                        <table id="user_table" className="stratprop_datatable" width="100%">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Username</th>
                                <th>Phone</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {users.length > 0 ? (
                                users.map((user, index) => (
                                    <tr key={user.id}>
                                        <td>{index + 1}</td>
                                        <td>{user.firstname}</td>
                                        <td>{user.lastname}</td>
                                        <td>{user.email}</td>
                                        <td>{user.username}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.status}</td>
                                        <td>

                                            {user.status == 'Active' ?
                                                <a
                                                    onClick={() => setCurrentUser(user, index, 'status')}
                                                    key={index}
                                                    className="btn btn-icon btn-outline-danger btn-hover-danger  btn-sm mr-2">
                                                    <span className="svg-icon svg-icon-lg svg-icon-danger">
                                                        <BlockIcon className={classes.icon}/>
                                                     </span>
                                                </a>
                                                :
                                                <a
                                                    onClick={() => setCurrentUser(user, index, 'status')}
                                                    key={index}
                                                    className="btn btn-icon btn-outline-primary  btn-hover-primary  btn-sm mr-2">
                                                    <span className="svg-icon svg-icon-lg svg-icon-primary">
                                                        <CheckIcon className={classes.icon}/>
                                                     </span>
                                                </a>

                                            }

                                            <Link to={`/user/detail/${user.id}`}
                                                  className="btn btn-icon btn-outline-info btn-hover-info  btn-sm mr-2">
		            		                <span className="svg-icon svg-icon-md svg-icon-info "><SVG
                                                src={toAbsoluteUrl("/media/svg/icons/General/Visible.svg")}
                                            /></span>
                                            </Link>
                                            <Link to={`/user/edit/${user.id}`}
                                                  className="btn btn-icon btn-outline-success  btn-sm mr-2">
                                                <span className="svg-icon svg-icon-lg svg-icon-primary"><EditIcon
                                                    className={classes.icon}/></span>
                                            </Link>
                                            <a
                                                onClick={() => setCurrentUser(user, index, 'invitation')}
                                                key={index}
                                                className="btn btn-icon btn-outline-warning btn-hover-warning  btn-sm mr-2">
                                                    <span className="svg-icon svg-icon-lg svg-icon-warning">
                                                        <TelegramIcon
                                                            className={classes.icon}/>
                                                     </span>
                                            </a>

                                        </td>
                                        {/*}
		            <td>

		            	<a
		            	onClick={() => setCurrentUser(user, index)}
                		key={index}
                		className="btn btn-icon btn-light btn-hover-danger btn-sm mr-2">
		            		<span className="svg-icon svg-icon-md svg-icon-danger">
					          <SVG src={toAbsoluteUrl("/media/svg/icons/General/Trash.svg")} />
					        </span>
		            	</a>

		            </td>
		            {*/}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7}>No User</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Change User Status</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Are you sure you want to change the status?</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={updateUserStatus}>
                                    Save Changes
                                </Button>
                            </Modal.Footer>
                        </Modal>


                        <Modal show={invitationShow} onHide={handleInvitationClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Send Invitation</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Are you sure you send invitation again?</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleInvitationClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={sendUserInvitation}>
                                    Save Changes
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>

                </CardBody>
            </Card>
        </>
    )
}