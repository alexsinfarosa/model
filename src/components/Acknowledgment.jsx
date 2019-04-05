import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
    borderRadius: 8
  })
});

class Acknowledgment extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div style={{ width: 500 }}>
        <Paper className={classes.root} elevation={4}>
          <Typography paragraph>
            The blueberry maggot degree day model is based on a model from
            Michigan State University, Rufus Isaacs and Carlos Garcia.
          </Typography>

          <Typography paragraph>
            The NEWA tool was built by{" "}
            <a href="mailto:jec3@cornell.edu">Juliet Carroll</a> and{" "}
            <a href="mailto:gme1@cornell.edu">Greg Loeb</a>, Cornell University,
            with input from Dean Polk, Rutgers University, and Hannah Burrack,
            North Carolina State University.
          </Typography>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Acknowledgment);
