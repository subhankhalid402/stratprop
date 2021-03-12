import React, { useEffect, useState, useRef } from "react";
import {PartnerList} from "./PartnerList";
import {Link} from "react-router-dom";

import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../_metronic/_partials/controls";

export function Partners() {
  return (
  	<Card>
      <CardHeader title="Partner List">
        <CardHeaderToolbar>
           
          <Link to="/partner/create" className="btn btn-primary">Add New</Link>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        
        <div className="mt-5">
              <PartnerList />
        </div>

      </CardBody>
    </Card>

  );
}