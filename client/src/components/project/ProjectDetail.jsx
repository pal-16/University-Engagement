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
    card: {
        boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.7)",
        backgroundColor: "#fafafa",
    },

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

            <br />
            <Card className={classes.card} variant="outlined">


                <CardHeader title={projectData.title} align="center" />
                <div style={{ width: "100%", textAlign: "center" }}>

                    <Typography color="textSecondary" variant="subtitle3" >
                        Created By {projectData.userID.name} at {moment(projectData.createdAt).format('YYYY-MM-DD')}
                    </Typography>
                </div>
                <hr />
                <CardContent>
                    <Typography color="textSecondary" variant="subtitle3">
                        <b> Description </b> :  {projectData.description}
                    </Typography>
                    <br />
                    <Typography color="textSecondary" variant="subtitle3">
                        <b> Developed during </b> : {projectData.semester}
                    </Typography>


                    <div className={classes.btns}>
                        {projectData.tags.map(name => <Button color="primary" variant="contained" key={name}><FaTag></FaTag> &nbsp; &nbsp;{name} </Button>)}
                        <Button color="secondary" variant="contained" onClick={() => {
                            window.open(projectData.link, "_blank");
                        }} >
                            Fork this project on GitHub
                        </Button>
                    </div>



                </CardContent>
            </Card>

            <Button color="primary" onClick={like == false ? handleAlreadyLiked : handleLike}>
                <FaThumbsUp ></FaThumbsUp>&nbsp; {projectData.like.length}
            </Button>


            <Comments className="comments-container" CommentLists={CommentLists} projectID={projectData._id} refreshFunction={updateComment} />

        </>
    );
};

export default ProjectDetail;
