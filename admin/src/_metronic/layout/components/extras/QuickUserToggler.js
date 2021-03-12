/* eslint-disable no-restricted-imports */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, {useMemo} from "react";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
// import { useSelector } from "react-redux";
import SVG from "react-inlinesvg";
import objectPath from "object-path";
import {toAbsoluteUrl} from "../../../_helpers";
import {useHtmlClassService} from "../../_core/MetronicLayout";
import {UserProfileDropdown} from "./dropdowns/UserProfileDropdown";
import {makeStyles} from '@material-ui/core/styles';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import {Link} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        color: theme.palette.text.primary,
    },
    icon: {
        margin: theme.spacing(1),
        fontSize: 32,
    },
}));

export function QuickUserToggler() {
    const classes = useStyles();
    // const { user } = useSelector((state) => state.auth);
    const uiService = useHtmlClassService();
    const layoutProps = useMemo(() => {
        return {
            offcanvas:
                objectPath.get(uiService.config, "extras.user.layout") === "offcanvas",
        };
    }, [uiService]);

    return (
        <>
            {/*layoutProps.offcanvas && (
        <OverlayTrigger
          placement="right"
          overlay={<Tooltip id="quick-user-tooltip">User Profile</Tooltip>}
        >
          <div
            className="btn btn-icon btn-clean btn-lg w-40px h-40px"
            id="kt_quick_user_toggle"
            data-placement="right"
            data-container="body"
            data-boundary="window"
          >
            <span className="symbol symbol-30 symbol-lg-40">
              <span className="svg-icon svg-icon-lg">
                <SVG src={toAbsoluteUrl("/media/svg/icons/General/User.svg")} />
              </span>
            </span>
          </div>
        </OverlayTrigger>

      )*/}
            <OverlayTrigger
                placement="right"
                overlay={<Tooltip id="sign-out">Sign Out</Tooltip>}
            >
                <div
                    className="btn btn-icon btn-clean btn-lg w-40px h-40px"
                    id=""
                    data-placement="right"
                    data-container="body"
                    data-boundary="window"
                >
            <span className="symbol symbol-30 symbol-lg-40">
                <Link to="/logout" className={`nav-link btn btn-icon btn-clean btn-lg`}>
              <span className="svg-icon svg-icon-lg">
                  <PowerSettingsNewIcon className={classes.icon}/>
              </span>
                </Link>

            </span>
                </div>
            </OverlayTrigger>
            {!layoutProps.offcanvas && <UserProfileDropdown/>}
        </>
    );
}
