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

export function EditPartner(props) {
	const initialState = {
		partner: '',
		status: '',
	};

	const [partner, setPartner] = useState({});
	const [fields, setFields] = useState(initialState);
  const name = useRef();
  const order = useRef();
  const status = useRef();
  const id = props.match.params.id;

  	useEffect(() => {
    	axios.get(API_URL + 'partner/' + id).then( (response) => {
			
			if(response.data.code === 200)
      {
          console.log(response.data);
          setFields({status: response.data.data.status});
				
          setPartner(response.data.data);
      }
      else if(response.data.code === 404)
      {
          alertify.error(response.data.message);
          return null;
      }
		})
	}, []);
	
	const handleChange = (e) => {
		setFields({status: e.target.value});
  }
  
  const handleImage = (e) =>{
    var reader = new FileReader(); 
    reader.onload = (e) => {
        //e.target.result;
        setPartner((currentState)=>({
          ...currentState,
          image: e.target.result
        }));
    };
    reader.readAsDataURL(e.target.files[0]);
  }

  const editPartnerHandler = (e) => {

  	e.preventDefault();
  	axios.post( API_URL + "partner/update", 
  		{
  			id: id,
  			name: name.current.value,
        order: order.current.value,
        image: partner.image,
  			status: status.current.value
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
  	});
  }
  return (
  <Row>
  	<Col md={12}>
  	<Card>
      <CardHeader title="Edit Partner">
        <CardHeaderToolbar>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        
        <div className="mt-5">
        	<Form onSubmit={editPartnerHandler}>
        	<Form.Row>
    			  <Form.Group as={Col}>
    			    <Form.Label>Name</Form.Label>
    			    <Form.Control ref={name} defaultValue={partner.name} placeholder="Enter name" />
    			  </Form.Group>
    			   <Form.Group as={Col}>
              <Form.Label>Order</Form.Label>
              <Form.Control ref={order} defaultValue={partner.order} placeholder="Enter order" />
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
                  {partner.image? <img width='100' src={partner.image} /> : ''}
                </Col>
              </Row>
              {/* <Form.Control ref={image} defaultValue={partner.image} placeholder="Enter image" /> */}
            </Form.Group>
             <Form.Group as={Col}>
              <Form.Label>Status</Form.Label>
              <Form.Control as="select" ref={status} onChange={handleChange} value={fields.status}>
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