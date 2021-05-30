import React from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

//material ui

import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import ChatIcon from "@material-ui/icons/Chat";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import Badge from "@material-ui/core/Badge";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Notifications from "@material-ui/icons/Notifications";
import StreamDialog from "../components/StreamDialog";

const styles = {
  paper: {
    padding: 20,
  },
  badge: {
    backgroundColor: "#dc004e",
    position: "relative",
    top: "-15px",
    left: "1px",
  },
  Menu: {
    marginRight: "40px",
  },
  li: {
    marginRight: "40px",
  },
  notification: {},
  MenuItem: {
    color: "black",
    display: "block",
    flex: "1",
  },
  icon: {
    display: "flex",
    fontSize: "12px",
    fontWeight: "300",
  },
  name: {
    fontSize: "360px",
  },
};
dayjs.extend(relativeTime);
const Notification = ({ classes }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const updateNotificationHandler = (notification) => {
    console.log(notification);
    console.log("notifcation");
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const ITEM_HEIGHT = 48;

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const user_notification = useSelector((state) => state.notifications);
  console.log(user_notification);

  const userData = useSelector((state) => state.userLogin);
  const { userInfo } = userData;

  const renderNotificationBadge = () => {
    let result = null;
    const notificationList =
      user_notification &&
      user_notification.notifications &&
      user_notification.notifications.filter(
        (item) => ((item.recipient !== item.sender.nameHandler) && (item.read === false))
      );
    result = (
      <>
        <span className={classes.badge}>
          {" "}
          <Badge
            badgeContent={notificationList && notificationList.length}
            color="secondary"
          ></Badge>
        </span>
      </>
    );
    return result;
  };

  return (
    <div>
      <Tooltip title="New Notification" placement="top">
        <IconButton
          color="inherit"
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <Notifications></Notifications>
          {userInfo ? renderNotificationBadge() : null}
        </IconButton>
      </Tooltip>
      <Menu
        className={classes.Menu}
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            marginRight: "50px",
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "auto",
          },
        }}
      >
        {user_notification &&
          user_notification.notifications &&
          user_notification.notifications.map((notify, index) =>
            notify.recipient !== notify.sender.nameHandler ? (
              <MenuItem
                style={{
                  margin: "10px",
                  padding: "10px",
                  borderRadius: "10px",
                  backgroundColor: `${notify.read ? "#fff" : "#d0e8ff"}`,
                }}
                key={notify._id}
                onClick={handleClose}
                className={classes.MenuItem}
              >
                <div className={classes.icon}>
                  <div style={{ marginRight: "10px" }}>
                    <Avatar
                      className={classes.commentImage}
                      alt="profile picture"
                      src={notify.sender.image}
                    />
                  </div>
                  {notify.type === "Comment" && <ChatIcon></ChatIcon>}
                  {notify.type === "unlike" && <ThumbDownIcon></ThumbDownIcon>}
                  {notify.type === "like" && <ThumbUpAltIcon></ThumbUpAltIcon>}
                  <div className="name">
                    <strong>{notify.sender.nameHandler}&nbsp;</strong>
                    {notify.type === "Comment" && (
                      <span>commented on your post</span>
                    )}
                    {notify.type === "unlike" && <span>unlike your post</span>}
                    {notify.type === "like" && <span>like your post</span>}
                  </div>
                </div>
                <Typography variant="body2" color="textSecondary">
                  {dayjs(notify.createdAt).fromNow()}
                </Typography>
                <div className={classes.notification}>
                  <StreamDialog
                    notificationID = {notify._id}
                    index={index}
                    showViewButton
                    streamData={notify.screamId}
                    userHandler={notify.screamId && notify.screamId.userHandle}
                  />
                  <hr />
                </div>
              </MenuItem>
            ) : null
          )}
      </Menu>
    </div>
  );
};

export default withStyles(styles)(Notification);
