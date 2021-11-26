import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
    ListSubheader
} from "@material-ui/core";
import { Clear, CheckCircle } from "@material-ui/icons";
import { useAuthState } from "../../context/AuthContext";
import FormField from "../common/FormField";
import {
    donate
} from "../../actions/crowdfundingActions";
import { SnackbarContext } from "../../context/SnackbarContext";


const useStyles = makeStyles((theme) => ({
    formControl: {
        marginTop: "20px",
        width: "100%"
    }
}));

const DonorActions = (props) => {
    const history = useHistory();
    const classes = useStyles();
    const { setOpen, setSeverity, setMessage } = useContext(SnackbarContext);
    const [donateAmount, setDonateAmount] = useState("");

    const [errors, updateErrors] = useState({

        donateAmount: ""
    });
    const clearErrors = () => {
        updateErrors({

            donateAmount: ""
        });
    };
    const [isVerified, setIsVerified] = useState(false);
    const [verificationSuccess, setVerificationSuccess] = useState(false);
    const { userID, token, userCoins } = useAuthState();

    const [isOpen, setIsOpen] = useState(false);
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => {
        clearErrors();
        setIsOpen(false);
    };

    const handleDonate = async () => {
        if (+donateAmount <= 0) {
            updateErrors((prevErrors) => ({
                ...prevErrors,
                donateAmount: "Reward cannot be negative"
            }));
            return;

        } else if (+donateAmount > userCoins) {
            updateErrors((prevErrors) => ({
                ...prevErrors,
                donateAmount: "You do not have sufficient balance. Kindly reduce the donation amount"
            }));
            return;
        }
        handleClose();
        props.setLoading(true);
        donate({
            postID: props.applicationData._id,
            token,
            donateAmount: +donateAmount,
            senderID: userID,
            receiverID: props.applicationData.userID._id
        }).then((res) => {
            if (res.error) {
                setSeverity("error");
                setMessage(res.error);
                setOpen(true);
                return;
            } else {



                history.replace(`/student/crowdfundings/displayAll`);



                setSeverity("success");
                console.log(res.data.message);
                setMessage(res.data.message);
                setOpen(true);
            }
            props.setLoading(false);
        });
    };



    return (
        <React.Fragment>

            <Dialog open={isOpen} onClose={handleClose}>
                <DialogTitle>Contribute to the following post</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Your current balance is {userCoins}
                    </DialogContentText>
                    <FormControl
                        variant="outlined"
                        required
                        className={classes.formControl}
                        error={errors.donateAmount.length !== 0}
                    >
                        <FormField
                            label="Amount Help (Coins)"
                            name="donateAmount"
                            required={true}
                            onChange={(e) => setDonateAmount(e.target.value)}
                            error={errors.donateAmount}
                            value={donateAmount}
                            disabled={verificationSuccess}
                        />

                    </FormControl>
                </DialogContent>
                <DialogActions>

                    <Button
                        variant="contained"
                        color="default"
                        style={{
                            backgroundColor: "#4caf50",
                            color: "white"
                        }}
                        startIcon={<CheckCircle />}
                        onClick={handleDonate}
                    >
                        Donate
                    </Button>

                </DialogActions>
            </Dialog>

            <Box display="flex" justifyContent={props.position}>
                <Button variant="contained" color="primary" onClick={handleOpen}>
                    Contribute
                </Button>
            </Box>
        </React.Fragment>
    );
};

export default DonorActions;
