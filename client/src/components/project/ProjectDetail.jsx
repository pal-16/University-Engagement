import React, { useEffect, useState, useContext } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { FaThumbsUp, FaTag } from "react-icons/fa";
import CardHeader from "@material-ui/core/CardHeader";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {
    Button,
    Typography,
    useMediaQuery
} from "@material-ui/core";
import { useParams, useHistory } from "react-router-dom";
import { SnackbarContext } from "../../context/SnackbarContext";
import { getProjectDetails, likeProject } from "../../actions/projectActions";
import { useAuthState } from "../../context/AuthContext";
import Spinner from "../../components/common/Spinner";
import Comments from './sections/Comments'
import moment from 'moment';
import CardMedia from "@material-ui/core/CardMedia";
import "./styles.css";

const useStyles = makeStyles((theme) => ({


    btns: {
        '& > *': {
            margin: theme.spacing(1),
        },
        marginTop: "5px"
    },
    root: {
        minHeight: "80vh",
        padding: "20px"
    },
    paper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100%",
        width: "100%",
        padding: theme.spacing(3)
    },
    grid: {
        minHeight: "70vh",
        marginTop: theme.spacing(2)
    },
    separator: {
        borderRightStyle: "solid",
        borderWidth: "1px",
        borderColor: "#D3D3D3"
    },
    item: {
        marginBottom: theme.spacing(2)
    },
    divider: {
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        marginBottom: theme.spacing(1)
    },
    label: {
        fontSize: "1.1rem",
        fontWeight: "500"
    }
}));

const ProjectDetail = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const theme = useTheme();
    const { setOpen, setSeverity, setMessage } = useContext(SnackbarContext);
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const { id } = useParams();
    const { userID, token } = useAuthState();
    const Actions = props.actions;
    const [like, setLike] = useState(true);

    const handleAlreadyLiked = async () => {
        setSeverity("error");
        setMessage("You have already liked");
        setOpen(true);
        return;
    }
    const handleLike = async () => {

        likeProject({
            id: id,
            token,
            userID
        }).then((res) => {
            if (res.error) {
                setSeverity("error");
                setMessage(res.error);
                setOpen(true);
                return;
            } else {
                history.replace(`/student/projects/${id}`);
                setSeverity("success");
                setMessage("Liked");
                setOpen(true);
            }

        });
    };

    const [projectData, setProjectData] = useState({
        _id: "",
        title: "",
        description: "",
        projectDomain: "",
        semester: "",
        tags: [],
        files: [],
        comments: [],
        like: [],
        userID: {}
    });
    const [loading, setLoading] = useState(false);

    const [CommentLists, setCommentLists] = useState([])

    const updateComment = (newComment) => {

        setCommentLists(CommentLists.concat(newComment));
    }

    useEffect(() => {
        setLoading(true);
        getProjectDetails({ id, token }).then((res) => {
            if (res.error) {
                setLoading(false);
            } else {

                console.log(res.data);
                setProjectData(res.data);

                for (let i = 0; i < res.data.like.length; i++) {

                    if (userID.toString == res.data.like[i].toString) {
                        setLike(false);
                        break;
                    }
                }

                console.log(like);
                setCommentLists(res.data.comments)
                setLoading(false);
            }
        });
    }, [history, id, token]);

    return loading ? (
        <Spinner />
    ) : (
        <>
            {/* {/* <Box
                className={classes.root}
                display="flex"
                flexDirection="column"
                justifyContent="start"

            >
                <Paper elevation={isSmallScreen ? 0 : 3} className={classes.paper}>
                    <Typography variant="h6">
                        {"Project Details".toLocaleUpperCase()}
                    </Typography>
                    <Grid
                        container
                        spacing={isSmallScreen ? 0 : 3}
                        className={classes.grid}
                    >
                        <Grid
                            item
                            xs={12}
                            md={6}
                            className={!isSmallScreen ? classes.separator : ""}
                            style={{ paddingRight: "30px" }}
                        >



                            <ApplicationItem
                                label="Title"
                                value={projectData.title}
                            />

                            <ApplicationItem
                                label="Description"
                                value={projectData.description}
                            />

                            <ApplicationItem
                                label="Domain of Achievement"
                                value={projectData.projectDomain}
                            />

                        </Grid>
                    </Grid>
                </Paper>

            </Box> */}
            <br />
            <Card className={classes.card} variant="outlined">
                <CardMedia style={{ height: "300px" }} image={projectData.files[0]} />

                <CardHeader title={projectData.title} align="center" />
                <div style={{ width: "100%", textAlign: "center" }}>

                    <Typography color="textSecondary" variant="subtitle4" >
                        Created By {projectData.userID.name} at {moment(projectData.createdAt).format('YYYY-MM-DD')}
                    </Typography>
                </div>
                <hr />
                <CardContent>
                    <Typography color="textSecondary" variant="substitle3">
                        <b> Description </b>   {projectData.description}
                    </Typography>
                    <br />
                    <Typography color="textSecondary" variant="substitle3">
                        <b> Developed during </b> : {projectData.semester}
                    </Typography>


                    <div className={classes.btns}>
                        {projectData.tags.map(name => <Button color="primary" variant="contained" key={name}><FaTag></FaTag> {name} </Button>)}
                    </div>



                </CardContent>
            </Card>

            <Button color="primary" onClick={like == false ? handleAlreadyLiked : handleLike}>
                Like  <FaThumbsUp></FaThumbsUp> <p style={{ marginLeft: "10px" }}> </p> {projectData.like.length}
            </Button>

            <Button color="secondary" variant="contained" onClick={() => {
                window.open(projectData.link, "_blank");
            }} style={{ marginLeft: "50px" }} c>
                Fork this project on GitHub
            </Button>
            <Comments className="comments-container" CommentLists={CommentLists} projectID={projectData._id} refreshFunction={updateComment} />

        </>
    );
};

export default ProjectDetail;
