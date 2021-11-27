import React, { useEffect, useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
  Button,
  CardHeader,
  Divider
} from "@material-ui/core";
import { FaTrophy } from "react-icons/fa";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { useAuthState } from "../../../context/AuthContext";
import Spinner from "../../common/Spinner";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%"
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    height: 56,
    width: 56
  }
}));

const Total = ({
  className,
  apiRoute,
  cardTitle,
  Icon,
  counter,
  ...rest
}) => {
  const classes = useStyles();
  const { token } = useAuthState();

  const [count, setCount] = useState(0);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {

  }, []);

  return (
    <Card style={{ marginTop: '20px' }}>
      <CardHeader title={`${cardTitle}`} />
      <Divider />
      <CardContent>
        {isLoading ? (
          <Spinner />
        ) : (
          <Grid container justify="space-between" spacing={3}>
            <Grid item xs={6}>
              <Avatar className={classes.avatar}>
                <FaTrophy></FaTrophy>

              </Avatar>
            </Grid>
            <Grid item xs={6}>
              <Typography color="textPrimary" variant="h3">
                {counter}
              </Typography>
            </Grid>
          </Grid>
        )}
      </CardContent>
      <Box display="flex" justifyContent="flex-end" p={2}>
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"

        >
          View all
        </Button>
      </Box>
    </Card>
  );
};

Total.propTypes = {
  className: PropTypes.string,
  apiRoute: PropTypes.string.isRequired,
  cardTitle: PropTypes.string.isRequired,
  Icon: PropTypes.node.isRequired,
  counter: PropTypes.number.isRequired
};

export default Total;
