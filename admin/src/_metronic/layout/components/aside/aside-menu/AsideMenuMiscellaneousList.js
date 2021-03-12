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

export function AsideMenuMiscellaneousList({ layoutProps }) {
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
        
          {/* Miscellaneous */}
          {/* begin::section */}
          <li className="menu-section ">
            <h4 className="menu-text">Miscellaneous</h4>
            <i className="menu-icon flaticon-more-v2"></i>
          </li>
          {/* end:: section */}

          {/* Faq Pages */}
          {/*begin::1 Level*/}
          <li
              className={`menu-item menu-item-submenu ${getMenuItemActive(
                  "/faq", true
              )}`}
              aria-haspopup="true"
              data-menu-toggle="hover"
          >
            <NavLink className="menu-link menu-toggle" to="/faq">
            <span className="svg-icon menu-icon">
              <HelpIcon className={classes.icon} />
            </span>
              <span className="menu-text">Faqs</span>
              <i className="menu-arrow"/>
            </NavLink>
            <div className="menu-submenu ">
              <i className="menu-arrow"/>
              <ul className="menu-subnav">
                <li className="menu-item  menu-item-parent" aria-haspopup="true">
                <span className="menu-link">
                  <span className="menu-text">Faqs</span>
                </span>
                </li>

                {/*begin::2 Level*/}
                <li
                    className={`menu-item ${getMenuItemActive("/faq/create")}`}
                    aria-haspopup="true"
                >
                  <NavLink className="menu-link" to="/faq/create">
                    <i className="menu-bullet menu-bullet-dot">
                      <span/>
                    </i>
                    <span className="menu-text">Add New</span>
                  </NavLink>
                </li>
                {/*end::2 Level*/}

                {/*begin::2 Level*/}
                <li
                    className={`menu-item ${getMenuItemActive("/faq/list")}`}
                    aria-haspopup="true"
                >
                  <NavLink className="menu-link" to="/faq/list">
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



          {/* Partner Pages */}
          {/*begin::1 Level*/}
          <li
              className={`menu-item menu-item-submenu ${getMenuItemActive(
                  "/partner", true
              )}`}
              aria-haspopup="true"
              data-menu-toggle="hover"
          >
            <NavLink className="menu-link menu-toggle" to="/partner">
            <span className="svg-icon menu-icon">
              <BusinessCenterIcon className={classes.icon} />
            </span>
              <span className="menu-text">Partners</span>
              <i className="menu-arrow"/>
            </NavLink>
            <div className="menu-submenu ">
              <i className="menu-arrow"/>
              <ul className="menu-subnav">
                <li className="menu-item  menu-item-parent" aria-haspopup="true">
                <span className="menu-link">
                  <span className="menu-text">Partners</span>
                </span>
                </li>

                {/*begin::2 Level*/}
                <li
                    className={`menu-item ${getMenuItemActive("/partner/create")}`}
                    aria-haspopup="true"
                >
                  <NavLink className="menu-link" to="/partner/create">
                    <i className="menu-bullet menu-bullet-dot">
                      <span/>
                    </i>
                    <span className="menu-text">Add New</span>
                  </NavLink>
                </li>
                {/*end::2 Level*/}

                {/*begin::2 Level*/}
                <li
                    className={`menu-item ${getMenuItemActive("/partner/list")}`}
                    aria-haspopup="true"
                >
                  <NavLink className="menu-link" to="/partner/list">
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


          {/* Inquiries Pages */}
          {/*begin::1 Level*/}
          <li
              className={`menu-item menu-item-submenu ${getMenuItemActive(
                  "/contact", true
              )}`}
              aria-haspopup="true"
              data-menu-toggle="hover"
          >
            <NavLink className="menu-link menu-toggle" to="/contact">
            <span className="svg-icon menu-icon">
              <ContactMailIcon className={classes.icon} />
            </span>
              <span className="menu-text">Inquiries</span>
              <i className="menu-arrow"/>
            </NavLink>
            <div className="menu-submenu ">
              <i className="menu-arrow"/>
              <ul className="menu-subnav">
                <li className="menu-item  menu-item-parent" aria-haspopup="true">
                <span className="menu-link">
                  <span className="menu-text">Inquiries</span>
                </span>
                </li>

                {/*begin::2 Level*/}
                <li
                    className={`menu-item ${getMenuItemActive("/contact/list")}`}
                    aria-haspopup="true"
                >
                  <NavLink className="menu-link" to="/contact/list">
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
