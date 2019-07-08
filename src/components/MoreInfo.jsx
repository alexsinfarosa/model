import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

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
          <p>
            <a
              href="https://cpb-us-e1.wpmucdn.com/blogs.cornell.edu/dist/0/7265/files/2017/01/bbmaggotfly-1v17esy.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Do you have a blueberry maggot problem?
            </a>
          </p>

          <p>
            <a
              href="http://newa.cornell.edu/uploads/documents/BlueberryCertificationProgram_forBBMmodelNEWA.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              IPM Option – Blueberry Certification Program
            </a>
          </p>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(MoreInfo);
