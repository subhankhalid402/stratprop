import React, {useEffect, useState, useRef} from "react";
import axios from "axios";
import $ from "jquery";
import {useHistory} from 'react-router';
import alertify from "alertifyjs";
import {API_URL} from '../constants.js';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import TabPane from 'react-bootstrap/TabPane';
import TabContent from 'react-bootstrap/TabContent';
import TabContainer from 'react-bootstrap/TabContainer';
import ListGroup from 'react-bootstrap/ListGroup';
import {makeStyles} from '@material-ui/core/styles';
import ProgressBar from 'react-bootstrap/ProgressBar';
import {toAbsoluteUrl} from "../../../_metronic/_helpers";
import SVG from "react-inlinesvg";
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import {Link} from "react-router-dom";
import DataTable from "datatables.net";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import Divider from '@material-ui/core/Divider';


import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextFieldsIcon from '@material-ui/icons/TextFields';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Card, CardBody, CardHeader, CardHeaderToolbar,} from "../../../_metronic/_partials/controls";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));


export function Equities(props) {

    const equity_target = useRef();
    const cashflow_target = useRef();

    const project_id = props.match.params.project_id;

    const [project, setProject] = useState({
        pdfs: [],
        equitynotes: [],
        equities: [],
        last_equity: {}
    });
    const [tasks, setTasks] = useState([]);
    const history = useHistory();

    const [task, setTask] = useState([]);
    const [currentTaskIndex, setTaskCurrentIndex] = useState(-1);
    const [taskShow, setTaskShow] = useState(false);

    const handleTaskClose = () => setTaskShow(false);

    const editProjectHandler = (e) => {

        e.preventDefault();
        axios.post(API_URL + "backend/project/set-target",
            {
                id: project_id,
                equity_target: equity_target.current.value,
                cashflow_target: cashflow_target.current.value,
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
            });
    }

    const setCurrentTask = (task, index) => {
        setTask(task);
        setTaskCurrentIndex(index);
        setTaskShow(true);
    };

    const deleteTask = () => {
        axios.post(
            API_URL + 'backend/task/delete',
            {id: task.id}
        ).then((response) => {
            if (response.data.code == 200) {
                history.go(0);
                setTaskShow(false);
                alertify.success(response.data.message);
            } else if (response.data.code === 404) {
                alertify.error(response.data.message);
                return null;
            }
        })
    }

    useEffect(() => {

        axios.get(API_URL + 'backend/project/' + project_id).then((response) => {

            if (response.data.code === 200) {
                setProject(response.data.data);
                $("#equity_table").DataTable();
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

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <>
            <Row>
                <Col md={12}>
                    <Card>
                        <CardHeader title={`${project.title} - (${project.date})`}>
                            <CardHeaderToolbar>

                            </CardHeaderToolbar>
                        </CardHeader>
                        <CardBody>
                            <Row key={project.id}>
                                <Col md={12}>
                                    <Card className={`projects project-detail`}>
                                        <CardHeader title="Equity & Cashflow">
                                            <CardHeaderToolbar>
                                                <Link to={`/equity/create/${project.id}`} className="btn btn-primary">Add
                                                    New</Link>
                                            </CardHeaderToolbar>
                                        </CardHeader>
                                        <CardBody>
                                            <Row>
                                                <Col md={2}>
                                                    <img src={project.image} width={'100px'}/>
                                                </Col>
                                                <Col md={3}>
                                                    <p>
                                                        <strong>Address: </strong>
                                                        <span>{project.address}</span>
                                                    </p>
                                                    <p>
                                                        <strong>Equity: </strong>
                                                        <span>{project.total_equity}$</span>
                                                    </p>
                                                    <p>
                                                        <strong>Last Udpate: </strong>
                                                        <span>{project.last_equity ? project.last_equity.inserton : ''}</span>
                                                    </p>
                                                </Col>
                                                <Col md={7}>
                                                    <Card className={`task-files`}>
                                                        <CardHeader title="Set Target">
                                                            <CardHeaderToolbar>

                                                            </CardHeaderToolbar>
                                                        </CardHeader>
                                                        <CardBody>

                                                            <div className="mt-5">
                                                                <Form onSubmit={editProjectHandler}>
                                                                    <Form.Row>
                                                                        <Form.Group as={Col}>
                                                                            <Form.Label>Equity Target</Form.Label>
                                                                            <Form.Control ref={equity_target} defaultValue={project.equity_target}
                                                                                          placeholder="Enter equity"/>
                                                                        </Form.Group>
                                                                        <Form.Group as={Col}>
                                                                            <Form.Label>Casflow Target</Form.Label>
                                                                            <Form.Control ref={cashflow_target} defaultValue={project.cashflow_target}
                                                                                          placeholder="Enter cashflow"/>
                                                                        </Form.Group>
                                                                    </Form.Row>
                                                                    <Button variant="primary" className="float-right"
                                                                            type="submit">
                                                                        Save
                                                                    </Button>
                                                                </Form>

                                                            </div>

                                                        </CardBody>
                                                    </Card>
                                                </Col>
                                            </Row>

                                            <Row>

                                                <Col md={6}>
                                                    <Card className={`mt-4 task-files`}>
                                                        <CardHeader title="Files">
                                                            <CardHeaderToolbar>

                                                            </CardHeaderToolbar>
                                                        </CardHeader>
                                                        <CardBody>
                                                            <List className={classes.root}>
                                                                {
                                                                    project.pdfs.map((pdf, index) => {
                                                                            return (
                                                                                <>
                                                                                    <a href={pdf.url}
                                                                                       target="_blank">
                                                                                        <ListItem>
                                                                                            <ListItemAvatar>
                                                                                                <Avatar>
                                                                                                    <InsertDriveFileIcon/>
                                                                                                </Avatar>
                                                                                            </ListItemAvatar>
                                                                                            <ListItemText
                                                                                                primary={pdf.pdf}
                                                                                                secondary={pdf.inserton}/>
                                                                                        </ListItem>
                                                                                        <Divider
                                                                                            variant="inset"
                                                                                            component="li"/>
                                                                                    </a>
                                                                                </>
                                                                            )
                                                                        }
                                                                    )
                                                                }
                                                            </List>
                                                        </CardBody>
                                                    </Card>
                                                    <Card className={`mt-4 task-files`}>
                                                        <CardHeader title="Equities">
                                                            <CardHeaderToolbar>

                                                            </CardHeaderToolbar>
                                                        </CardHeader>
                                                        <CardBody>
                                                            <List className={classes.root}>
                                                                <table id="equity_table"
                                                                       className="stratprop_datatable">
                                                                    <thead>
                                                                    <tr>
                                                                        <th>#</th>
                                                                        <th>Date</th>
                                                                        <th>Amount</th>
                                                                        <th>Added By</th>
                                                                        <th>Actions</th>
                                                                    </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                    {project.equities.length > 0 ? (
                                                                        project.equities.map((equity, index) => (
                                                                            <tr key={equity.id}>
                                                                                <td>{index + 1}</td>
                                                                                <td>{equity.date}</td>
                                                                                <td>{equity.amount}</td>
                                                                                <td>{equity.insertby_user.firstname}</td>
                                                                                <td>
                                                                                    <a

                                                                                        key={index}
                                                                                        className="btn btn-icon btn-light btn-hover-danger btn-sm">
                                                                                <span
                                                                                    className="svg-icon svg-icon-md svg-icon-danger">
                                                                                    <SVG
                                                                                        src={toAbsoluteUrl("/media/svg/icons/General/Trash.svg")}/>
                                                                                </span>
                                                                                    </a>

                                                                                </td>

                                                                            </tr>
                                                                        ))
                                                                    ) : (
                                                                        <tr>
                                                                            <td colSpan={6}>No Equity
                                                                            </td>
                                                                        </tr>
                                                                    )}
                                                                    </tbody>
                                                                </table>


                                                            </List>
                                                        </CardBody>
                                                    </Card>
                                                </Col>
                                                <Col md={6}>
                                                    <Card className={`mt-4 task-files`}>
                                                        <CardHeader title="Notes">
                                                            <CardHeaderToolbar>
                                                                <Link
                                                                    to={`/equitynotes/create/${project.id}`}
                                                                    className="btn btn-primary">+
                                                                    Add New</Link>
                                                            </CardHeaderToolbar>
                                                        </CardHeader>
                                                        <CardBody>
                                                            <List className={classes.root}>
                                                                {
                                                                    project.equitynotes.map((equitynote, index) => {
                                                                            return (
                                                                                <>
                                                                                    <Card className={`mt-4 equitynotes`}>
                                                                                        <CardHeader
                                                                                            title={equitynote.insertby_user.firstname}>
                                                                                            <CardHeaderToolbar>
                                                                                                {equitynote.inserton}
                                                                                            </CardHeaderToolbar>
                                                                                        </CardHeader>
                                                                                        <CardBody>
                                                                                            <div
                                                                                                dangerouslySetInnerHTML={{__html: equitynote.note}}/>
                                                                                        </CardBody>
                                                                                    </Card>
                                                                                </>
                                                                            )
                                                                        }
                                                                    )
                                                                }

                                                            </List>
                                                        </CardBody>
                                                    </Card>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
                <
                    /Row>


                    {/*Task Delete Modal*/
                    }
                    <Modal show={taskShow} onHide={handleTaskClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Delete Task</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Are you sure you want to Delete?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleTaskClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={deleteTask}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    < />
                    )
                    }