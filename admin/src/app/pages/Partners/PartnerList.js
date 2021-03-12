import React, {useEffect, useState, useRef} from "react";
import axios from "axios";
import $ from "jquery";
import DataTable from "datatables.net";
import {Link} from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { useHistory } from 'react-router';
import { toAbsoluteUrl } from "../../../_metronic/_helpers";
import SVG from "react-inlinesvg";
import alertify from "alertifyjs";
import {API_URL} from '../constants.js';

import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../_metronic/_partials/controls";

export function PartnerList(props)
{
	const [partners, setPartners] = useState([]);
	const [partner, setPartner] = useState(null);
	const [currentIndex, setCurrentIndex] = useState(-1);
	const [show, setShow] = useState(false);
	const history = useHistory()

	const setCurrentPartner = (partner, index) => {
	    setPartner(partner);
	    setCurrentIndex(index);
	    setShow(true);

	};

  	const handleClose = () => setShow(false);

  	const deletePartner = () => {
  		axios.post(
  			API_URL + 'partner/delete', 
  			{id: partner.id}
  		).then((response) => {
  			if(response.data.code == 200)
	  		{
	  			history.go(0);
	  			setShow(false);
	  			alertify.success(response.data.message);
	  		}
	  		else if(response.data.code === 404)
		    {
		          alertify.error(response.data.message);
		          return null;
		    }
  		})
  	}

	useEffect( () => {

		axios.get(API_URL + 'partner').then( (response) => {
			
			if(response.data.code === 200){
                
                setPartners(response.data.data);

                $("#partner_table").DataTable();
            }

            else if(response.data.code === 404){
                alertify.error(response.data.message);
                return null;
            }
		})
		.catch((error) => {
            
            if(error.message === 'Request failed with status code 401'){
                //props.logout();
            }
        });

	}, []);

	return (
		<>
		<table id="partner_table" className="stratprop_datatable">
		    <thead>
		      <tr>
		        <th>ID</th>
		        <th>Name</th>
		        <th>Image</th>
		        <th>Order</th>
		        <th>Actions</th>
		      </tr>
		    </thead>
		    <tbody>
		      {partners.length > 0 ? (
		        partners.map((partner, index) => (
		          <tr key={partner.id}>
		            <td>{partner.id}</td>
		            <td>{partner.name}</td>
		            <td>{partner.image}</td>
		            <td>{partner.order}</td>
		            <td>
		            	<Link to={`/partner/edit/${partner.id}`} className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3">
		            		<span className="svg-icon svg-icon-md svg-icon-primary">
					          <SVG
					            src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}
					          />
					        </span>
        				</Link>
		            	<a 
		            	onClick={() => setCurrentPartner(partner, index)}
                		key={index}
                		className="btn btn-icon btn-light btn-hover-danger btn-sm">
		            		<span className="svg-icon svg-icon-md svg-icon-danger">
					          <SVG src={toAbsoluteUrl("/media/svg/icons/General/Trash.svg")} />
					        </span>
		            	</a>

		            </td>
		            
		          </tr>
		        ))
		      ) : (
		        <tr>
		          <td colSpan={3}>No Partner</td>
		        </tr>
		      )}
		    </tbody>
		  </table>
		  <Modal show={show} onHide={handleClose}>
	        <Modal.Header closeButton>
	          <Modal.Title>Delete Partner</Modal.Title>
	        </Modal.Header>
	        <Modal.Body>Are you sure you want to Delete?</Modal.Body>
	        <Modal.Footer>
	          <Button variant="secondary" onClick={handleClose}>
	            Close
	          </Button>
	          <Button variant="primary" onClick={deletePartner}>
	            Save Changes
	          </Button>
	        </Modal.Footer>
	      </Modal>
	      </>
	)
}