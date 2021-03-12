/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import {useLocation} from "react-router";
import {NavLink}  from "react-router-dom";
import SVG from "react-inlinesvg";
import {toAbsoluteUrl, checkIsActive} from "../../../../_helpers";
import { makeStyles } from '@material-ui/core/styles';
import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';
import ExtensionIcon from '@material-ui/icons/Extension';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import PeopleIcon from '@material-ui/icons/People';
import HelpIcon from '@material-ui/icons/Help';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import DashboardIcon from '@material-ui/icons/Dashboard';


const useStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.text.primary,
  },
  icon: {
    margin: theme.spacing(1),
    fontSize: 32,
  },
}));

export function AsideMenuDashboardList({ layoutProps }) {
  const classes = useStyles();
  const location = useLocation();
  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
        ? ` ${!hasSubmenu && "menu-item-active"} menu-item-open `
        : "";
  };

  return (
      <>
        {/* begin::Menu Nav */}
        <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        
          {/* Dashboard */}
          {/* begin::section */}
          <li className="menu-section ">
            <h4 className="menu-text">Dashboard </h4>
            <i className="menu-icon flaticon-more-v2"></i>
          </li>
          {/* end:: section */}

          {/* Agents Type Pages */}
          {/*begin::1 Level*/}
          <li
              className={`menu-item menu-item-submenu ${getMenuItemActive(
                  "/bus-type", true
              )}`}
              aria-haspopup="true"
              data-menu-toggle="hover"
          >
            <NavLink className="menu-link" to="/dashboard">
              <span className="svg-icon menu-icon">
                <DashboardIcon className={classes.icon} />
              </span>
              <span className="menu-text">Dashboard</span>
            </NavLink>
            
          </li>
          {/*end::1 Level*/}
          
        </ul>

        {/* end::Menu Nav */}
      </>
  );
}
