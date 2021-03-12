/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import {useLocation} from "react-router";
import {NavLink}  from "react-router-dom";
import SVG from "react-inlinesvg";
import {toAbsoluteUrl, checkIsActive} from "../../../../_helpers";
import { makeStyles } from '@material-ui/core/styles';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import ExtensionIcon from '@material-ui/icons/Extension';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import AssignmentIcon from '@material-ui/icons/Assignment';


const useStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.text.primary,
  },
  icon: {
    margin: theme.spacing(1),
    fontSize: 32,
  },
}));

export function AsideMenuBusesList({ layoutProps }) {
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
          
          {/* Bus Management */}
          {/* begin::section */}
          <li className="menu-section ">
            <h4 className="menu-text">Bus Management</h4>
            <i className="menu-icon flaticon-more-v2"></i>
          </li>
          {/* end:: section */}

          {/* Bus Type Pages */}
          {/*begin::1 Level*/}
          <li
              className={`menu-item menu-item-submenu ${getMenuItemActive(
                  "/bus-type", true
              )}`}
              aria-haspopup="true"
              data-menu-toggle="hover"
          >
            <NavLink className="menu-link menu-toggle" to="/bus-type">
            <span className="svg-icon menu-icon">
              <LocalOfferIcon className={classes.icon} />
            </span>
              <span className="menu-text">Bus Types</span>
              <i className="menu-arrow"/>
            </NavLink>
            <div className="menu-submenu ">
              <i className="menu-arrow"/>
              <ul className="menu-subnav">
                <li className="menu-item  menu-item-parent" aria-haspopup="true">
                <span className="menu-link">
                  <span className="menu-text">Bus Types</span>
                </span>
                </li>

                {/*begin::2 Level*/}
                <li
                    className={`menu-item ${getMenuItemActive("/bus-type/create")}`}
                    aria-haspopup="true"
                >
                  <NavLink className="menu-link" to="/bus-type/create">
                    <i className="menu-bullet menu-bullet-dot">
                      <span/>
                    </i>
                    <span className="menu-text">Add New</span>
                  </NavLink>
                </li>
                {/*end::2 Level*/}

                {/*begin::2 Level*/}
                <li
                    className={`menu-item ${getMenuItemActive("/bus-type/list")}`}
                    aria-haspopup="true"
                >
                  <NavLink className="menu-link" to="/bus-type/list">
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


        {/* Bus Facilities Pages */}
          {/*begin::1 Level*/}
          <li
              className={`menu-item menu-item-submenu ${getMenuItemActive(
                  "/bus-facility", true
              )}`}
              aria-haspopup="true"
              data-menu-toggle="hover"
          >
            <NavLink className="menu-link menu-toggle" to="/bus-facility">
            <span className="svg-icon menu-icon">
              <ExtensionIcon className={classes.icon} />
            </span>
              <span className="menu-text">Bus Facilities</span>
              <i className="menu-arrow"/>
            </NavLink>
            <div className="menu-submenu ">
              <i className="menu-arrow"/>
              <ul className="menu-subnav">
                <li className="menu-item  menu-item-parent" aria-haspopup="true">
                <span className="menu-link">
                  <span className="menu-text">Bus Facilities</span>
                </span>
                </li>

                {/*begin::2 Level*/}
                <li
                    className={`menu-item ${getMenuItemActive("/bus-facility/create")}`}
                    aria-haspopup="true"
                >
                  <NavLink className="menu-link" to="/bus-facility/create">
                    <i className="menu-bullet menu-bullet-dot">
                      <span/>
                    </i>
                    <span className="menu-text">Add New</span>
                  </NavLink>
                </li>
                {/*end::2 Level*/}

                {/*begin::2 Level*/}
                <li
                    className={`menu-item ${getMenuItemActive("/bus-facility/list")}`}
                    aria-haspopup="true"
                >
                  <NavLink className="menu-link" to="/bus-facility/list">
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

          {/* Bus Pages */}
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
              <DirectionsBusIcon className={classes.icon} />
            </span>
              <span className="menu-text">Buses</span>
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
                    className={`menu-item ${getMenuItemActive("/bus/create")}`}
                    aria-haspopup="true"
                >
                  <NavLink className="menu-link" to="/bus/create">
                    <i className="menu-bullet menu-bullet-dot">
                      <span/>
                    </i>
                    <span className="menu-text">Add New</span>
                  </NavLink>
                </li>
                {/*end::2 Level*/}

                {/*begin::2 Level*/}
                <li
                    className={`menu-item ${getMenuItemActive("/bus/list")}`}
                    aria-haspopup="true"
                >
                  <NavLink className="menu-link" to="/bus/list">
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

        {/* Bus-Route Assignment Pages */}
          {/*begin::1 Level*/}
          <li
              className={`menu-item menu-item-submenu ${getMenuItemActive(
                  "/bus-facility", true
              )}`}
              aria-haspopup="true"
              data-menu-toggle="hover"
          >
            <NavLink className="menu-link menu-toggle" to="/bus-route">
            <span className="svg-icon menu-icon">
              <AssignmentIcon className={classes.icon} />
            </span>
              <span className="menu-text">Bus-Route Assignment</span>
              <i className="menu-arrow"/>
            </NavLink>
            <div className="menu-submenu ">
              <i className="menu-arrow"/>
              <ul className="menu-subnav">
                <li className="menu-item  menu-item-parent" aria-haspopup="true">
                <span className="menu-link">
                  <span className="menu-text">Bus-Route Assignment</span>
                </span>
                </li>

                {/*begin::2 Level*/}
                <li
                    className={`menu-item ${getMenuItemActive("/bus-route/create")}`}
                    aria-haspopup="true"
                >
                  <NavLink className="menu-link" to="/bus-route/create">
                    <i className="menu-bullet menu-bullet-dot">
                      <span/>
                    </i>
                    <span className="menu-text">Add New</span>
                  </NavLink>
                </li>
                {/*end::2 Level*/}

                {/*begin::2 Level*/}
                <li
                    className={`menu-item ${getMenuItemActive("/bus-route/list")}`}
                    aria-haspopup="true"
                >
                  <NavLink className="menu-link" to="/bus-route/list">
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
