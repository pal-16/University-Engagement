import React, { useEffect, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Box,
    Typography,
    Grid,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    FormHelperText,
    Button,
    Paper
} from "@material-ui/core";
import Spinner from "../common/Spinner";
import { useHistory } from "react-router-dom";
import { SnackbarContext } from "../../context/SnackbarContext";
import FormField from "../common/FormField";
import {
    createPost,
} from "../../actions/crowdfundingActions";
import { useAuthState } from "../../context/AuthContext";
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: "80vh"
    },
    paper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "50%"
        },
        [theme.breakpoints.up("md")]: {
            width: "40%"
        }
    },
    form: {
        width: "100%",
        justifyContent: "center"
    },
    formInner: {
        padding: "20px 30px"
    },
    formControl: {
        marginBottom: "20px",
        width: "100%"
    }
}));

const CreatePost = () => {

    const classes = useStyles();
    const history = useHistory();
    const { setOpen, setSeverity, setMessage } = useContext(SnackbarContext);
    const [loading, setLoading] = useState(false);
    const { token, userID, userType } = useAuthState();
    const [application, setApplication] = useState({
        title: "",
        description: "",
        amountNeeded: "",
        userID: "",
        userType: ""
        //      date: new Date(),
    });
    const [errors, updateErrors] = useState({
        title: "",
        description: "",
        amountneeded: ""
        //  date: "",
    });

    const handleApplication = (e) => {
        setApplication((prevApplication) => ({
            ...prevApplication,
            [e.target.name]: e.target.value
        }));
    };



    const isFormValid = () => {
        let formIsValid = true;
        updateErrors({
            title: "",
            description: "",
            amountNeeded: 0,
            //    date: "",
        });
        if (!application.title.length) {
            updateErrors((prevErrors) => ({
                ...prevErrors,
                title: "* Please enter a valid title"
            }));
            formIsValid = false;
        }
        if (!application.description.length) {
            updateErrors((prevErrors) => ({
                ...prevErrors,
                description: "* Please enter a valid description"
            }));
            formIsValid = false;
        }

        if (+application.amountNeeded <= 0) {
            updateErrors((prevErrors) => ({
                ...prevErrors,
                faculty: "* Please enter an amount in coins"
            }));
            formIsValid = false;
        }

        return formIsValid;
    };

    const handleFormSubmit = (event) => {
        setLoading(true);
        event.preventDefault();
        if (isFormValid()) {
            let formData = new FormData();
            console.log(application);
            formData.append("title", application.title);
            formData.append("description", application.description);
            formData.append("amountNeeded", +application.amountNeeded);
            // formData.append("date", application.date);
            console.log(userID);
            console.log(userType);
            application.userID = userID;
            application.userType = userType;
            formData.append("userID", userID);
            formData.append("userType", userType);
            createPost({ body: application, token }).then((res) => {
                setLoading(false);
                if (res.error) {
                    setSeverity("error");
                    setMessage(res.error);
                    setOpen(true);
                } else {
                    setSeverity("success");
                    setMessage("Application submitted successfully");
                    setOpen(true);
                    history.push("/student/crowdfundings/displayAll");
                }
            });
        } setLoading(false);
    };

    return loading ? (
        <Spinner />
    ) : (
        <Box
            className={classes.root}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
        >
            <Paper elevation={3} className={classes.paper}>
                <div style={{ marginTop: "24px" }}>
                    <Typography variant="h5">Crowdfunding Post</Typography>
                </div>
                <form className={classes.form} noValidate>
                    <div className={classes.formInner}>
                        <FormField
                            label="Title"
                            name="title"
                            required={true}
                            onChange={handleApplication}
                            error={errors.title}
                        />
                        <FormField
                            label="Description"
                            name="description"
                            required={true}
                            onChange={handleApplication}
                            error={errors.description}
                            multiline={true}
                            maxRows={Infinity}
                        />
                        <FormField
                            label="Amount"
                            name="amountNeeded"
                            required={true}
                            onChange={handleApplication}
                            error={errors.description}
                            multiline={true}
                            maxRows={Infinity}
                        />
                        {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>

                            <KeyboardDatePicker
                                disableFuture
                                inputVariant="outlined"
                                label={""}
                                name="date"
                                value={application.date}
                                placeholder={new Date().toLocaleDateString("en-GB")}
                                onChange={onDateChange}
                                format="dd/MM/yyyy"
                                style={{ width: "100%" }}
                            />
                        </MuiPickersUtilsProvider> */}
                        <Button
                            onClick={handleFormSubmit}
                            size="large"
                            color="primary"
                            type="submit"
                            fullWidth
                            variant="contained"
                            style={{ marginTop: "16px" }}
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </Paper>
        </Box>
    );
};

export default CreatePost;