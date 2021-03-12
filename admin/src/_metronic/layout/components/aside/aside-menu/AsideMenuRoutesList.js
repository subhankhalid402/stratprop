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

export function AsideMenuRoutesList({ layoutProps }) {
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
        
          {/* Routes Management */}
          {/* begin::section */}
          <li className="menu-section ">
            <h4 className="menu-text">Routes Management</h4>
            <i className="menu-icon flaticon-more-v2"></i>
          </li>
          {/* end:: section */}
          {/* City Pages */}
          {/*begin::1 Level*/}
          <li
              className={`menu-item menu-item-submenu ${getMenuItemActive(
                  "/city", true
              )}`}
              aria-haspopup="true"
              data-menu-toggle="hover"
          >
            <NavLink className="menu-link menu-toggle" to="/city">
            <span className="svg-icon menu-icon">
              <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Map/Marker1.svg")}
              />
            </span>
              <span className="menu-text">Cities</span>
              <i className="menu-arrow"/>
            </NavLink>
            <div className="menu-submenu ">
              <i className="menu-arrow"/>
              <ul className="menu-subnav">
                <li className="menu-item  menu-item-parent" aria-haspopup="true">
                <span className="menu-link">
                  <span className="menu-text">Cities</span>
                </span>
                </li>

                {/*begin::2 Level*/}
                <li
                    className={`menu-item ${getMenuItemActive("/city/create")}`}
                    aria-haspopup="true"
                >
                  <NavLink className="menu-link" to="/city/create">
                    <i className="menu-bullet menu-bullet-dot">
                      <span/>
                    </i>
                    <span className="menu-text">Add New</span>
                  </NavLink>
                </li>
                {/*end::2 Level*/}

                {/*begin::2 Level*/}
                <li
                    className={`menu-item ${getMenuItemActive("/city/list")}`}
                    aria-haspopup="true"
                >
                  <NavLink className="menu-link" to="/city/list">
                    <i className="menu-bullet menu-bullet-dot">
                      <span/>
                    </i>
                    <span className="menu-text">List</span>
                  </NavLink>
                </li>
                {/*end::2 Level*/}

              </ul>
            </div>
          </li>
          {/*end::1 Level*/}


          {/* Terminal Pages */}
          {/*begin::1 Level*/}
          <li
              className={`menu-item menu-item-submenu ${getMenuItemActive(
                  "/terminal", true
              )}`}
              aria-haspopup="true"
              data-menu-toggle="hover"
          >
            <NavLink className="menu-link menu-toggle" to="/terminal">
            <span className="svg-icon menu-icon">
              <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Map/Compass.svg")}
              />
            </span>
              <span className="menu-text">Terminals</span>
              <i className="menu-arrow"/>
            </NavLink>
            <div className="menu-submenu ">
              <i className="menu-arrow"/>
              <ul className="menu-subnav">
                <li className="menu-item  menu-item-parent" aria-haspopup="true">
                <span className="menu-link">
                  <span className="menu-text">Error Pages</span>
                </span>
                </li>

                {/*begin::2 Level*/}
                <li
                    className={`menu-item ${getMenuItemActive("/terminal/create")}`}
                    aria-haspopup="true"
                >
                  <NavLink className="menu-link" to="/terminal/create">
                    <i className="menu-bullet menu-bullet-dot">
                      <span/>
                    </i>
                    <span className="menu-text">Add New</span>
                  </NavLink>
                </li>
                {/*end::2 Level*/}

                {/*begin::2 Level*/}
                <li
                    className={`menu-item ${getMenuItemActive("/terminal/list")}`}
                    aria-haspopup="true"
                >
                  <NavLink className="menu-link" to="/terminal/list">
                    <i className="menu-bullet menu-bullet-dot">
                      <span/>
                    </i>
                    <span className="menu-text">List</span>
                  </NavLink>
                </li>
                {/*end::2 Level*/}

              </ul>
            </div>
          </li>
          {/*end::1 Level*/}

        {/* Route Pages */}
          {/*begin::1 Level*/}
          <li
              className={`menu-item menu-item-submenu ${getMenuItemActive(
                  "/route", true
              )}`}
              aria-haspopup="true"
              data-menu-toggle="hover"
          >
            <NavLink className="menu-link menu-toggle" to="/route">
            <span className="svg-icon menu-icon">
              <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Map/Direction1.svg")}
              />
            </span>
              <span className="menu-text">Routes</span>
              <i className="menu-arrow"/>
            </NavLink>
            <div className="menu-submenu ">
              <i className="menu-arrow"/>
              <ul className="menu-subnav">
                <li className="menu-item  menu-item-parent" aria-haspopup="true">
                <span className="menu-link">
                  <span className="menu-text">Error Pages</span>
                </span>
                </li>

                {/*begin::2 Level*/}
                <li
                    className={`menu-item ${getMenuItemActive("/route/create")}`}
                    aria-haspopup="true"
                >
                  <NavLink className="menu-link" to="/route/create">
                    <i className="menu-bullet menu-bullet-dot">
                      <span/>
                    </i>
                    <span className="menu-text">Add New</span>
                  </NavLink>
                </li>
                {/*end::2 Level*/}

                {/*begin::2 Level*/}
                <li
                    className={`menu-item ${getMenuItemActive("/route/list")}`}
                    aria-haspopup="true"
                >
                  <NavLink className="menu-link" to="/route/list">
                    <i className="menu-bullet menu-bullet-dot">
                      <span/>
                    </i>
                    <span className="menu-text">List</span>
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
