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

class MoreInfo extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div style={{ width: 500 }}>
        <Paper className={classes.root} elevation={4}>
          <Typography variant="subheading" gutterBottom>
            Do you have a blueberry maggot problem?
          </Typography>

          <p>
            Follow this link:{" "}
            <a
              href="https://cpb-us-e1.wpmucdn.com/blogs.cornell.edu/dist/0/7265/files/2017/01/bbmaggotfly-1v17esy.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              blogs.cornell.edu
            </a>
          </p>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(MoreInfo);
