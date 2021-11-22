import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "../common/Login";
import Register from "./auth/Register";
import ProtectedRoute from "../../components/common/ProtectedRoute";
import ApplicationsList from "../applications/ApplicationsList";
import ApplicationDetail from "../applications/ApplicationDetail";
import StudentActions from "../applications/StudentActions";
import NewApplication from "../applications/NewApplication";
import DashboardLayout from "../../components/common/Dashboard";
import CreatePost from "../crowdfunding/CreatePost";
import CrowdfundingPosts from "../crowdfunding/DisplayPosts";
import NewProject from "../project/NewProject";
import DisplayProjects from "../project/DisplayProject";
import ProjectDetail from "../project/ProjectDetail";
const Student = () => {
  return (
    <Switch>
      <Route path="/student/login">
        <Login userType="student" name="Student" />
      </Route>
      <Route path="/student/register" component={Register} />
      <ProtectedRoute
        exact
        path="/student/profile"
        component={DashboardLayout}
        userType={"student"}
      />
      <ProtectedRoute
        exact
        path="/student/applications/displayAll"
        component={ApplicationsList}
        userType={"student"}
      />
      <ProtectedRoute
        exact
        path="/student/applications/:id"
        component={() => <ApplicationDetail actions={StudentActions} />}
        userType={"student"}
      />
      <ProtectedRoute
        exact
        path="/student/crowdfunding/new"
        component={CreatePost}
        userType={"student"}
      />
      <ProtectedRoute
        exact
        path="/student/crowdfundings/displayAll"
        component={CrowdfundingPosts}
        userType={"student"}
      />
      <ProtectedRoute
        exact
        path="/student/project/new"
        component={NewProject}
        userType={"student"}
      />
      <ProtectedRoute
        exact
        path="/student/projects/displayAll"
        component={DisplayProjects}
        userType={"student"}
      />
      <ProtectedRoute
        exact
        path="/student/project/:id"
        component={() => <  ProjectDetail />}
        userType={"student"}
      />

    </Switch>
  );
};

export default Student;
