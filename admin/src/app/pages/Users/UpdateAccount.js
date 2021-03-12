import React, {useEffect, useState, useRef} from "react";
import axios from "axios";
import alertify from "alertifyjs";
import {API_URL} from '../constants.js';

export function UpdateAccount() {

    const [user, setUser] = useState({});

    const current_password = useRef();
    const new_password = useRef();
    const firstname = useRef();
    const lastname = useRef();

    useEffect(() => {

        axios.get(API_URL + 'backend/user/me' ).then((response) => {

            if (response.data.code === 200) {
                setUser(response.data.data);
            } else if (response.data.code === 404) {
                alertify.error(response.data.message);
                return null;
            }
        })
            .catch((error) => {

                if (error.message === 'Request failed with status code 401') {
                    //props.logout();
                }
            });

    }, []);

    const handleChangePassword = (e) => {
        e.preventDefault();

        axios.post(API_URL + "backend/user/change-password",
            {
                current_password: current_password.current.value,
                new_password: new_password.current.value
            }
        )
            .then((response) => {
                if (response.data.code == 200) {
                    alertify.success(response.data.message);
                    current_password.current.value = '';
                    new_password.current.value = '';
                } else if (response.data.code === 404) {
                    alertify.error(response.data.message);
                    return null;
                }
            });
    }

    const handleUpdateAccount = (e) => {
        e.preventDefault();
        axios.post(API_URL + "backend/user/update",
            {
                firstname: firstname.current.value,
                lastname: lastname.current.value,
            }
        )
            .then((response) => {
                if (response.data.code == 200) {
                    alertify.success(response.data.message);

                } else if (response.data.code === 404) {
                    alertify.error(response.data.message);
                    return null;
                }
            });
    }

    return (
        <>
            <form className="card card-custom mb-5">

                {/* begin::Header */}
                <div className="card-header py-3">
                    <div className="card-title align-items-start flex-column">
                        <h3 className="card-label font-weight-bolder text-dark">
                            Update Account
                        </h3>
                        <span
                            className="text-muted font-weight-bold font-size-sm mt-1">Change your account information</span>
                    </div>
                    <div className="card-toolbar">
                    </div>
                </div>
                {/* end::Header */}
                {/* begin::Form */}
                <div className="form">
                    <div className="card-body">

                        <div className="form-group row">
                            <label className="col-xl-3 col-lg-3 col-form-label text-alert">
                                First Name
                            </label>
                            <div className="col-lg-9 col-xl-6">
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    className={`form-control form-control-lg form-control-solid mb-2`}
                                    name="firstname"
                                    ref={firstname}
                                    defaultValue={user.firstname}
                                />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-xl-3 col-lg-3 col-form-label text-alert">
                                Last Name
                            </label>
                            <div className="col-lg-9 col-xl-6">
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    className={`form-control form-control-lg form-control-solid mb-2`}
                                    name="lasttname"
                                    ref={lastname}
                                    defaultValue={user.lastname}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary pull-right mr-2"
                            onClick={handleUpdateAccount}
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
                {/* end::Form */}
            </form>
            <form className="card card-custom">

                {/* begin::Header */}
                <div className="card-header py-3">
                    <div className="card-title align-items-start flex-column">
                        <h3 className="card-label font-weight-bolder text-dark">
                            Change Password
                        </h3>
                        <span
                            className="text-muted font-weight-bold font-size-sm mt-1">Change your account password</span>
                    </div>
                    <div className="card-toolbar">
                    </div>
                </div>
                {/* end::Header */}
                {/* begin::Form */}
                <div className="form">
                    <div className="card-body">

                        <div className="form-group row">
                            <label className="col-xl-3 col-lg-3 col-form-label text-alert">
                                Current Password
                            </label>
                            <div className="col-lg-9 col-xl-6">
                                <input
                                    type="password"
                                    placeholder="Current Password"
                                    className={`form-control form-control-lg form-control-solid mb-2`}
                                    name="currentPassword"
                                    ref={current_password}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-xl-3 col-lg-3 col-form-label text-alert">
                                New Password
                            </label>
                            <div className="col-lg-9 col-xl-6">
                                <input
                                    type="password"
                                    placeholder="New Password"
                                    className={`form-control form-control-lg form-control-solid`}
                                    name="password"
                                    ref={new_password}
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary pull-right mr-2"
                            onClick={handleChangePassword}
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
                {/* end::Form */}
            </form>

        </>
    );
}