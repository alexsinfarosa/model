import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import { withStyles } from "@material-ui/core/styles";
import withRoot from "../withRoot";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import Modal from "@material-ui/core/Modal";

// spinner
import { RingLoader } from "react-spinners";

// components
import LeftPanel from "./LeftPanel";
import ManagementTable from "./ManagementTable";
import GDDTable from "./GDDTable";
import USMap from "./USMap";
import Footer from "./Footer";
import Disclaimer from "./Disclaimer";

const drawerWidth = 250;
const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex",
    width: "100%",
    height: "100vh",
    backgroundColor: "#E7ECF0"
  },
  appBar: {
    position: "absolute",
    marginLeft: drawerWidth,
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  navIconHide: {
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up("md")]: {
      position: "relative"
    }
  },
  content: {
    display: "flex",
    flex: 1,
    overflowY: "auto"
  },
  link: {
    color: "#fff",
    textDecoration: "none"
  },
  header: {
    fontSize: "90%",
    color: "white",
    "@media (min-width: 576px)": {
      fontSize: "100%",
      letterSpacing: 1
    }
  },
  centered: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 auto",
    maxWidth: 1200,
    padding: theme.spacing.unit * 2
  }
});

class App extends Component {
  state = {
    mobileOpen: false,
    isModalOpen: false,
    loading: true
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  closeDrawer = () => {
    this.setState({ mobileOpen: false });
  };

  toggleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  };

  render() {
    const { classes } = this.props;
    const { station } = this.props.appStore.paramsStore;
    const { data } = this.props.appStore.currentModel;

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.navIconHide}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" style={{ color: "#fff" }}>
              Blueberry Maggot Forecast Models
            </Typography>
          </Toolbar>
        </AppBar>

        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor="left"
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true
            }}
          >
            <LeftPanel
              closeDrawer={this.closeDrawer}
              toggleModal={this.toggleModal}
            />
          </Drawer>
        </Hidden>

        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper
            }}
          >
            <LeftPanel
              closeDrawer={this.closeDrawer}
              toggleModal={this.toggleModal}
            />
          </Drawer>
        </Hidden>

        {/* main content */}
        {station && (
          <main className={classes.content}>
            {data.length !== 0 ? (
              <div style={{ flex: 1 }}>
                <Typography variant="display1" align="center" gutterBottom>
                  Results for {station.name}, {station.state}
                </Typography>
                <div className={classes.centered}>
                  <ManagementTable />
                  <GDDTable />
                  <Disclaimer />
                  <Footer />
                </div>
              </div>
            ) : (
              <div
                className={classes.centered}
                style={{ flexDirection: "row" }}
              >
                <Typography variant="caption">LOADING...</Typography>
                <RingLoader color={"#843EA4"} loading={this.state.loading} />
              </div>
            )}
          </main>
        )}

        {/* US map */}
        <Modal
          aria-labelledby="US map"
          aria-describedby="US map"
          disableAutoFocus={true}
          open={this.state.isModalOpen}
          onClose={this.toggleModal}
          style={{
            width: "100%",
            height: "80%"
          }}
        >
          <div style={{ width: "100%", height: "100%" }}>
            <USMap
              params={this.state.params}
              stations={this.state.stations}
              toggleModal={this.toggleModal}
              closeDrawer={this.closeDrawer}
            />
          </div>
        </Modal>
      </div>
    );
  }
}

export default withRoot(withStyles(styles)(inject("appStore")(observer(App))));
