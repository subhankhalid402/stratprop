import React, {useEffect, useState} from "react";
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
import Button from 'react-bootstrap/Button';
import {Card, CardBody, CardHeader, CardHeaderToolbar,} from "../../../_metronic/_partials/controls";

import {Chat} from '../Chat/Chat';

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


export function ProjectDetail(props) {

    const [project, setProject] = useState({});
    const [tasks, setTasks] = useState([]);
    const history = useHistory();

    const [task, setTask] = useState([]);
    const [currentTaskIndex, setTaskCurrentIndex] = useState(-1);
    const [taskShow, setTaskShow] = useState(false);
    const [projectShow, setProjectShow] = useState(false);

    const handleTaskClose = () => setTaskShow(false);
    const handleProjectClose = () => setProjectShow(false);

    const moveToPortfolio = (e) => {
        e.preventDefault()
        axios.post(API_URL + "backend/project/move-to-portfolio",
            {
                id: id,
                type: 'portfolio'
            }
        )
            .then((response) => {
                if (response.data.code == 200) {
                    alertify.success(response.data.message);
                    history.go(0);
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

    const id = props.match.params.id;

    useEffect(() => {

        axios.get(API_URL + 'backend/project/' + id).then((response) => {

            if (response.data.code === 200) {
                setProject(response.data.data);
                setTasks(response.data.data.tasks);
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
                        {project.type == 'project' ?
                            <CardHeader title="Project Detail">
                                <CardHeaderToolbar>
                                    <Link to={`/task/create/${project.id}`} className="btn btn-primary mr-3">Add New
                                        Task</Link>
                                    <a
                                        onClick={() => setProjectShow(true)}
                                        key={'move-to-portfolio'}
                                        className="btn btn-primary">
													<span className="">
                                                        Move To Portfolio
													</span>
                                    </a>
                                </CardHeaderToolbar>
                            </CardHeader>
                            :
                            <CardHeader title="Portfolio Detail">
                                <CardHeaderToolbar>
                                    <Link to={`/equity/all/${project.id}`}
                                          className="btn btn-primary mr-3">Equities</Link>
                                </CardHeaderToolbar>
                            </CardHeader>
                        }

                        <CardBody>
                            <Row key={project.id}>
                                <Col md={6}>
                                    <Card className={`projects project-detail`}>
                                        <CardHeader title={`${project.title} - (${project.date})`}>
                                            <CardHeaderToolbar>

                                            </CardHeaderToolbar>
                                        </CardHeader>
                                        <CardBody>
                                            <div className={classes.root}>
                                                {tasks.length > 0 ? (
                                                    tasks.map((task, index) => (
                                                        <ExpansionPanel expanded={expanded === `panel-${task.id}`}
                                                                        onChange={handleChange(`panel-${task.id}`)}>
                                                            <ExpansionPanelSummary
                                                                expandIcon={<ExpandMoreIcon/>}
                                                                aria-controls={`${task.id}bh-content`}
                                                                id={`${task.id}bh-header`}
                                                            >
                                                                <Typography
                                                                    className={classes.heading}>{task.name}</Typography>
                                                                <Typography className={classes.secondaryHeading}>
                                                                    <ProgressBar
                                                                        now={task.status * 20}
                                                                        label={`${task.status * 20}%`}/>
                                                                </Typography>
                                                                <Typography className={'task-action'}>
                                                                    <Link to={`/task/edit/${project.id}/${task.id}`}
                                                                          className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3">
                                                                        <span
                                                                            className="svg-icon svg-icon-md svg-icon-primary"><SVG
                                                                            src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}/></span>
                                                                    </Link>
                                                                    <a
                                                                        onClick={() => setCurrentTask(task, index)}
                                                                        key={index}
                                                                        className="btn btn-icon btn-light btn-hover-danger btn-sm">
                                                                        <span
                                                                            className="svg-icon svg-icon-md svg-icon-danger">
                                                                          <SVG
                                                                              src={toAbsoluteUrl("/media/svg/icons/General/Trash.svg")}/>
                                                                        </span>
                                                                    </a>
                                                                </Typography>
                                                            </ExpansionPanelSummary>
                                                            <ExpansionPanelDetails>
                                                                <Typography>
                                                                    <div
                                                                        dangerouslySetInnerHTML={{__html: task.description}}/>
                                                                    <Row>
                                                                        <Col md={12}>
                                                                            <Card className={`mt-4 task-files`}>
                                                                                <CardHeader title="Updates">
                                                                                    <CardHeaderToolbar>
                                                                                        <Link
                                                                                            to={`/taskupdate/create/${project.id}/${task.id}`}
                                                                                            className="btn btn-primary">+
                                                                                            Add New</Link>
                                                                                    </CardHeaderToolbar>
                                                                                </CardHeader>
                                                                                <CardBody>
                                                                                    <List className={classes.root}>
                                                                                        {
                                                                                            task.updates.map((update, index) => {
                                                                                                    return (
                                                                                                        <Card key={index}
                                                                                                              className={'task-updates'}>
                                                                                                            <CardHeader>
                                                                                                                <CardHeaderToolbar>
                                                                                                                    {update.inserton}
                                                                                                                </CardHeaderToolbar>
                                                                                                            </CardHeader>
                                                                                                            <CardBody>
                                                                                                                <div
                                                                                                                    dangerouslySetInnerHTML={{__html: update.taskupdate}}/>
                                                                                                                <ListGroup
                                                                                                                    className={'mt-3'}>
                                                                                                                    <ListGroup.Item>
                                                                                                                        <h5>Link</h5>
                                                                                                                        <p>
                                                                                                                            <a href={update.link_url}>{update.link_text}</a>
                                                                                                                        </p>
                                                                                                                    </ListGroup.Item>
                                                                                                                    <ListGroup.Item>
                                                                                                                        {update.video_url ? <>
                                                                                                                            <h5>Video</h5>
                                                                                                                            <p>
                                                                                                                                <iframe
                                                                                                                                    src={update.video_url}/>
                                                                                                                            </p>
                                                                                                                        </> : <></>}
                                                                                                                    </ListGroup.Item>
                                                                                                                    <ListGroup.Item>
                                                                                                                        <h5>Image</h5>
                                                                                                                        <p>
                                                                                                                            <img
                                                                                                                                width='100px'
                                                                                                                                src={update.image}/>
                                                                                                                        </p>
                                                                                                                    </ListGroup.Item>
                                                                                                                </ListGroup>
                                                                                                            </CardBody>
                                                                                                        </Card>
                                                                                                    )
                                                                                                }
                                                                                            )
                                                                                        }

                                                                                    </List>
                                                                                </CardBody>
                                                                            </Card>
                                                                        </Col>
                                                                        <Col md={12}>
                                                                            <Card className={`mt-4 task-files`}>
                                                                                <CardHeader title="Files">
                                                                                    <CardHeaderToolbar>
                                                                                        <Link
                                                                                            to={`/file/create/${project.id}/${task.id}`}
                                                                                            className="btn btn-primary">+
                                                                                            Add New</Link>
                                                                                    </CardHeaderToolbar>
                                                                                </CardHeader>
                                                                                <CardBody>
                                                                                    <List className={classes.root}>
                                                                                        {
                                                                                            task.files.map((file, index) => {
                                                                                                    return (
                                                                                                        <>
                                                                                                            <a href={file.url}
                                                                                                               target="_blank">
                                                                                                                <ListItem>
                                                                                                                    <ListItemAvatar>
                                                                                                                        <Avatar>
                                                                                                                            <InsertDriveFileIcon/>
                                                                                                                        </Avatar>
                                                                                                                    </ListItemAvatar>
                                                                                                                    <ListItemText
                                                                                                                        primary={file.name}
                                                                                                                        secondary={file.inserton}/>
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
                                                                        </Col>
                                                                    </Row>

                                                                </Typography>
                                                            </ExpansionPanelDetails>
                                                        </ExpansionPanel>
                                                    ))
                                                ) : (
                                                    <p>No Task</p>
                                                )}
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col md={6}>{project.customer ? <Chat userid={project.customer}/> : <></>}</Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>

            </Row>


            {/*Task Delete Modal*/}
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

            {/*Project Delete Modal*/}
            <Modal show={projectShow} onHide={handleProjectClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to Move?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleProjectClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={moveToPortfolio}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}