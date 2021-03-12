import React, { useEffect, useState, useRef } from "react";
import {WithdrawalList} from "./WithdrawalList";
import {Link} from "react-router-dom";

import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../_metronic/_partials/controls";

export function Withdrawals(props) {

  const status = props.match.params.status;
  
  return (
  	<Card>
      <CardHeader title="Withdrawal List">
        <CardHeaderToolbar>
           
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        
        <div className="mt-5">
              <WithdrawalList status={status} />
        </div>

      </CardBody>
    </Card>

  );
}