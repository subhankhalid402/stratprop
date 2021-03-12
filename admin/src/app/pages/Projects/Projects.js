import React, { useEffect, useState, useRef } from "react";
import {ProjectList} from "./ProjectList";
import {Link} from "react-router-dom";

import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../_metronic/_partials/controls";

export function Projects() {
  return (
  	<Card>
      <CardHeader title="Project List">
        <CardHeaderToolbar>

          <Link to="/project/create" className="btn btn-primary">Add New</Link>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>

        <div className="mt-5">
              <ProjectList />
        </div>

      </CardBody>
    </Card>

  );
}