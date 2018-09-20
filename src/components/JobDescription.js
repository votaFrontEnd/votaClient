import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  root: {
    width: "75%",
    margin: 20
  },
  table: {
    minWidth: 500
  },
  col1: {
    width: 220
  }
});

function JobDescription(props) {
  const { classes } = props;
  const { job } = props;
  const { users } = props;
  const interviewerNames =
    job.interviewers != null && users.length > 0
      ? job.interviewers.map(interviewerId => {
          const userMapping = users.filter(user => {
            return user.userid == interviewerId;
          });
          if (userMapping.length > 0) {
            return userMapping[0].name;
          }
          return null;
        })
      : [];

  const interviewerNamesDisplay = interviewerNames.map((interviewer, index) => {
    return interviewer + (index == interviewerNames.length - 1 ? " " : ", ");
  });

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableBody>
          <TableRow>
            <TableCell className={classes.col1} component="th" scope="row">
              Job #: {job.id}
            </TableCell>
            <TableCell>Job Name: {job.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.col1} component="th" scope="row">
              Level: {job.level}
            </TableCell>
            <TableCell>Job Summary: {job.summary}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.col1} component="th" scope="row">
              Status: {job.status}
            </TableCell>
            <TableCell>Interviewers: {interviewerNamesDisplay}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
}

export default withStyles(styles)(JobDescription);
