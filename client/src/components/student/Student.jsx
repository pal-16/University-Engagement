import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "../common/Login";
import Register from "./auth/Register";
import ProtectedRoute from "../../components/common/ProtectedRoute";
import ApplicationsList from "../applications/ApplicationsList";
import ApplicationDetail from "../applications/ApplicationDetail";
import StudentActions from "../applications/StudentActions";
import NewApplication from "../applications/NewApplication";
//import DashboardLayout from "../../components/common/Dashboard";
import CreatePost from "../crowdfunding/CreatePost";
import CrowdfundingPosts from "../crowdfunding/DisplayPosts";
import CrowdfundingUserPosts from "../crowdfunding/UserPosts";
import DashboardLayout from "../DashboardLayout/index";
import NewProject from "../project/NewProject";
import DisplayProjects from "../project/DisplayProject";
import ProjectDetail from "../project/ProjectDetail";
import DonorActions from "../crowdfunding/DonorActions";
import DisplayUserProjects from "../project/UserProjects";

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
        path="/student/applications/new"
        component={NewApplication}
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
        path="/student/crowdfundings/new"
        component={CreatePost}
        userType={"student"}
      />
      <ProtectedRoute
        exact
        path="/student/crowdfundings/displayAll"
        component={() => <CrowdfundingPosts actions={DonorActions} />}
        userType={"student"}
      />
      <ProtectedRoute
        exact
        path="/student/crowdfundings/displayUserPosts"
        component={() => <CrowdfundingUserPosts />}
        userType={"student"}
      />
      <ProtectedRoute
        exact
        path="/student/projects/new"
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
        path="/student/projects/:id"
        component={() => <  ProjectDetail />}
        userType={"student"}
      />
      <ProtectedRoute
        exact
        path="/student/projects/displayUserProjects"
        component={() => <  DisplayUserProjects />}
        userType={"student"}
      />

    </Switch>
  );
};

export default Student;
