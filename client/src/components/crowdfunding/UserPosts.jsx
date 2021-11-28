import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
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
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { getUserPosts } from "../../actions/crowdfundingActions";
import moment from 'moment';
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
    selected: {},
    card: {
        boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.8)",
        backgroundColor: "#fafafa",
    }
}));
const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };
    return (
        <p className="text">
            {text.length > 350 ? (isReadMore ? text.slice(0, 350) : text) : text}
            {text.length > 350 ? <span onClick={toggleReadMore} className="read-or-hide">
                <h3 style={{ color: "black" }}> {isReadMore ? "...read more" : " show less"} </h3>
            </span> : ""}
        </p>
    );
};

const Mailto = ({ email, subject, body, children }) => {
    return (
        <a style={{ color: "white" }} href={`mailto:${email}?subject=${encodeURIComponent(subject) || ''}&body=${encodeURIComponent(body) || ''}`}>{children}</a>
    );
};
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
                                <Card className={classes.card} style={{ height: "100%" }}>
                                    <CardHeader title={application.title} align="center" />
                                    <div style={{ width: "100%", textAlign: "center" }}>

                                        <Typography color="textSecondary" variant="subtitle4" >
                                            Created  at {moment(application.createdAt).format('YYYY-MM-DD')}
                                        </Typography>
                                    </div>
                                    <hr />
                                    <CardContent>
                                        <Typography color="primary" variant="subtitle4">
                                            <b>    Description   </b>:  <ReadMore>{application.description}</ReadMore>
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
                                        {
                                            application.status == "Completed" ? <><Button
                                                variant="contained"
                                                color="primary"
                                                style={{ backgroundColor: theme.palette.primary.main, color: "white" }}


                                            >Completed </Button>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    style={{ backgroundColor: theme.palette.primary.main, color: "white", marginLeft: "30px" }}



                                                ><Mailto email="director@vjti.ac.in" subject="Conversion of university coins" body="Please find attached a request to convert coins for a cause">
                                                        Ask for conversion
                                                    </Mailto></Button> </> : <Button
                                                        variant="contained"
                                                        color="primary"
                                                        style={{ backgroundColor: theme.palette.primary.main, color: "white" }}
                                                    >Pending </Button>
                                        }


                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </div>


        </Box >
    );
};

export default CrowdfundingUserPosts;
