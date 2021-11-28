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
import { CloudUpload } from "@material-ui/icons";
import Spinner from "../common/Spinner";
import { useHistory } from "react-router-dom";
import { SnackbarContext } from "../../context/SnackbarContext";
import FormField from "../common/FormField";
import constants from "../../constants";
import {
  createProject
} from "../../actions/projectActions";
import { useAuthState } from "../../context/AuthContext";
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { v4 as uuidv4 } from 'uuid';
import validator from 'validator'
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

const NewProject = () => {
  const classes = useStyles();
  const history = useHistory();
  const { setOpen, setSeverity, setMessage } = useContext(SnackbarContext);
  const [loading, setLoading] = useState(false);
  const { token, userID } = useAuthState();
  const [application, setApplication] = useState({
    title: "",
    description: "",
    projectDomain: "",
    semester: "",
    tags: [],
    link: "",
    file: ""

  });

  const [file, setFile] = useState(null);
  const [errors, updateErrors] = useState({
    title: "",
    description: "",
    projectDomain: "",
    semester: "",
    tags: [],
    link: "",
    file: ""
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
      projectDomain: "",
      semester: "",
      tags: [],
      link: ""
    });
    if (!application.title) {
      console.log("Yes");
      updateErrors((prevErrors) => ({
        ...prevErrors,
        title: "* Please enter a valid title"
      }));
      formIsValid = false;
    }
    if (!application.description) {
      updateErrors((prevErrors) => ({
        ...prevErrors,
        description: "* Please enter a valid description"
      }));
      formIsValid = false;
    }
    if (!application.projectDomain) {
      updateErrors((prevErrors) => ({
        ...prevErrors,
        projectDomain: "* Please select a domain"
      }));
      formIsValid = false;
    }
    if (!(validator.isURL(application.link))) {
      updateErrors((prevErrors) => ({
        ...prevErrors,
        link: "* Please select a valid URL"
      }));
      formIsValid = false;
    }
    if (!application.semester) {
      updateErrors((prevErrors) => ({
        ...prevErrors,
        semester: "* Please select a domain"
      }));
      formIsValid = false;
    }
    if (!file) {
      updateErrors((prevErrors) => ({
        ...prevErrors,
        file: "* Please select a file"
      }));
      formIsValid = false;
    }


    return formIsValid;
  };

  const handleFormSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    console.log("InputFields", inputFields);

    if (isFormValid()) {
      let formData = new FormData();
      formData.append("title", application.title);
      formData.append("description", application.description);
      formData.append("projectDomain", application.projectDomain);
      formData.append("semester", application.semester);
      formData.append("file", file);

      var Tags = [];
      for (var m in inputFields) {
        console.log(inputFields[m]['tags']);
        Tags.push(inputFields[m]['tags']);

      }
      // Tags.push(application.projectDomain)
      // console.log(Tags);
      formData.append("userID", userID);
      formData.append("tags", Tags);
      application.userID = userID;
      application.tags = Tags;
      console.log(Tags);
      createProject({ body: formData, token }).then((res) => {
        setLoading(false);
        if (res.error) {
          setSeverity("error");
          setMessage(res.error);
          setOpen(true);
        } else {
          setSeverity("success");
          setMessage("Project added to the college database");
          setOpen(true);
          history.push("/student/projects/displayAll");
        }
      });
    }
    setLoading(false);
  };

  const [inputFields, setInputFields] = useState([
    { id: uuidv4(), tags: '' },
  ]);


  const handleChangeInput = (id, event) => {
    const newInputFields = inputFields.map(i => {
      if (id === i.id) {
        i[event.target.name] = event.target.value
      }
      return i;
    })

    setInputFields(newInputFields);
  }

  const handleAddFields = () => {
    setInputFields([...inputFields, { id: uuidv4(), tags: '' }])
  }

  const handleRemoveFields = id => {
    const values = [...inputFields];
    values.splice(values.findIndex(value => value.id === id), 1);
    setInputFields(values);
  }



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
          <Typography variant="h5">New Project</Typography>
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
              label="GitHub Link"
              name="link"
              required={true}
              onChange={handleApplication}
              error={errors.link}
              multiline={true}
              maxRows={Infinity}
            />
            <Grid container spacing={1}>
              <Grid item xs={12} md={6}>
                <FormControl
                  variant="outlined"
                  required
                  className={classes.formControl}
                  error={errors.projectDomain.length !== 0}
                >
                  <InputLabel id="domain-label">Domain</InputLabel>
                  <Select
                    labelId="domain-label"
                    id="projectDomain"
                    name="projectDomain"
                    value={application.projectDomain}
                    onChange={handleApplication}
                    label="projectDomain"
                  >
                    {constants.DOMAINTAGS.map((projectDomain) => (
                      <MenuItem key={projectDomain} value={projectDomain}>
                        {projectDomain}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{errors.projectDomain}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl
                  variant="outlined"
                  required
                  className={classes.formControl}
                  error={errors.semester.length !== 0}
                >
                  <InputLabel id="semester-label">Semester</InputLabel>
                  <Select
                    labelId="semester-label"
                    id="semester"
                    name="semester"
                    value={application.semester}
                    onChange={handleApplication}
                    label="semester"
                  >
                    {constants.SEMESTER.map((semester) => (
                      <MenuItem key={semester} value={semester}>
                        {semester}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{errors.semester}</FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
            {inputFields.map(inputField => (
              <div key={inputField.id}>
                <TextField
                  name="tags"
                  label="Project Tags"
                  variant="filled"
                  value={inputField.tags}
                  onChange={event => handleChangeInput(inputField.id, event)}
                />

                <IconButton disabled={inputFields.length === 1} onClick={() => handleRemoveFields(inputField.id)}>
                  <RemoveIcon />
                </IconButton>
                <IconButton
                  onClick={handleAddFields}
                >
                  <AddIcon />
                </IconButton>
              </div>
            ))}

            <br />
            <input
              type="file"
              name="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file">
              <Button
                component="span"
                variant="contained"
                color="default"
                style={{ marginRight: "8px", marginBottom: "8px" }}
                startIcon={<CloudUpload />}
              >
                Choose File
              </Button>
              <span>{file ? file.name : "No file selected"}</span>
            </label>
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

export default NewProject;