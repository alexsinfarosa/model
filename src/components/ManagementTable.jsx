import React, { Component, Fragment } from "react";
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
import Hidden from "@material-ui/core/Hidden";

// pest management messages
import { pestManagement } from "../assets/pestManagement";

// styles
const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 1200,
    margin: "0 auto",
    marginTop: theme.spacing.unit * 2,
    borderRadius: 8
  },
  table: {
    // minWidth: 700,
    borderRadius: 4,
    marginBottom: theme.spacing.unit * 8
  },
  isMobile: {
    [theme.breakpoints.down("md")]: {
      display: "none"
    }
  },
  tableCell: {
    fontSize: "0.8rem",
    padding: "0 10px",
    textAlign: "center",
    "@media (min-width: 576px)": {
      fontSize: "0.8rem"
    }
  },
  tableHeader: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    borderRight: "1px solid #eee"
  }
});

class ManagementTable extends Component {
  render() {
    const { classes } = this.props;
    const { dataForTable } = this.props.appStore.paramsStore;

    let cdd;
    if (dataForTable) {
      cdd = dataForTable[2].cdd;
    }
    let status;
    if (cdd <= 613) status = pestManagement[0];
    if (cdd > 613) status = pestManagement[1];
    if (cdd > 863) status = pestManagement[2];
    if (cdd > 964) status = pestManagement[3];

    return (
      <Fragment>
        {status ? (
          <div>
            <Typography variant="headline" className={classes.root}>
              Management
            </Typography>
            <Fragment>
              <Hidden only="xs">
                <Paper className={classes.root}>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          className={classes.tableCell}
                          // rowSpan={2}
                          style={{
                            textAlign: "center",
                            margin: 0,
                            padding: 0,
                            borderRight: "1px solid #E0E0E0"
                          }}
                        >
                          <div>PEST STATUS</div>
                        </TableCell>
                        <TableCell
                          style={{
                            textAlign: "center",
                            borderLeft: "1px solid #E0E0E0",
                            borderRight: "1px solid #E0E0E0"
                          }}
                          // colSpan={2}
                        >
                          <div>PEST MANAGEMENT</div>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow hover>
                        <TableCell>{status.status}</TableCell>
                        <TableCell
                          style={{
                            borderLeft: "1px solid #E0E0E0"
                          }}
                        >
                          {status.management}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Paper>
              </Hidden>

              <Hidden smUp>
                <Paper className={classes.root}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          // rowSpan={2}
                          style={{
                            textAlign: "center"
                          }}
                        >
                          <div>PEST STATUS</div>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow hover>
                        <TableCell>{status.status}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Paper>
              </Hidden>

              <Hidden smUp>
                <Paper className={classes.root}>
                  <Table style={{ marginTop: 16, marginBottom: 32 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          style={{
                            textAlign: "center"
                          }}
                        >
                          <div>PEST MANAGEMENT</div>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow hover>
                        <TableCell>{status.management}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Paper>
              </Hidden>
            </Fragment>
          </div>
        ) : null}
      </Fragment>
    );
  }
}

export default withRoot(
  withStyles(styles)(inject("appStore")(observer(ManagementTable)))
);
