import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { FaComment, FaThumbsUp, FaTag } from "react-icons/fa";
import CardHeader from "@material-ui/core/CardHeader";
import {
    Button,
    Box,
    Typography,
    Divider,
    Grid,
    useMediaQuery
} from "@material-ui/core";
import {
    Add
} from "@material-ui/icons";
import Spinner from "../../components/common/Spinner";
import { useAuthState } from "../../context/AuthContext";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { getProjects } from "../../actions/projectActions";


const useStyles = makeStyles((theme) => ({
    btns: {
        '& > *': {
            margin: theme.spacing(1),
        },
        marginTop: "2px",

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
    card: {
        boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.7)",
        backgroundColor: "#fafafa",
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
    const [statusFilter, setStatusFilter] = useState("All");
    const [filteredApplications, setFilteredApplications] = useState([]);

    const [semesterFilter, setSemesterFilter] = useState("All");

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
    useEffect(() => {


        if (statusFilter === "All" && semesterFilter === "All") {
            setFilteredApplications(applications);
        } else {
            let temp = applications.filter((a) => {
                if (statusFilter === "All")
                    return a.semester === semesterFilter;
                else if (semesterFilter === "All")
                    return a.projectDomain === statusFilter;
                else
                    return a.projectDomain === statusFilter && a.semester === semesterFilter;
            });
            console.log(temp);
            setFilteredApplications(temp);
        }

    }, [semesterFilter, statusFilter, applications]);



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
                        {"Projects".toLocaleUpperCase()}
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
                                New Project
                            </Button>
                        </Typography>
                    )}
                </Grid>

                <Grid
                    item
                    xs={12}
                    md={4}
                    style={{ textAlign: isSmallScreen ? "center" : "right" }}
                >


                    <select options={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                        <option value="All">Domains</option>
                        <option value="Web Development">Web Development</option>
                        <option value="App Development">App Development</option>
                        <option value="Blockchain">Blockchain</option>
                        <option value="Machine Learning">Machine Learning</option>
                    </select>

                    <select options={semesterFilter} onChange={(e) => setSemesterFilter(e.target.value)}>
                        <option value="All">Semester</option>
                        <option value="Semester 1">1</option>
                        <option value="Semester 2">2</option>
                        <option value="Semester 3">3</option>
                        <option value="Semester 4">4</option>
                        <option value="Semester 5">5</option>
                        <option value="Semester 6">6</option>
                        <option value="Semester 7">7</option>
                        <option value="Semester 8">8</option>
                    </select>
                </Grid>

            </Grid>
            <div>

                <Grid container spacing={3}>
                    {filteredApplications.map((application) => (
                        <Grid item xs={12} sm={6} key={application._id}>
                            <Link
                                to={`/student/projects/${application._id}`}
                                className={classes.titleLink}
                            >

                                <Card className={classes.card} variant="outlined" style={{ height: "100%" }}>
                                    <CardMedia style={{ height: "150px" }} image={application.files[0]} />
                                    <CardHeader title={application.title} align="center" />

                                    <CardContent>
                                        <Divider variant="fullWidth" className={classes.divider} />
                                        {/* <Typography color="textSecondary" variant="substitle3">
                                            <b> Description </b> :  {application.description.slice(0, 250)}<b>{"...Read More"}</b>
                                        </Typography> */}

                                        <Typography color="white" variant="substitle2">
                                            <b> Project Domain </b> : {application.projectDomain}
                                        </Typography>
                                        <br />

                                        <Typography color="white" variant="substitle2"
                                        >
                                            <b> Developed during </b> :
                                        </Typography>
                                        <Typography color="white" variant="substitle2"
                                        > {application.semester}
                                        </Typography>


                                        <br />
                                        <br />



                                        <Typography color="textSecondary" variant="h5">
                                            <FaComment></FaComment>{application.comments.length} &nbsp; <FaThumbsUp></FaThumbsUp>{application.like.length}
                                        </Typography>

                                        <br />

                                        <div className={classes.btns} >
                                            {application.tags.map(name => <Button color="primary" variant="contained" key={name}  ><FaTag></FaTag>&nbsp; &nbsp;{name} </Button>)}
                                            <Button color="primary" variant="contained"  ><FaTag></FaTag>&nbsp; &nbsp;{application.projectDomain} </Button>
                                        </div>

                                    </CardContent>
                                </Card>
                            </Link>
                            <br />

                        </Grid>


                    ))}

                </Grid>


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
