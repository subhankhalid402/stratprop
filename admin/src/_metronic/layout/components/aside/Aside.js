/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useMemo, useState } from "react";
import objectPath from "object-path";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { useHtmlClassService } from "../../_core/MetronicLayout";
import { toAbsoluteUrl } from "../../../_helpers";
import { AsideSearch } from "./AsideSearch";
import { AsideMenuDashboard } from "./aside-menu/AsideMenuDashboard";
import { AsideMenuRoutes } from "./aside-menu/AsideMenuRoutes";
import { AsideMenuBuses } from "./aside-menu/AsideMenuBuses";
import { AsideMenuUsers } from "./aside-menu/AsideMenuUsers";
import { AsideMenuPayments } from "./aside-menu/AsideMenuPayments";
import { AsideMenuBookings } from "./aside-menu/AsideMenuBookings";
import { AsideMenuMiscellaneous } from "./aside-menu/AsideMenuMiscellaneous";
import { LanguageSelectorDropdown } from "../extras/dropdowns/LanguageSelectorDropdown";
import { QuickUserToggler } from "../extras/QuickUserToggler";
import { Brand } from "../brand/Brand";
import { KTUtil } from "./../../../_assets/js/components/util";
import {Link} from "react-router-dom";
import {NavLink}  from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import PeopleIcon from '@material-ui/icons/People';
import PaymentIcon from '@material-ui/icons/Payment';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExploreIcon from '@material-ui/icons/Explore';

const useStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.text.primary,
  },
  icon: {
    margin: theme.spacing(1),
    fontSize: 32,
  },
}));

