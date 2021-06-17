import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userAdminRegister } from "../actions/userAction";
import withStyles from "@material-ui/core/styles/withStyles";
import MuiAlert from "@material-ui/lab/Alert";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Checkbox, FormControlLabel } from "@material-ui/core";

const styles = {
  formControl: {
    minWidth: "120px",
    display: "flex",
    justifyContent: "start",
  },
  selectEmpty: {
    marginTop: "40px",
  },
  form: {
    textAlign: "center",
  },
  image: {
    margin: "10px auto 10px auto",
    width: "50px",
  },
  textField: {
    display: "flex",
    margin: "10px auto 10px auto",
  },
  pageTitle: {
    margin: "10px auto 10px auto",
  },
  button: {
    margin: "10px 0px",
    position: "relative",
  },
  error: {
    color: "red",
    fontSize: "0.8em",
  },
  progress: {
    position: "absolute",
  },
};
const AdminSignUp = ({ classes, location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState(false);
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [userType, setUserType] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameHandler, setNameHandler] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("error");
  const dispatch = useDispatch();
  const registerData = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = registerData;

  const redirect = location.search ? location.search.split("=")[1] : "/";
  useEffect(() => {
    if (userInfo) {
      setMessage("User created succesful!");
      setType("success");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setNameHandler("");
      setUserType("");
      setAddress("");
      setContactNumber("");
      setAdmin(false);
    } else {
      history.push("/admin");
    }
  }, [history, redirect, userInfo, dispatch]);
  const registerHandler = (e) => {
    setMessage("");
    setType("");
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password do not match!");
      setType("error");
    } else {
      dispatch(
        userAdminRegister(
          nameHandler,
          email,
          password,
          address,
          userType,
          contactNumber,
          admin
        )
      );
    }
  };

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <Typography variant="h4" className={classes.pageTitle}>
          Admin Panel Sign Up
        </Typography>
        {message && <MuiAlert severity={type}>{message}</MuiAlert>}
        {error && (
          <Typography variant="h4" className={classes.error}>
            {error}
          </Typography>
        )}
        <form noValidate onSubmit={registerHandler} autoComplete="off">
          <TextField
            required
            id="email"
            type="email"
            name="email"
            label="Email"
            className={classes.textField}
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
              }
          ></TextField>
          <TextField
            id="name"
            type="text"
            name="fullName"
            label="Full Name"
            className={classes.textField}
            value={nameHandler}
            onChange={(e) => setNameHandler(e.target.value)}
          ></TextField>
          <TextField
            id="password"
            type="password"
            name="password"
            label="Password"
            className={classes.textField}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></TextField>
          <TextField
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            label="confirm Password"
            className={classes.textField}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></TextField>
          <TextField
            id="contactNumber"
            type="text"
            name="contactNumber"
            label="Contact Number"
            className={classes.textField}
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
          ></TextField>
          <TextField
            id="address"
            type="text"
            name="address"
            label="Address"
            className={classes.textField}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></TextField>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">User Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >
              <MenuItem value=""></MenuItem>
              <MenuItem value="Agent">Agent</MenuItem>
              <MenuItem value="Customer">Customer</MenuItem>
              <MenuItem value="Operator">Operator</MenuItem>
            </Select>
          </FormControl>
          <FormControlLabel
           className={classes.formControl}
            control={
              <Checkbox
                color="primary"
                checked={admin}
                onChange={(e) =>{
                  console.log(e.target.checked);
                  setAdmin(e.target.checked)}
                }
                
                name="admin"
              />
            }
            label="Admin"
          />
          <Button
            disabled={loading}
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Register User
            {loading && (
              <div className={classes.progress}>
                <CircularProgress color="primary" size={30} />
              </div>
            )}
          </Button>
         <br/>
         {""}
          <large style = {{marginTop : "20px"}}>
            Existing User ? Sign in <Link to="/signin">Here</Link>
          </large>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};
AdminSignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminSignUp);
