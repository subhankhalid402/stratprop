import React, { useEffect, useState, useRef } from "react";
import {RoadmapList} from "./RoadmapList";
import {Link} from "react-router-dom";

import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../_metronic/_partials/controls";

export function Roadmaps(props) {
    const id = props.match.params.id;
  return (
  	<Card>
      <CardHeader title="Roadmap List">
        <CardHeaderToolbar>

          <Link to="/roadmap/create" className="btn btn-primary">Add New</Link>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <div className="mt-5">
              <RoadmapList id={id} />
        </div>
      </CardBody>
    </Card>

  );
}