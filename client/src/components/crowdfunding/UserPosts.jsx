import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CardHeader from "@material-ui/core/CardHeader";
import {
    Button,
    Box,
    Typography,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Grid,
    useMediaQuery
} from "@material-ui/core";
import {
    AccessTimeOutlined,
    CheckCircle,
    ClearOutlined,
    Add
} from "@material-ui/icons";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import Spinner from "../../components/common/Spinner";
import { useAuthState } from "../../context/AuthContext";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import FacultyActions from "./DonorActions";
import { getUserPosts } from "../../actions/crowdfundingActions";

const useStyles = makeStyles((theme) => ({
    container: {
        minHeight: "80vh",
        padding: "20px"
    },
    divider: {
        backgroundColor: "rgba(0, 0, 0, 0.12)",
        width: "100%"
    },
    titleLink: {
        textDecoration: "none",
        color: theme.palette.primary.main
    },
    root: {
        "&$selected": {
            backgroundColor: theme.palette.primary.main,
            color: "white"
        },
        "&$selected&:hover": {
            backgroundColor: theme.palette.primary.main,
            color: "white"
        }
    },
    selected: {}
}));

const CrowdfundingUserPosts = () => {
    const history = useHistory();
    const classes = useStyles();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const { userID, token, userType } = useAuthState();
    const [loading, setLoading] = useState(false);
    const [applications, setApplications] = useState([]);
    //   const [filteredApplications, setFilteredApplications] = useState([]);
    const [statusFilter, setStatusFilter] = useState("All");

    useEffect(() => {
        setLoading(true);
        getUserPosts({ id: userID, token, userType }).then((res) => {
            console.log("getting again");
            if (res.error) {
                setLoading(false);
            } else {
                console.log(res.data);

                // console.log(res.data.Crowdfundings);
                setApplications(res.data.posts);
                setLoading(false);
            }
        });
    }, [token, userID, userType]);


    return loading ? (
        <Spinner />
    ) : (
        <Box
            className={classes.container}
            display="flex"
            flexDirection="column"
            justifyContent="start"

        >   <Box

            align="center"
        >

                <Typography variant="h6">
                    {"Crowdfunding Posts".toLocaleUpperCase()}
                </Typography>




                {userType === "student" && (
                    <Typography variant="h6">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                history.push("/student/crowdfundings/new");
                            }}
                            startIcon={<Add />}
                        >
                            New Post
                        </Button>
                    </Typography>
                )}
                <br />
            </Box>
            <Divider variant="fullWidth" className={classes.divider} />
            <div>
                <Container>
                    <Typography
                        color="textPrimary"
                        gutterBottom
                        variant="h2"
                        align="center"
                    >

                    </Typography>
                    <Grid container spacing={2}>
                        {applications.map((application) => (

                            <Grid item xs={12} sm={6} key={application._id}>
                                <Card className={classes.card}>
                                    <CardHeader title={application.title} align="center" />
                                    <Typography color="textSecondary" variant="subtitle4" style={{ marginLeft: "45px" }}>
                                        Created By {application.userID.name} |    Created at {application.createdAt}
                                    </Typography>
                                    <hr />
                                    <CardContent>
                                        <Typography color="primary" variant="subtitle4">
                                            <b>    Description   </b>: {application.description}
                                        </Typography>
                                        <br />
                                        <br />
                                        <Typography color="primary" variant="subtitle4">
                                            <b>  Amount Needed </b>: {application.amountNeeded}
                                        </Typography>
                                        <br />
                                        <br />
                                        <Typography color="primary" variant="subtitle4">
                                            <b> Current Amount </b>: {application.currentAmount}
                                        </Typography>
                                        <br />
                                        <br />

                                        <Button
                                            variant="contained"
                                            color="primary"
                                            style={{ backgroundColor: "#f44336", color: "white" }}


                                        >
                                            {application.status}
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </div>


            {/* <TableContainer component={Box}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ textAlign: "center" }}>
                                <Typography variant="h6">Title</Typography>
                            </TableCell>
                            {!isSmallScreen && (
                                <TableCell style={{ textAlign: "center" }}>
                                    <Typography variant="h6">Domain of Achievement</Typography>
                                </TableCell>
                            )}
                            <TableCell style={{ textAlign: "center" }}>
                                <Typography variant="h6">Application Status</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredApplications.map((application) => (
                            <TableRow key={application._id}>
                                <TableCell style={{ fontSize: "1.1rem", textAlign: "center" }}>
                                    <Link
                                        to={`/${userType}/applications/${application._id}`}
                                        className={classes.titleLink}
                                    >
                                        {application.title}
                                    </Link>
                                </TableCell>
                                {!isSmallScreen && (
                                    <TableCell
                                        style={{ fontSize: "1.1rem", textAlign: "center" }}
                                    >
                                        {application.domainAchievement}
                                    </TableCell>
                                )}
                                <TableCell style={{ fontSize: "1.1rem", textAlign: "center" }}>
                                    <StatusChip status={application.status} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer> */}
        </Box >
    );
};

export default CrowdfundingUserPosts;
