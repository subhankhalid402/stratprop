import React, {useEffect, useState, useRef} from "react";
import axios from "axios";
import $ from "jquery";
import {Card, CardBody, CardHeader, CardHeaderToolbar,} from "../../../_metronic/_partials/controls";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import alertify from "alertifyjs";
import {API_URL} from '../constants.js';

import {makeStyles} from '@material-ui/core/styles';
import TelegramIcon from '@material-ui/icons/Telegram';
import AttachFileIcon from '@material-ui/icons/AttachFile';

const useStyles = makeStyles(theme => ({
    root: {
        color: theme.palette.text.primary,
    },
    icon: {
        margin: theme.spacing(1),
        fontSize: 32,
    },
}));

export function Chat({userid}) {

    const classes = useStyles();

    const [messages, setMessages] = useState([]);
    const [messageUnreadCount, setMessageUnreadCount] = useState(0);
    const [attachment, setAttachment] = useState('');
    const [intervalCount, setIntervalCount] = useState(0);

    const message = useRef();
    const messageRef = useRef();

    const handleMessageType = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    }

    const handleMessageSend = (e) => {
        e.preventDefault();
        sendMessage();
    }

    const sendMessage = () => {
        const formData = new FormData();
        formData.append('message', message.current.value);
        formData.append('convid', userid);
        formData.append('attachment', attachment);

        message.current.value = '';

        axios.post(API_URL + "backend/message/send",
            formData,
            {
                'content-type': 'multipart/form-data'
            }
        )
            .then((response) => {
                if (response.data.code == 200) {
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

    const handleAttachment = (e) => {
        setAttachment(e.target.files[0])
    }

    useEffect(() => {
        axios.get(API_URL + 'backend/message/unread-count/' + userid).then((response) => {
            if (response.data.code === 200) {
                if (messageUnreadCount != response.data.data)
                    setMessageUnreadCount(response.data.data);

                setIntervalCount(intervalCount + 1);
            }
        })
    }, [intervalCount])

    useEffect(() => {

        axios.get(API_URL + 'backend/message/all/' + userid).then((response) => {

            if (response.data.code === 200) {
                setMessages(response.data.data);

                /*if (messageRef.current)
                    messageRef.current.scrollIntoView(
                        {
                            behavior: 'smooth',
                            block: 'end',
                            inline: 'nearest'
                        });*/

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

    }, [messageUnreadCount]);

    return (
        <>
            <Card className={'live-chat-card'}>
                <CardHeader title={'Subhan'}>
                    <CardHeaderToolbar>
                        Live Chat
                    </CardHeaderToolbar>
                </CardHeader>
                <CardBody className={'live-chat-card-body'} ref={messageRef}>
                    {messages.length > 0 ? (
                        messages.map((message, index) => (
                                message.user == userid ?
                                    <>
                                        <div className={'mb-3'}>
                                            <div className={'float-left'}>
                                                {message.sender ? <img
                                                    src={message.sender.image}
                                                    width={'50px'} className={`ml-3`}/> : <></>}
                                            </div>
                                            <div className={'float-left alert alert-info col-9'}>
                                                <div dangerouslySetInnerHTML={{__html: message.message}}/>
                                            </div>
                                        </div>
                                        <div className={'clearfix'}></div>
                                    </>
                                    : <>
                                        <div className={'mb-3'}>
                                            <div className={'float-right'}>
                                                {message.sender ? <img
                                                    src={message.sender.image}
                                                    width={'50px'} className={`ml-3`}/> : <></>}
                                            </div>
                                            <div className={'float-right alert alert-primary col-9'}>
                                                <div dangerouslySetInnerHTML={{__html: message.message}}/>
                                            </div>
                                        </div>
                                        <div className={'clearfix'}></div>
                                    </>
                            )
                        )
                    ) : (
                        <p>No Message</p>
                    )}
                </CardBody>
                <CardBody className={'send-message-card-body'}>
                    <Form.Row>
                        <Form.Group as={Col} sm={9}>
                            <Form.Control ref={message} placeholder="Type here..." onKeyPress={handleMessageType}/>
                        </Form.Group>
                        <Form.Group as={Col} sm={3}>
                            <Form.Control type={'file'} id={'attachment'}/>
                            <label className={'mb-2 attachment-btn'} htmlFor={'attachment'}>
                                <AttachFileIcon className={classes.icon}/>
                            </label>
                            <label className={'mb-2 send-message-btn'} onClick={handleMessageSend}>
                                <TelegramIcon className={classes.icon}/>
                            </label>
                        </Form.Group>
                    </Form.Row>
                </CardBody>
            </Card>
        </>
    )
}