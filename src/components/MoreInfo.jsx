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
          <Typography paragraph>Link to extension fact sheets...</Typography>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(MoreInfo);
