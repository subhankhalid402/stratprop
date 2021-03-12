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


const useStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.text.primary,
  },
  icon: {
    margin: theme.spacing(1),
    fontSize: 32,
  },
}));

export function AsideMenuPaymentsList({ layoutProps }) {
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
        
          {/* Payments */}
          {/* begin::section */}
          <li className="menu-section ">
            <h4 className="menu-text">Payments </h4>
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
            <NavLink className="menu-link menu-toggle" to="/agent">
            <span className="svg-icon menu-icon">
              <CreditCardIcon className={classes.icon} />
            </span>
              <span className="menu-text">Withdrawal Requests</span>
              <i className="menu-arrow"/>
            </NavLink>
            <div className="menu-submenu ">
              <i className="menu-arrow"/>
              <ul className="menu-subnav">
                <li className="menu-item  menu-item-parent" aria-haspopup="true">
                <span className="menu-link">
                  <span className="menu-text">Withdrawal Requests</span>
                </span>
                </li>

                {/*begin::2 Level*/}
                <li
                    className={`menu-item ${getMenuItemActive("/withdrawal/pending")}`}
                    aria-haspopup="true"
                >
                  <NavLink className="menu-link" to="/withdrawal/pending">
                    <i className="menu-bullet menu-bullet-dot">
                      <span/>
                    </i>
                    <span className="menu-text">Pending</span>
                  </NavLink>
                </li>
                {/*end::2 Level*/}

                {/*begin::2 Level*/}
                <li
                    className={`menu-item ${getMenuItemActive("/withdrawal/rejected")}`}
                    aria-haspopup="true"
                >
                  <NavLink className="menu-link" to="/withdrawal/rejected">
                    <i className="menu-bullet menu-bullet-dot">
                      <span/>
                    </i>
                    <span className="menu-text">Rejected</span>
                  </NavLink>
                </li>
                {/*end::2 Level*/}

                {/*begin::2 Level*/}
                <li
                    className={`menu-item ${getMenuItemActive("/withdrawal/paid")}`}
                    aria-haspopup="true"
                >
                  <NavLink className="menu-link" to="/withdrawal/paid">
                    <i className="menu-bullet menu-bullet-dot">
                      <span/>
                    </i>
                    <span className="menu-text">Paid</span>
                  </NavLink>
                </li>
                {/*end::2 Level*/}

                {/*begin::2 Level*/}
                <li
                    className={`menu-item ${getMenuItemActive("/withdrawal/all")}`}
                    aria-haspopup="true"
                >
                  <NavLink className="menu-link" to="/withdrawal/all">
                    <i className="menu-bullet menu-bullet-dot">
                      <span/>
                    </i>
                    <span className="menu-text">All</span>
                  </NavLink>
                </li>
                {/*end::2 Level*/}

              </ul>
            </div>
          </li>
          {/*end::1 Level*/}
          
        </ul>

        {/* end::Menu Nav */}
      </>
  );
}
