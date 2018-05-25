import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { withStyles } from "@material-ui/core/styles";

import withRoot from "../withRoot";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 700,
    margin: "0 auto",
    marginBottom: theme.spacing.unit * 8
  }
});

class OutOfSeasonMessage extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography variant="caption" paragraph align="justify">
          PEST STATUS
        </Typography>
        <Typography variant="caption" paragraph align="justify">
          Blueberry maggot is overwintering as pupae in the soil.
        </Typography>

        <Typography variant="caption" paragraph align="justify">
          PEST MANAGEMENT
        </Typography>
        <Typography variant="caption" paragraph align="justify">
          The time of concern for blueberry maggot has passed. The blueberry
          maggot tool will begin again on March 1.{" "}
        </Typography>
      </div>
    );
  }
}

export default withRoot(
  withStyles(styles)(inject("appStore")(observer(OutOfSeasonMessage)))
);
