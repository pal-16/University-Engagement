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
import { getProjects } from "../../actions/projectActions";

const useStyles = makeStyles((theme) => ({
    btns: {
        '& > *': {
            margin: theme.spacing(1),
        },
        marginTop: "5px"
    },
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

const DisplayProjects = () => {
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
        getProjects({ token }).then((res) => {
            if (res.error) {
                setLoading(false);
            } else {
                setApplications(res.data.projects);

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

        >
            <Grid
                container
                spacing={2}
                style={{ width: "100%", marginBottom: "16px" }}
            >
                <Grid
                    item
                    xs={12}
                    md={4}
                    style={{ textAlign: isSmallScreen ? "center" : "left" }}
                >
                    <Typography variant="h6">
                        {"Crowdfunding Posts".toLocaleUpperCase()}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={4} style={{ textAlign: "center" }}>
                    {userType === "student" && (
                        <Typography variant="h6">
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    history.push("/student/projects/new");
                                }}
                                startIcon={<Add />}
                            >
                                New Post
                            </Button>
                        </Typography>
                    )}
                </Grid>

            </Grid>
            <Divider variant="fullWidth" className={classes.divider} />
            <div>

                <Typography
                    color="textPrimary"
                    gutterBottom
                    variant="h2"
                    align="center"
                >

                </Typography>

                {applications.map((application) => (
                    <>
                        <Link
                            to={`/student/projects/${application._id}`}
                            className={classes.titleLink}
                        >
                            <Card className={classes.card} variant="outlined">
                                <CardHeader title={application.title} align="center" />
                                <Typography color="textSecondary" variant="subtitle4" style={{ marginLeft: "350px" }}>
                                    Created By {application.userID.name} |    Created at {application.createdAt}
                                </Typography>
                                <hr />
                                <CardContent>
                                    <Typography color="textSecondary" variant="h6">
                                        {application.description}
                                    </Typography>
                                    <Typography color="textSecondary" variant="substitle3">
                                        <b> Developed during </b> : {application.semester}
                                    </Typography>

                                    <div className={classes.btns}>
                                        {application.tags.map(name => <Button color="primary" variant="contained" key={name}> {name} </Button>)}
                                    </div>


                                    {/* <FacultyActions
                                            position={isSmallScreen ? "center" : "start"}
                                            applicationData={application}
                                            setLoading={setLoading}
                                            id={application._id}
                                        /> */}
                                </CardContent>
                            </Card>
                        </Link>
                        <br />

                    </>

                ))}



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

export default DisplayProjects;
