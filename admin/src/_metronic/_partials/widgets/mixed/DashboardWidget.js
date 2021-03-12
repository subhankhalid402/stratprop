/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, {useMemo, useEffect} from "react";
import SVG from "react-inlinesvg";
import objectPath from "object-path";
import ApexCharts from "apexcharts";
import {Dropdown} from "react-bootstrap";
import {toAbsoluteUrl} from "../../../_helpers";
import {useHtmlClassService} from "../../../layout";
import {DropdownMenu2} from "../../dropdowns";
import { makeStyles } from '@material-ui/core/styles';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import {Link} from "react-router-dom";

import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import ExploreIcon from '@material-ui/icons/Explore';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';

const useStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.text.primary,
  },
  icon: {
    margin: theme.spacing(1),
    fontSize: 32,
  },
}));

export function DashboardWidget({ className, symbolShape, baseColor, mainTitle, value, icon }) {

	const classes = useStyles();  	
  return (
     <div className={`card card-custom ${className}`}>
      <div className="card-body p-0">
        <div className="d-flex align-items-center justify-content-between card-spacer flex-grow-1">
          <span
            className={`symbol ${symbolShape} symbol-50 symbol-light-${baseColor} mr-2`}
          >
            <span className="symbol-label">
              <span className={`svg-icon svg-icon-xl svg-icon-${baseColor}`}>
                <SVG
                  src={toAbsoluteUrl(
                    "/media/svg/icons/" + icon
                  )}
                ></SVG>
              </span>
            </span>
          </span>
          <div className="d-flex flex-column text-right">
            <span className="text-dark-75 font-weight-bolder font-size-h3">
             {value}
            </span>
            <span className="text-muted font-weight-bold mt-2">
              {mainTitle}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
