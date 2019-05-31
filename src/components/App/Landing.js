import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Signin from "../User/Signin";
import Signup from "../User/Signup";
import * as ROUTES from "../../constants/routes";
import { Route } from "react-router-dom";
import landingBG from '../../assets/img/Landing.png'

const styles = theme => ({
  title: {
    fontSize: 24
  },
  toolbar: {
    justifyContent: "space-between"
  },
  left: {
    flex: 1
  },
  leftLinkActive: {
    color: theme.palette.common.white
  },
  right: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end"
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginLeft: theme.spacing.unit * 3
  },
  linkSecondary: {
    color: theme.palette.secondary.main
  },
  routes:{
      marginTop:'10%'
  },
  root:{
    background: `url(${landingBG}) no-repeat`,
    backgroundSize:'cover',
    // margin:-115,
    height:720,
    overflow:'hidden  '
  }
});

function AppAppBar(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <div className={classes.left} />
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            className={classes.title}
            href="/"
          >
            {"EZPay"}
          </Link>
          <div className={classes.right}>
            <Link
              color="inherit"
              variant="h6"
              underline="none"
              className={classes.rightLink}
              href="/signin"
            >
              {"Sign In"}
            </Link>
            <Link
              variant="h6"
              underline="none"
              className={classNames(classes.rightLink, classes.linkSecondary)}
              href="/signup"
            >
              {"Sign Up"}
            </Link>
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.routes}>
        <Route path={ROUTES.SIGN_UP} component={Signup} />
        <Route path={ROUTES.SIGN_IN} component={Signin} />
      </div>
    </div>
  );
}

AppAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AppAppBar);
