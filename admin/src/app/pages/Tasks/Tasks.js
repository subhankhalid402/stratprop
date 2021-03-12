import React, { useEffect, useState, useRef } from "react";
import {TaskTemplateList} from "./TaskTemplateList";
import {Link} from "react-router-dom";

import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../_metronic/_partials/controls";

export function TaskTemplates() {
  return (
  	<Card>
      <CardHeader title="Task Template List">
        <CardHeaderToolbar>
           
          <Link to="/task-template/create" className="btn btn-primary">Add New</Link>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        
        <div className="mt-5">
              <TaskTemplateList />
        </div>

      </CardBody>
    </Card>

  );
}