import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  updateUserProfile,
  getUserDetails,
  userUpdateProfileReset,
} from "../actions/userAction";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const styles = {
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px",
    },
  },
  
  textField : {
      display : "flex"
  }
};

const EditProfile = ({ classes, user }) => {
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [userType, setUserType] = useState("");
  const [nameHandler, setNameHandler] = useState("");
  
  const [open, setOpen] = useState(false);
  
  const dispatch = useDispatch();
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success, loading: loading, error: error } = userUpdateProfile;
  const mapUserDetailsToState = (userDetails) => {
    if (userDetails) {
      setEmail(userDetails.email ? userDetails.email : "");
      setContactNumber(userDetails.contactNumber ? userDetails.contactNumber : "");
      setAddress(userDetails.address ? userDetails.address : "");
      setUserType(userDetails.userType ? userDetails.userType : "");
      setNameHandler(userDetails.nameHandler ? userDetails.nameHandler : "")
    }
  };
  useEffect(() => {
    if (!user || !user.nameHandler) {
      dispatch(userUpdateProfileReset());
      dispatch(getUserDetails("profile"));
    } else {
      setNameHandler(user.nameHandler);
    }
  }, [dispatch, success, user]);

  const openHandler = () => {
    setOpen(true);
    mapUserDetailsToState(user);
  };
  const closeHandler = () => {
    setOpen(false);
  };
  const editProfileHandler = () => {
    dispatch(updateUserProfile({ nameHandler,
      address,
      userType,
      contactNumber,
      }));
    dispatch(getUserDetails("profile"));
    setOpen(false);
  };

  return (
    <>
    <div style = {{textAlign : "center"}}>
    <Tooltip title="Edit details" placement="top">
        <IconButton onClick={openHandler} className={classes.button}>
          <EditIcon color="primary"></EditIcon>
        </IconButton>
      </Tooltip>
    </div>
      <Dialog fullWidth maxWidth="sm" open={open} onClose={closeHandler}>
        <DialogTitle>Edit Your details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="firstName"
              label="First Name"
              type="text"
              multiline
              fullWidth
              
              placeholder="Your First name"
              className={classes.TextField}
              value={nameHandler}
              onChange={(e) => setNameHandler(e.target.value)}
            ></TextField>
            <TextField
              name="contactNumbaer"
              label="Contact Number"
              type="text"
              placeholder="Your contact number"
              className={classes.textField}
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            ></TextField>
            <TextField
              name="address"
              label="Address"
              type="text"
              placeholder="Where you live?"
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
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeHandler} color="primary">
            Cancel
          </Button>
          <Button onClick={editProfileHandler} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default withStyles(styles)(EditProfile);
