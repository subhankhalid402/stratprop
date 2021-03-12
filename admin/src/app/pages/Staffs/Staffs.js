import React, { useEffect, useState, useRef } from "react";
import {StaffList} from "./StaffList";
import {Link} from "react-router-dom";

import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../_metronic/_partials/controls";

export function Staffs() {
  return (
  	<Card>
      <CardHeader title="Staff List">
        <CardHeaderToolbar>
           
          <Link to="/staff/create" className="btn btn-primary">Add New</Link>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        
        <div className="mt-5">
              <StaffList />
        </div>

      </CardBody>
    </Card>

  );
}