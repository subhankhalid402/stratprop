import React, { useEffect, useState, useRef } from "react";
import {UserList} from "./UserList";
import {Link} from "react-router-dom";

import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../_metronic/_partials/controls";

export function Users() {
  return (
  	<UserList />

  );
}