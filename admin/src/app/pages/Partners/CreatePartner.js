import React, { useEffect, useState, useRef } from "react";
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

export function CreatePartner(props) {

  const name = useRef();
  const order = useRef();
  // const image = useRef();
  const status = useRef();

  const [image, setImage] = useState('');

  const createPartnerHandler = (e) => {

  	e.preventDefault();
  	axios.post( API_URL + "partner/save", 
  		{
        name: name.current.value,
        order: order.current.value,
        status: status.current.value,
        image: image
  		}
  	)
  	.then((response) => {
  		if(response.data.code == 200)
  		{
        alertify.success(response.data.message);

  			props.history.push("/partner/list");
  		}

      else if(response.data.code === 404)
      {
          alertify.error(response.data.message);
          return null;
      }
  	})
    .catch((error) => {
        
        if(error.message === 'Request failed with status code 401'){
            //props.logout();
        }
    });
  }

  const handleImage = (e) =>{
    var reader = new FileReader(); 
    reader.onload = (e) => {
        //e.target.result;
        setImage(e.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  }

  return (
  <Row>
  	<Col md={12}>
  	<Card>
      <CardHeader title="Add New Partner">
        <CardHeaderToolbar>
          
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        
        <div className="mt-5">
        	<Form onSubmit={createPartnerHandler}>
        	<Form.Row>
    			  <Form.Group as={Col}>
    			    <Form.Label>Name</Form.Label>
    			    <Form.Control ref={name} placeholder="Enter name" />
    			  </Form.Group>
    			   <Form.Group as={Col}>
              <Form.Label>Order</Form.Label>
              <Form.Control ref={order} placeholder="Enter order" />
            </Form.Group>
    			</Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Image</Form.Label>
              <Row>
                <Col>
                  <Form.Control type="file" onChange={handleImage} />
                </Col>
                <Col>
                  {image !== ''? <img width='100' src={image} /> : ''}
                </Col>
              </Row>
              {/* <Form.Control ref={image} placeholder="Enter image" /> */}
            </Form.Group>
             <Form.Group as={Col}>
              <Form.Label>Status</Form.Label>
              <Form.Control as="select" ref={status}>
                <option value="1">Active</option>
                <option value="0">In-Active</option>
                
              </Form.Control>
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