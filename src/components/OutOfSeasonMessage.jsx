import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { withStyles } from "@material-ui/core/styles";

import withRoot from "../withRoot";
import Typography from "@material-ui/core/Typography";
import NEWALogo from "../assets/newa-logo.svg";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 500,
    margin: "0 auto",
    marginBottom: theme.spacing.unit * 8
  },
  header: {
    borderBottom: `2px solid ${theme.palette.primary.light}`,
    width: 250
  }
});

class OutOfSeasonMessage extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography
          variant="subheading"
          paragraph
          align="justify"
          className={classes.header}
        >
          PEST STATUS
        </Typography>
        <Typography variant="body1" paragraph align="justify">
          Blueberry maggot is overwintering as pupae in the soil.
        </Typography>

        <Typography
          variant="subheading"
          paragraph
          align="justify"
          style={{ marginTop: 64 }}
          className={classes.header}
        >
          PEST MANAGEMENT
        </Typography>

        <Typography variant="body1" paragraph align="justify" gutterBottom>
          The time of concern for blueberry maggot has passed. The blueberry
          maggot tool will begin again on March 1.{" "}
        </Typography>

        <Typography
          variant="caption"
          paragraph
          align="justify"
          gutterBottom
          style={{ color: "rgba(0,0,0,0.9)", lineHeight: 1.7, marginTop: 64 }}
        >
          <b>Disclaimer: These are theoretical predictions and forecasts.</b>The
          theoretical models predicting pest development or disease risk use the
          weather data collected (or forecasted) from the weather station
          location. These results should not be substituted for actual
          observations of plant growth stage, pest presence, and disease
          occurrence determined through scouting or insect pheromone traps.
        </Typography>

        <br />
        <img src={NEWALogo} alt="NEWA logo" style={{ height: 50 }} />
      </div>
    );
  }
}

export default withRoot(
  withStyles(styles)(inject("appStore")(observer(OutOfSeasonMessage)))
);
