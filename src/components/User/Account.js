import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import uiStore from "../../stores/UIStore";
import LoadingScreen from "../common/Loading";
import { observer } from "mobx-react";
import userStore from "../../stores/UserStore";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Email from "@material-ui/icons/Email";
import CreditCard from "@material-ui/icons/CreditCard";
import { Divider } from "@material-ui/core";

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

const Account = observer(
  class Account extends Component {
    render() {
      const { loading } = uiStore;
      if (loading) {
        return <LoadingScreen />;
      }
      const { classes } = this.props;
      const { user } = userStore;
      return (
        <React.Fragment>
          <CssBaseline />
          Accounts Page
          <Divider />
          <List className={classes.root}>
            <ListItem>
              <Avatar>
                <AccountCircle />
              </Avatar>
              <ListItemText primary={user.name} secondary="Merchant Name" />
            </ListItem>
            <ListItem>
              <Avatar>
                <Email />
              </Avatar>
              <ListItemText primary={user.email} secondary="Email" />
            </ListItem>
            <ListItem>
              <Avatar>
                <CreditCard />
              </Avatar>
              <ListItemText primary={user.paypalId} secondary="PayPal ID" />
            </ListItem>
          </List>
        </React.Fragment>
      );
    }
  }
);

Account.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Account);
