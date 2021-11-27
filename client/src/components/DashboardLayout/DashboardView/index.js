import React, { useEffect, useState } from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";
import Total from "./Total";
import { ContactSupport, PeopleOutlined } from "@material-ui/icons";
import UserDetails from "./UserDetails";
import Page from "../Page";
import { useAuthState } from "../../../context/AuthContext";
import { getStudentRank } from "../../../actions/applicationActions";
import Spinner from "../../common/Spinner"
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
   
  }
}));

const Dashboard = ({  }) => {
  const classes = useStyles();
  const [rank, setRank] = useState("");
  const [loading, setLoading] = useState(true);
  const { userType, userID, token,userCoins } = useAuthState();
  useEffect(() => {
    setLoading(true);
    if (userType === "student") {
      getStudentRank({ id: userID, token }).then((res) => {
        console.log(res);
        console.log(res.data);
        setRank(res.data);
      })
    }
    setLoading(false);
  }, [token, userID, userType]);
  
  return loading ? (
    <Spinner />
  ) :
  (
  
        <Grid container spacing={3}>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <UserDetails />
          </Grid>
          <Grid item lg={4} sm={6} xl={3} xs={12} container spacing={3}>
          <Grid item xs={12}>
              <Total
                
                counter={rank}
                apiRoute="/queries/getCount"
                cardTitle="Institute Rank"
                Icon={ContactSupport}
              />
            <Grid item xs={12}>
              <Total
               
                counter={userCoins}
                apiRoute="/admin/getCountUsers"
                cardTitle="Coins Achieved"
                Icon={PeopleOutlined}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <Total
                
                counter={4}
                apiRoute="/queries/getCount"
                cardTitle="Project Score"
                Icon={ContactSupport}
              />
            </Grid> */}
           
            </Grid>
          </Grid>
        </Grid>
    
 )
  
};

export default Dashboard;