export function Aside() {
  const classes = useStyles();
  const uiService = useHtmlClassService();

  const layoutProps = useMemo(() => {
    return {
      asideClassesFromConfig: uiService.getClasses("aside", true),
      asideSecondaryDisplay: objectPath.get(
        uiService.config,
        "aside.secondary.display"
      ),
      asideSelfMinimizeToggle: objectPath.get(
        uiService.config,
        "aside.self.minimize.toggle"
      ),
      extrasSearchDisplay: objectPath.get(
        uiService.config,
        "extras.search.display"
      ),
      extrasNotificationsDisplay: objectPath.get(
        uiService.config,
        "extras.notifications.display"
      ),
      extrasQuickActionsDisplay: objectPath.get(
        uiService.config,
        "extras.quick-actions.display"
      ),
      extrasQuickPanelDisplay: objectPath.get(
        uiService.config,
        "extras.quick-panel.display"
      ),
      extrasLanguagesDisplay: objectPath.get(
        uiService.config,
        "extras.languages.display"
      ),
      extrasUserDisplay: objectPath.get(
        uiService.config,
        "extras.user.display"
      ),
    };
  }, [uiService]);

  const tabs = {
    tabId0: "kt_aside_tab_0",
    tabId1: "kt_aside_tab_1",
    tabId2: "kt_aside_tab_2",
    tabId3: "kt_aside_tab_3",
    tabId4: "kt_aside_tab_4",
    tabId5: "kt_aside_tab_5",
    tabId6: "kt_aside_tab_6",
  };
  const [activeTab, setActiveTab] = useState({});
  const handleTabChange = (id) => {
    setActiveTab(id);
    const asideWorkspace = KTUtil.find(
      document.getElementById("kt_aside"),
      ".aside-secondary .aside-workspace"
    );
    if (asideWorkspace) {
      KTUtil.scrollUpdate(asideWorkspace);
    }
  };

  return (
    <>
      {/* begin::Aside */}
      <div
        id="kt_aside"
        className={`aside aside-left d-flex ${layoutProps.asideClassesFromConfig}`}
      >
        {/* begin::Primary */}
        <div className="aside-primary d-flex flex-column align-items-center flex-row-auto">
          <Brand />
          {/* begin::Nav Wrapper */}
          <div className="aside-nav d-flex flex-column align-items-center flex-column-fluid py-5 scroll scroll-pull">
            {/* begin::Nav */}
            <ul className="list-unstyled flex-column">


              {/* begin::Item */}
              <li
                className="nav-item mb-3"
                data-toggle="tooltip"
                data-placement="rigth"
                data-container="body"
                data-boundary="window"
                title="Dashboard"
              >
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip id="latest-reports">Dashboard</Tooltip>
                  }
                >

                  <NavLink className={`nav-link btn btn-icon btn-clean btn-lg ${activeTab ===
                      tabs.tabId0 && "active"}`} to="/dashboard">
                    <span className="svg-icon svg-icon-lg">
                      <DashboardIcon className={classes.icon} />
                    </span>
                  </NavLink>

                </OverlayTrigger>
              </li>
              {/* end::Item */}

              {/* begin::Item */}
              <li
                className="nav-item mb-3"
                data-toggle="tooltip"
                data-placement="rigth"
                data-container="body"
                data-boundary="window"
                title="Staff Management"
              >
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip id="latest-reports">Staff Management</Tooltip>
                  }
                >
                <NavLink className={`nav-link btn btn-icon btn-clean btn-lg ${activeTab ===
                      tabs.tabId1 && "active"}`} to="/staff/all">
                    <span className="svg-icon svg-icon-lg">
                      <AssignmentIndIcon className={classes.icon} />
                    </span>
                  </NavLink>
                </OverlayTrigger>

              </li>
              {/* end::Item */}

              {/* begin::Item */}
              <li
                className="nav-item mb-3"
                data-toggle="tooltip"
                data-placement="rigth"
                data-container="body"
                data-boundary="window"
                title="User Management"
              >
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip id="latest-reports">User Management</Tooltip>
                  }
                >
                <NavLink className={`nav-link btn btn-icon btn-clean btn-lg ${activeTab ===
                      tabs.tabId2 && "active"}`} to="/user/all">
                    <span className="svg-icon svg-icon-lg">
                      <PeopleIcon className={classes.icon} />
                    </span>
                  </NavLink>
                </OverlayTrigger>

              </li>
              {/* end::Item */}

              {/* begin::Item */}
              <li
                className="nav-item mb-3"
                data-toggle="tooltip"
                data-placement="rigth"
                data-container="body"
                data-boundary="window"
                title="Task Templates"
              >
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip id="latest-reports">Task Templates</Tooltip>
                  }
                >
                <NavLink className={`nav-link btn btn-icon btn-clean btn-lg ${activeTab ===
                      tabs.tabId3 && "active"}`} to="/task-template/all">
                    <span className="svg-icon svg-icon-lg">
                      <FileCopyIcon className={classes.icon} />
                    </span>
                  </NavLink>
                </OverlayTrigger>

              </li>
              {/* end::Item */}

              {/* begin::Item */}
              <li
                className="nav-item mb-3"
                data-toggle="tooltip"
                data-placement="rigth"
                data-container="body"
                data-boundary="window"
                title="Projects"
              >
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip id="latest-reports">Projects</Tooltip>
                  }
                >
                <NavLink className={`nav-link btn btn-icon btn-clean btn-lg ${activeTab ===
                      tabs.tabId4 && "active"}`} to="/project/all">
                    <span className="svg-icon svg-icon-lg">
                      <AccountTreeIcon className={classes.icon} />
                    </span>
                  </NavLink>
                </OverlayTrigger>

              </li>
              {/* end::Item */}

              {/* begin::Item */}
              <li
                className="nav-item mb-3"
                data-toggle="tooltip"
                data-placement="rigth"
                data-container="body"
                data-boundary="window"
                title="Portfolios"
              >
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip id="latest-reports">Portfolios</Tooltip>
                  }
                >
                <NavLink className={`nav-link btn btn-icon btn-clean btn-lg ${activeTab ===
                      tabs.tabId5 && "active"}`} to="/portfolio/all">
                    <span className="svg-icon svg-icon-lg">
                      <BusinessCenterIcon className={classes.icon} />
                    </span>
                  </NavLink>
                </OverlayTrigger>

              </li>
              {/* end::Item */}

              {/* begin::Item */}
              <li
                className="nav-item mb-3"
                data-toggle="tooltip"
                data-placement="rigth"
                data-container="body"
                data-boundary="window"
                title="Roadmaps"
              >
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip id="latest-reports">Roadmaps</Tooltip>
                  }
                >
                  <NavLink className={`nav-link btn btn-icon btn-clean btn-lg ${activeTab ===
                      tabs.tabId6 && "active"}`} to="/roadmap/all">
                    <span className="svg-icon svg-icon-lg">
                      <ExploreIcon className={classes.icon} />
                    </span>
                  </NavLink>
                </OverlayTrigger>
              </li>
              {/* end::Item */}

              {/* begin::Item */}
              <li
                className="nav-item mb-3"
                data-toggle="tooltip"
                data-placement="rigth"
                data-container="body"
                data-boundary="window"
                title="Update Account"
              >
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip id="latest-reports">Update Account</Tooltip>
                  }
                >
                  <NavLink className={`nav-link btn btn-icon btn-clean btn-lg ${activeTab ===
                      tabs.tabId6 && "active"}`} to="/user/update-account">
                    <span className="svg-icon svg-icon-lg">
                      <AccountCircleIcon className={classes.icon} />
                    </span>
                  </NavLink>
                </OverlayTrigger>
              </li>
              {/* end::Item */}

            </ul>
            {/* end::Nav */}
          </div>
          {/* end::Nav Wrapper */}

          {/* begin::Footer */}
          <div className="aside-footer d-flex flex-column align-items-center flex-column-auto py-4 py-lg-10">
            {/* begin::Aside Toggle */}
            {layoutProps.asideSecondaryDisplay &&
              layoutProps.asideSelfMinimizeToggle && (
                <>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip id="toggle-aside">Toggle Aside</Tooltip>}
                  >
                    <span
                      className="aside-toggle btn btn-icon btn-primary btn-hover-primary aside-toggle-active shadow-sm"
                      id="kt_aside_toggle"
                    >
                      <i className="ki ki-bold-arrow-back icon-sm" />
                    </span>
                  </OverlayTrigger>
                </>
              )}
            {/* end::Aside Toggle */}

            {/* begin::Search }
            {layoutProps.extrasSearchDisplay && (
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip id="toggle-search">Quick Search</Tooltip>}
              >
                <a
                  href="#"
                  className="btn btn-icon btn-clean btn-lg mb-1"
                  id="kt_quick_search_toggle"
                >
                  <span className="svg-icon svg-icon-lg">
                    <SVG
                      src={toAbsoluteUrl("/media/svg/icons/General/Search.svg")}
                    />
                  </span>
                </a>
              </OverlayTrigger>
            )}
            {/* end::Search */}

            {/* begin::Notifications */}
            {layoutProps.extrasNotificationsDisplay && (
              <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip id="toggle-notifications">Notifications</Tooltip>
                }
              >
                <a
                  href="#"
                  className="btn btn-icon btn-clean btn-lg mb-1 position-relative"
                  id="kt_quick_notifications_toggle"
                  data-placement="right"
                  data-container="body"
                  data-boundary="window"
                >
                  <span className="svg-icon svg-icon-lg">
                    <SVG
                      src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")}
                    />
                  </span>
                </a>
              </OverlayTrigger>
            )}
            {/* end::Notifications */}

            {/* begin::Quick Actions }
            {layoutProps.extrasQuickActionsDisplay && (
              <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip id="toggle-quick-actions">Quick Actions</Tooltip>
                }
              >
                <a
                  href="#"
                  className="btn btn-icon btn-clean btn-lg mb-1"
                  id="kt_quick_actions_toggle"
                >
                  <span className="svg-icon svg-icon-lg">
                    <SVG
                      src={toAbsoluteUrl(
                        "/media/svg/icons/Media/Equalizer.svg"
                      )}
                    />
                  </span>
                </a>
              </OverlayTrigger>
            )}
            {/* end::Quick Actions */}

            {/* begin::Quick Panel }
            {layoutProps.extrasQuickPanelDisplay && (
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip id="toggle-quick-panel">Quick Panel</Tooltip>}
              >
                <a
                  href="#"
                  className="btn btn-icon btn-clean btn-lg mb-1 position-relative"
                  id="kt_quick_panel_toggle"
                  data-placement="right"
                  data-container="body"
                  data-boundary="window"
                >
                  <span className="svg-icon svg-icon-lg">
                    <SVG
                      src={toAbsoluteUrl(
                        "/media/svg/icons/Layout/Layout-4-blocks.svg"
                      )}
                    />
                  </span>
                  <span className="label label-sm label-light-danger label-rounded font-weight-bolder position-absolute top-0 right-0 mt-1 mr-1">
                    3
                  </span>
                </a>
              </OverlayTrigger>
            )}
            {/* end::Quick Panel */}

            {/* begin::Languages*/}
            {layoutProps.extrasLanguagesDisplay && <LanguageSelectorDropdown />}
            {/* end::Languages */}

            {/* begin::User*/}
            {layoutProps.extrasUserDisplay && <QuickUserToggler />}
            {/* end::User */}
          </div>
          {/* end::Footer */}
        </div>
        {/* end::Primary */}

        {layoutProps.asideSecondaryDisplay && (
          <>

          </>
        )}
      </div>
      {/* end::Aside */}
    </>
  );
}
