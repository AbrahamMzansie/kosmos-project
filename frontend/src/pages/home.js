import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Progress from "../components/Progress";
import Profile from "../components/Profile";
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import MuiAlert from "@material-ui/lab/Alert";
import { approveUser, listUsers } from "../actions/userAction";
import Button from "@material-ui/core/Button";

const styles = {
  progress: {
    margin: "200px auto",
    textAlign: "center",
  },
  head: {
    backgroundColor: "#00bcd4",
    
    
  },
 tableCell : {
  fontsize : "30px !important",
  fontfamily : "bold",
 }
};

const Home = ({ classes }) => {
  const userData = useSelector((state) => state.userLogin);
  const userList = useSelector((state) => state.userList);
 const {userInfo} = userData;
  const { loading, error, users } = userList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);

  const approveHandler = (id) => {
   dispatch(approveUser(id));
  };

  return (
    <>
      <Grid style={{ marginTop: "50px" }} container spacing={10}>
        {userInfo && userInfo.admin && (
          <Grid item sm={8} xs={12}>
          {loading ? (
            <Progress className={classes.progress} size={50}></Progress>) :
              error
             ? (
              <MuiAlert severity="error">{error}</MuiAlert>
            )
           : (
            <>
            {userInfo && userInfo.admin && (
              <TableContainer style={{ witdth: "100%"  , maxHeight : "400px"}} component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead  className={classes.head}>
                    <TableRow>
                      <TableCell classNme = {classes.tableCell} align="left">Approved</TableCell>
                      <TableCell classNme = {classes.tableCell}  align="left">First Name</TableCell>
                      <TableCell  classNme = {classes.tableCell} align="left">Email</TableCell>
                      <TableCell classNme ={classes.tableCell} align="left">Cell Number</TableCell>
                      <TableCell classNme = {classes.tableCell} align="left">Address</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users &&
                      users.map((row) => (
                        <TableRow key={row._id} key={row.name}>
                          <TableCell align="left">
                            
                            {!row.approved ? (
                              <Button
                                onClick={()=>approveHandler(row._id)}
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.button}
                              >
                                approve
                              </Button>
                            ) : (
                              "YES"
                            )}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {row.nameHandler}
                          </TableCell>
                          <TableCell align="left">{row.email}</TableCell>
                          <TableCell align="left">
                            {row.contactNumber}
                          </TableCell>
                          <TableCell align="left">{row.address}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
              
            </>
          )}
        </Grid>
        )}
        
        <Grid item sm={userInfo&& userInfo.admin? 4 :  12} xs={12}>
          <>
            <Profile />
          </>
        </Grid>
      </Grid>
    </>
  );
};

export default withStyles(styles)(Home);
