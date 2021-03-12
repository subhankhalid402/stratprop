import React, { useEffect, useState, useRef } from "react";
import {PortfolioList} from "./PortfolioList";
import {Link} from "react-router-dom";

import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../_metronic/_partials/controls";

export function Portfolios() {
  return (
  	<Card>
      <CardHeader title="Portfolio List">
        <CardHeaderToolbar>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>

        <div className="mt-5">
              <PortfolioList />
        </div>

      </CardBody>
    </Card>

  );
}