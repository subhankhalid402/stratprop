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

export function WithdrawalList(props)
{
	const [withdrawals, setWithdrawals] = useState([]);
	const [withdrawal, setWithdrawal] = useState(null);
	const [currentIndex, setCurrentIndex] = useState(-1);
	const [show, setShow] = useState(false);
	const history = useHistory();
	const status = props.status;

	const setCurrentWithdrawal = (withdrawal, index) => {
	    setWithdrawal(withdrawal);
	    setCurrentIndex(index);
	    setShow(true);

	};

  	const handleClose = () => setShow(false);

  	const changeWithdrawalStatus = () => {
  		axios.post(
  			API_URL + 'withdrawal/delete', 
  			{id: withdrawal.id}
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

		axios.get(API_URL + 'withdrawal/' + status ).then( (response) => {
			
			if(response.data.code === 200){
                
                setWithdrawals(response.data.data);

                $("#withdrawal_table").DataTable();
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
		<table id="withdrawal_table" className="stratprop_datatable">
		    <thead>
		      <tr>
		        <th>ID</th>
		        <th>User</th>
		        <th>Amount</th>
		        <th>Account No</th>
		        <th>Bank Name</th>
		        <th>Branch Code</th>
		        <th>Branch Address</th>
		        <th>IBAN</th>
		        
		      </tr>
		    </thead>
		    <tbody>
		      {withdrawals.length > 0 ? (
		        withdrawals.map((withdrawal, index) => (
		          <tr key={withdrawal.id}>
		            <td>{withdrawal.id}</td>
		            <td>{withdrawal.user.username}</td>
		            <td>{withdrawal.amount}</td>
		            <td>{withdrawal.account_number}</td>
		            <td>{withdrawal.bank_name}</td>
		            <td>{withdrawal.branch_code}</td>
		            <td>{withdrawal.branch_address}</td>
		            <td>{withdrawal.iban_number}</td>
		            
		            {/*<td>
		            	<Link to={`/withdrawal/edit/${withdrawal.id}`} className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3">
		            		<span className="svg-icon svg-icon-md svg-icon-primary">
					          <SVG
					            src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}
					          />
					        </span>
        				</Link>
		            	<a 
		            	onClick={() => setCurrentWithdrawal(withdrawal, index)}
                		key={index}
                		className="btn btn-icon btn-light btn-hover-danger btn-sm">
		            		<span className="svg-icon svg-icon-md svg-icon-danger">
					          <SVG src={toAbsoluteUrl("/media/svg/icons/General/Trash.svg")} />
					        </span>
		            	</a>

		            </td> */}
		            
		            
		          </tr>
		        ))
		      ) : (
		        <tr>
		          <td colSpan={3}>No Withdrawal</td>
		        </tr>
		      )}
		    </tbody>
		  </table>
		  <Modal show={show} onHide={handleClose}>
	        <Modal.Header closeButton>
	          <Modal.Title>Delete Withdrawal</Modal.Title>
	        </Modal.Header>
	        <Modal.Body>Are you sure you want to Delete?</Modal.Body>
	        <Modal.Footer>
	          <Button variant="secondary" onClick={handleClose}>
	            Close
	          </Button>
	          <Button variant="primary" onClick={changeWithdrawalStatus}>
	            Save Changes
	          </Button>
	        </Modal.Footer>
	      </Modal>
	      </>
	)
}