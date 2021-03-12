import React, {Suspense, lazy} from "react";
import {Redirect, Switch, Route, BrowserRouter} from "react-router-dom";
import {LayoutSplashScreen, ContentRoute} from "../_metronic/layout";
import {BuilderPage} from "./pages/BuilderPage";
import {DashboardPage} from "./pages/DashboardPage";
import {Users} from "./pages/Users/Users";
import {UserDetail} from "./pages/Users/UserDetail";
import {UpdateAccount} from "./pages/Users/UpdateAccount";
import {EditUser} from "./pages/Users/EditUser";

import {Roadmaps} from "./pages/Roadmaps/Roadmaps";
import {CreateRoadmap} from "./pages/Roadmaps/CreateRoadmap";
import {EditRoadmap} from "./pages/Roadmaps/EditRoadmap";

import {Staffs} from "./pages/Staffs/Staffs";
import {CreateStaff} from "./pages/Staffs/CreateStaff";
import {EditStaff} from "./pages/Staffs/EditStaff";

import {TaskTemplates} from "./pages/TaskTemplates/TaskTemplates";
import {CreateTaskTemplate} from "./pages/TaskTemplates/CreateTaskTemplate";
import {EditTaskTemplate} from "./pages/TaskTemplates/EditTaskTemplate";

import {Equities} from "./pages/Equities/Equities";
import {CreateEquity} from "./pages/Equities/CreateEquity";

import {CreateTask} from "./pages/Tasks/CreateTask";
import {EditTask} from "./pages/Tasks/EditTask";

import {Projects} from "./pages/Projects/Projects";
import {CreateProject} from "./pages/Projects/CreateProject";
import {EditProject} from "./pages/Projects/EditProject";
import {ProjectDetail} from "./pages/Projects/ProjectDetail";

import {Portfolios} from "./pages/Portfolios/Portfolios";

import {CreateFile} from "./pages/Files/CreateFile";
import {CreateTaskUpdate} from "./pages/TaskUpdate/CreateTaskUpdate";

const GoogleMaterialPage = lazy(() =>
    import("./modules/GoogleMaterialExamples/GoogleMaterialPage")
);
const ReactBootstrapPage = lazy(() =>
    import("./modules/ReactBootstrapExamples/ReactBootstrapPage")
);
const ECommercePage = lazy(() =>
    import("./modules/ECommerce/pages/eCommercePage")
);

export default function BasePage() {
    // useEffect(() => {
    //   console.log('Base page');
    // }, []) // [] - is required if you need only one call
    // https://reactjs.org/docs/hooks-reference.html#useeffect

    console.log(process.env);

    return (
        <Suspense fallback={<LayoutSplashScreen/>}>
                <Switch>
                    {
                        /* Redirect from root URL to /dashboard. */
                        <Redirect exact from="/" to="/dashboard"/>
                    }
                    <ContentRoute path="/dashboard" component={DashboardPage}/>
                    <ContentRoute path="/builder" component={BuilderPage}/>
                    <Route path="/google-material" component={GoogleMaterialPage}/>
                    <Route path="/react-bootstrap" component={ReactBootstrapPage}/>
                    <Route path="/e-commerce" component={ECommercePage}/>
                    <Route path="/user/all" component={Users}/>
                    <Route path="/user/detail/:id" component={UserDetail}/>
                    <Route path="/user/update-account" component={UpdateAccount}/>
                    <Route path="/user/edit/:id" component={EditUser}/>

                    <Route path="/staff/all" component={Staffs}/>
                    <Route path="/staff/create" component={CreateStaff}/>
                    <Route path="/staff/edit/:id" component={EditStaff}/>

                    <Route path="/task-template/all" component={TaskTemplates}/>
                    <Route path="/task-template/create" component={CreateTaskTemplate}/>
                    <Route path="/task-template/edit/:id" component={EditTaskTemplate}/>

                    <Route path="/task/create/:project_id" component={CreateTask}/>
                    <Route path="/task/edit/:project_id/:id" component={EditTask}/>

                    <Route path="/equity/all/:project_id" component={Equities}/>
                    <Route path="/equity/create/:project_id" component={CreateEquity}/>

                    <Route path="/roadmap/all/:id?" component={Roadmaps}/>
                    <Route path="/roadmap/create/:id?" component={CreateRoadmap}/>
                    <Route path="/roadmap/edit/:id" component={EditRoadmap}/>

                    <Route path="/project/all" component={Projects}/>
                    <Route path="/project/create" component={CreateProject}/>
                    <Route path="/project/edit/:id" component={EditProject}/>
                    <Route path="/project/detail/:id" component={ProjectDetail}/>

                    <Route path="/portfolio/all" component={Portfolios}/>

                    <Route path="/file/create/:project_id/:task_id" component={CreateFile}/>
                    <Route path="/taskupdate/create/:project_id/:task_id" component={CreateTaskUpdate}/>

                    <Redirect to="error/error-v1"/>
                </Switch>
        </Suspense>
    );
}
