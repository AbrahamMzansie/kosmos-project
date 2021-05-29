import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import { streamDetails, createComment } from "../actions/streamActions";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import CommentForm from "./CommentForm";
import StreamFooter from "./StreamFooter";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import Progress from "../components/Progress";
import MuiAlert from "@material-ui/lab/Alert";
import { STREAM_DETAILS_RESET } from "../constants/streamConstants";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import { Typography } from "@material-ui/core";
import relativeTime from "dayjs/plugin/relativeTime";
import Comments from "./Comments";
import ScreamAccordion from "./ScreamAccordion";
import { useHistory } from "react-router-dom";

const styles = {
  visibleSeparator: {
    width: "100%",
    borderBottom: "1px solid rgba(0,0,0,0.1)",
    marginBottom: "20px",
  },
  image: {
    marginTop: "10px",
    width: "200px",
    height: "200px",
    objectFit: "cover",
    maxWidth: "100%",
    borderRadius: "50%",
  },
  dialogContent: {
    padding: "20px",
  },
  invisibleSepator: {
    border: "none",
    margin: "4px",
  },
  expandButton: {
    position: "absolute",
    left: "90%",
  },
  body: {
    height: "100px",
    maxHeight: "400px",
    resize: "vertical",
    overflow: "auto",
  },
};
dayjs.extend(relativeTime);
const SreamDialog = ({ streamData, classes, userHandler, showViewButton }) => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [body, setBody] = useState();
  const dispatch = useDispatch();
  const streamDetailData = useSelector((state) => state.streamList);
  const {
    loadingCreateComment,
    loadingStreamDetails,
    errorStreamDetails,
    errorCreateComment,
    streamStreamDetails,
    streams,
    page,
    pages,
  } = streamDetailData;

  const loading = loadingStreamDetails;
  const error = errorStreamDetails;
  useEffect(() => {}, [dispatch]);

  const openHandler = () => {
    setId(streamData._id);
    setOpen(true);
    dispatch({ type: STREAM_DETAILS_RESET });
    dispatch(streamDetails(streamData._id));
  };

  const openSelectedStreamModalHandler = () => {
    setId(streamData._id);
    setOpen(true);
    dispatch({ type: STREAM_DETAILS_RESET });
    dispatch(streamDetails(streamData._id));

  };

  const closeHandler = () => {
    setOpen(false);
    dispatch({ type: STREAM_DETAILS_RESET });
  };
  const closeModalHandler = (page) => {
    setOpen(false);
    dispatch({ type: STREAM_DETAILS_RESET });
    if (page) {
      history.push(page);
    }
  };
  const post = {
    body: body,
  };
  const streamId = streams.findIndex((stream) => {
    return stream._id === id;
  });
  const stream = streams[streamId];
  const streamUpdateHandler = (e) => {
    e.preventDefault();
    dispatch(streamDetails(streamData._id));
    setOpen(false);
  };
  return (
    <>
      {showViewButton ? (
        <Button
          onClick={openSelectedStreamModalHandler}
          className={classes.button}
          color="primary"
          type="submit"
          variant="contained"
        >
          View post
        </Button>
      ) : (
        <Tooltip title="Expand stream" placement="top">
          <IconButton
            color="inherit"
            onClick={openHandler}
            className={classes.expandButton}
          >
            <UnfoldMore color="primary"></UnfoldMore>
          </IconButton>
        </Tooltip>
      )}

      <Dialog
        data-aos="zoom-in"
        fullScreen
        scroll="paper"
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={closeHandler}
      >
        <DialogActions>
          <Button onClick={closeHandler} color="primary">
            Close
          </Button>
        </DialogActions>
        {error && <MuiAlert severity="error">{error}</MuiAlert>}
        {loading ? (
          <>
            <Progress size={100}></Progress>
          </>
        ) : (
          <>
            {stream && (
              <>
                <DialogContent className={classes.dialogContent}>
                  <Grid container spacing={10}>
                    <Grid item sm={5}>
                      <img
                        className={classes.image}
                        component="img"
                        src={stream.image}
                        alt="profile picture"
                      ></img>
                    </Grid>

                    <Grid item sm={7}>
                      <Typography
                        onClick={() =>
                          closeModalHandler(`/user/${userHandler}`)
                        }
                        color="primary"
                        variant="body2"
                        component="button" 
                      >
                        @{userHandler}
                      </Typography>
                      <hr className={classes.invisibleSepator}></hr>
                      <Typography variant="body2" color="textSecondary">
                        {dayjs(stream.createdAt).fromNow(
                          "h:mm a ,MMMM DD YYYY"
                        )}
                      </Typography>
                      <hr className={classes.invisibleSepator}></hr>
                      <Typography
                        className={classes.body}
                        variant="body1"
                        color="textSecondary"
                      >
                        {stream.body}
                      </Typography>
                      <StreamFooter
                        index={streamId}
                        showScreamDetailIcon="false"
                        stream={stream}
                        key={stream._id}
                      />
                    </Grid>
                    <hr className={classes.visibleSeparator}></hr>
                    <CommentForm index={streamId} stream={stream}></CommentForm>
                    <ScreamAccordion
                      closeModal={closeModalHandler}
                      index={streamId}
                      stream={stream}
                    />
                    <br/>
                  </Grid>
                </DialogContent>
              </>
            )}
          </>
        )}
      </Dialog>
    </>
  );
};

export default withStyles(styles)(SreamDialog);
