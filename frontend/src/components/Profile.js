import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUserImage } from "../actions/userAction";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import MuiAlert from "@material-ui/lab/Alert";
import Tooltip from "@material-ui/core/Tooltip";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import Progress from "../components/Progress";
import CallIcon from "@material-ui/icons/Call";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";

import EditProfile from "../components/EditProfile";

const styles = {
  paper: {
    padding: 20,
  },
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "80%",
        left: "70%",
      },
    },
    "& .profile-image": {
      width: 200,
      height: 200,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%",
    },
    "& .profile-details": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle",
      },
      "& a": {
        color: "green",
      },
    },
    "& hr": {
      
      margin: "10px 0 10px 0",
    },
    "& svg.button": {
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px",
    },
  },
};

dayjs.extend(relativeTime);
const Profile = ({ classes }) => {
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState("");
  const [URL, setURL] = useState("");
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const pictureEditHandler = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };
  const updateProductHandler = (e) => {
    e.preventDefault();
    setUploading(true);
    const data = new FormData();
    data.append("file", e.target.files[0]);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "mzansiesolution");
    fetch("https://api.cloudinary.com/v1_1/mzansiesolution/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setURL(data.url);
        setUploading(false);
        setImage(data);
        if (data.url) {
          dispatch(updateUserImage(user._id, data.url));
          dispatch(getUserDetails("profile"));
        }
      });
  };

  return (
    <>
      {loading ? (
        <Progress size={100}></Progress>
      ) : (
        <>
          {!userInfo ? (
            <Paper className={classes.paper}>
              <Typography variant="body2" align="center">
                No Profile found, please login again
              </Typography>
              <div className={classes.buttons}>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/signin"
                >
                  Sign In
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  component={Link}
                  to="/signup"
                >
                  Sign Up
                </Button>
              </div>
            </Paper>
          ) : (
            <>
              {error ? (
                <MuiAlert severity="error">{error}</MuiAlert>
              ) : (
                <>
                  {userInfo && user ? (
                    <Paper data-aos="flip-right" className={classes.paper}>
                      <div className={classes.profile}>
                        {uploading ? (
                          <Progress
                            className={classes.progress}
                            smallerSpinner
                            size={50}
                          ></Progress>
                        ) : (
                          <div className="image-wrapper">
                            {!user.image ? (
                              <PersonOutlineIcon
                                color="primary"
                                className="profile-image"
                              />
                            ) : (
                              <img
                                className="profile-image"
                                component="img"
                                src={user.image}
                                alt="profile picture"
                              ></img>
                            )}

                            <input
                              hidden="hidden"
                              type="file"
                              id="imageInput"
                              onChange={updateProductHandler}
                            ></input>
                            <Tooltip
                              placement="top"
                              title="edit profile picture"
                            >
                              <IconButton
                                className="button"
                                onClick={pictureEditHandler}
                              >
                                <EditIcon color="primary"></EditIcon>
                              </IconButton>
                            </Tooltip>
                          </div>
                        )}
                       
                        <div className="profile-details">
                         
                          {user.nameHandler && (
                            <>
                              <AccountCircleIcon color="primary"></AccountCircleIcon>
                              <span color="primary">{user.nameHandler}</span>
                              <hr></hr>
                            </>
                          )}
                        
                          {user.address && (
                            <>
                              <LocationOn color="primary"></LocationOn>
                              <span color="primary">{user.address}</span>
                              <hr></hr>
                            </>
                          )}
                          {user.contactNumber && (
                            <>
                              <CallIcon color="primary" />
                              <a
                                href={user.contactNumber}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {" "}
                                {user.contactNumber}
                              </a>
                              <hr />
                            </>
                          )}
                          {user.userType && (
                            <>
                              <AssignmentIndIcon color="primary"></AssignmentIndIcon>
                              <span color="primary">{user.userType}</span>
                              <hr></hr>
                            </>
                          )}
                         
                        </div>
                        <EditProfile user={user} />
                      </div>
                    </Paper>
                  ) : (
                    <Paper className={classes.paper}>
                      <Typography variant="body2" align="center">
                        No Profile found, please login again
                      </Typography>
                      <div className={classes.buttons}>
                        <Button
                          variant="contained"
                          color="primary"
                          component={Link}
                          to="/signin"
                        >
                          Sign In
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          component={Link}
                          to="/signup"
                        >
                          Sign Up
                        </Button>
                      </div>
                    </Paper>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};
Profile.prototype = {};

export default withStyles(styles)(Profile);
