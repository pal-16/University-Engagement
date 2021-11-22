import React, { useEffect, useState, useContext } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
    Button,
    Box,
    Grid,
    Typography,
    Divider,
    Paper,
    useMediaQuery
} from "@material-ui/core";
import { useParams, useHistory } from "react-router-dom";
import { SnackbarContext } from "../../context/SnackbarContext";
import { getProjectDetails, likeProject, commentProject } from "../../actions/projectActions";
import { useAuthState } from "../../context/AuthContext";
import Spinner from "../../components/common/Spinner";
import ApplicationItem from "../applications/ApplicationItem";
import Comments from './sections/Comments'
//import StatusChip from "./StatusChip";

const useStyles = makeStyles((theme) => ({
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
                history.replace(`/student`);
                setSeverity("success");
                setMessage("Application approved. Reward will be mined shortly.");
                setOpen(true);
            }

        });
    };

    const [applicationData, setApplicationData] = useState({
        _id: "",
        title: "",
        description: "",
        projectDomain: "",
        semester: "",
        tags: [],
        files: [],
        comments: [],
        like: [],
        userID: []
    });
    const [loading, setLoading] = useState(false);

    const [CommentLists, setCommentLists] = useState([])

    const updateComment = (newComment) => {

        console.log(newComment);

        setCommentLists(CommentLists.concat(newComment));
    }

    useEffect(() => {
        setLoading(true);
        getProjectDetails({ id, token }).then((res) => {
            if (res.error) {
                setLoading(false);
            } else {

                console.log(res.data);
                setApplicationData(res.data);
                setCommentLists(res.data.comments)
                setLoading(false);
            }
        });
    }, [history, id, token]);

    return loading ? (
        <Spinner />
    ) : (
        <Box
            className={classes.root}
            display="flex"
            flexDirection="column"
            justifyContent="start"
            alignItems="center"
        >
            <Paper elevation={isSmallScreen ? 0 : 3} className={classes.paper}>
                <h1>Heloo</h1>

                <Typography variant="h6">
                    {"Application Details".toLocaleUpperCase()}
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
                            label="Application ID"
                            value={applicationData._id}
                        />

                        <ApplicationItem
                            label="Student Name"
                            value={applicationData.title}
                        />

                        <ApplicationItem
                            label="Faculty Name"
                            value={applicationData.description}
                        />
                        <button>{applicationData.like.length}</button>
                        <ApplicationItem
                            label="Domain of Achievement"
                            value={applicationData.projectDomain}
                        />

                    </Grid>
                    <Button color="primary" onClick={handleLike}>
                        Like
                    </Button>
                    <br />

                </Grid>
                <Comments CommentLists={CommentLists} postId={applicationData._id} refreshFunction={updateComment} />
            </Paper>
        </Box>
    );
};

export default ProjectDetail;
