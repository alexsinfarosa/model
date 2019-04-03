import React, { Component } from "react";
import { inject, observer } from "mobx-react";

// material-ui
import withRoot from "../withRoot";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Hidden from "@material-ui/core/Hidden";

// date
import { format, isSameDay, differenceInDays } from "date-fns/esm";

// styles
const styles = theme => ({
  root: {
    width: "100%",
    marginBottom: theme.spacing.unit * 4
  },
  table: {
    // minWidth: 700,
  },
  isMobile: {
    fontSize: "1rem",
    [theme.breakpoints.down("md")]: {
      display: "none"
    }
  },
  tableCell: {
    fontSize: "1rem",
    padding: "0 10px",
    textAlign: "center",
    "@media (min-width: 576px)": {
      fontSize: "1rem"
    }
  },
  tableHeader: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    borderRight: "1px solid #eee"
  },
  missingDays: {
    width: "100%",
    maxWidth: 1200,
    margin: "0 auto",
    marginTop: theme.spacing.unit * 3
  },
  segment: {
    width: 110,
    textAlign: "center",
    borderRadius: 8,
    padding: 2,
    "& > *": {
      color: "white",
      fontWeight: 700,
      letterSpacing: 1,
      fontSize: 10
    }
  }
});

class GDDTable extends Component {
  timeColor = date => {
    const formattedDate = format(date, "YYYY-MM-DD");
    const formattedToday = format(new Date(), "YYYY-MM-DD");
    if (isSameDay(formattedDate, formattedToday)) return;
    if (differenceInDays(formattedDate, formattedToday) < 0) return "#0FA3B1";
    if (differenceInDays(formattedDate, formattedToday) >= 0) return "#F9E04C";
  };
  render() {
    const { classes } = this.props;
    const { isLoading, dateOfInterest } = this.props.appStore.paramsStore;

    const { dataForTable, missingDays } = this.props.appStore.currentModel;

    const color = d => {
      if (d < 613) return "#44AA51";
      if (d >= 613 && d <= 863) return "#F6C317";
      if (d > 863) return "#E0413D";
    };

    return (
      <div className={classes.root}>
        <Typography variant="headline" gutterBottom>
          Predictions
        </Typography>
        <Paper>
          {isLoading ? (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignContent: "center"
              }}
            >
              <CircularProgress />
            </div>
          ) : (
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell
                    className={classes.tableCell}
                    rowSpan={2}
                    colSpan={2}
                    style={{
                      textAlign: "center",
                      margin: 0,
                      padding: 0,
                      borderRight: "1px solid #E0E0E0",
                      fontSize: "1rem"
                    }}
                  >
                    Date
                  </TableCell>
                  <TableCell
                    style={{
                      textAlign: "center",
                      borderLeft: "1px solid #E0E0E0",
                      borderRight: "1px solid #E0E0E0",
                      fontSize: "1rem"
                    }}
                    colSpan={2}
                  >
                    Degree Days (Base 50 ˚F BE)
                  </TableCell>
                  <TableCell
                    className={classes.isMobile}
                    style={{ textAlign: "center", fontSize: "1rem" }}
                    colSpan={3}
                  >
                    Temperature (˚F)
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className={classes.tableCell} numeric>
                    Daily
                  </TableCell>
                  <TableCell
                    className={classes.tableCell}
                    style={{ borderRight: "1px solid #E0E0E0" }}
                    numeric
                  >
                    From Jan 1st
                  </TableCell>
                  <TableCell className={classes.isMobile} numeric>
                    Min
                  </TableCell>
                  <TableCell className={classes.isMobile} numeric>
                    Avg
                  </TableCell>
                  <TableCell className={classes.isMobile} numeric>
                    Max
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataForTable.map(o => {
                  const isToday = isSameDay(new Date(dateOfInterest), o.date);
                  const formattedDate = format(o.date, "YYYY-MM-DD");
                  const formattedToday = format(new Date(), "YYYY-MM-DD");
                  return (
                    <TableRow hover key={o.date}>
                      <TableCell
                        className={classes.tableCell}
                        style={{
                          margin: 0,
                          padding: 0,
                          width: 8,
                          background: this.timeColor(o.date),
                          borderBottom: "none",
                          borderTop: "none"
                        }}
                      />
                      <TableCell
                        className={classes.tableCell}
                        style={{
                          // padding: "0px 10px",
                          // textAlign: "center",
                          fontSize: isToday ? "1.1rem" : null,
                          fontWeight: isToday ? 700 : null
                        }}
                      >
                        {isSameDay(formattedDate, formattedToday)
                          ? "Today"
                          : format(o.date, "MMMM Do")}
                      </TableCell>
                      <TableCell
                        className={classes.tableCell}
                        style={{
                          borderLeft: "1px solid #E0E0E0",
                          fontSize: isToday ? "1.1rem" : null,
                          fontWeight: isToday ? 700 : null
                        }}
                        numeric
                      >
                        {o.dd}
                      </TableCell>
                      <TableCell
                        style={{
                          fontSize: isToday ? "1.1rem" : null,
                          fontWeight: isToday ? 700 : 400,
                          background: color(o.cdd),
                          letterSpacing: 1,
                          color: o.cdd === "N/A" ? "black" : "#fff"
                        }}
                        className={classes.tableCell}
                        numeric
                      >
                        {o.cdd}
                      </TableCell>

                      <TableCell
                        className={classes.isMobile}
                        style={{
                          borderLeft: "1px solid #E0E0E0",
                          fontSize: isToday ? "1.1rem" : null,
                          fontWeight: isToday ? 700 : null
                        }}
                        numeric
                      >
                        {o.min}
                      </TableCell>
                      <TableCell
                        style={{
                          fontSize: isToday ? "1.1rem" : null,
                          fontWeight: isToday ? 700 : null
                        }}
                        className={classes.isMobile}
                        numeric
                      >
                        {o.avg}
                      </TableCell>
                      <TableCell
                        style={{
                          fontSize: isToday ? "1.1rem" : null,
                          fontWeight: isToday ? 700 : null
                        }}
                        className={classes.isMobile}
                        numeric
                      >
                        {o.max}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </Paper>

        <Hidden smUp>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: 32
            }}
          >
            <div className={classes.segment} style={{ background: "#44AA51" }}>
              <Typography variant="caption">LOW</Typography>
              <Typography variant="caption">&lt;613</Typography>
            </div>
            <div className={classes.segment} style={{ background: "#F6C317" }}>
              <Typography variant="caption">MODERATE</Typography>
              <Typography variant="caption">&ge;613 and &le;863</Typography>
            </div>
            <div className={classes.segment} style={{ background: "#E0413D" }}>
              <Typography variant="caption">HIGH</Typography>
              <Typography variant="caption">&gt;863</Typography>
            </div>
          </div>
        </Hidden>

        {/* Missing Days */}
        {missingDays.length !== 0 && !isLoading && (
          <Typography variant="caption" className={classes.missingDays}>
            <span style={{ color: "black" }}>{`(+${missingDays.length}) ${
              missingDays.length === 1 ? "day" : "days"
            } missing:
                  `}</span>
            {missingDays.map((d, i) => {
              if (i === missingDays.length - 1) {
                return <span key={d}>{format(d, "MMMM Do")}.</span>;
              } else {
                return <span key={d}>{format(d, "MMMM Do")}, </span>;
              }
            })}
          </Typography>
        )}
      </div>
    );
  }
}

export default withRoot(
  withStyles(styles)(inject("appStore")(observer(GDDTable)))
);
