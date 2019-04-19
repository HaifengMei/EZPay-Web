import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import uiStore from "../../stores/UIStore";
import LoadingScreen from "../common/Loading";
import { observer } from "mobx-react";
import userStore from "../../stores/UserStore";

const styles = theme => ({
  layout: {
    marginTop: 60
  },
  reward: {
    marginBottom: 10
  }
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
        </React.Fragment>
      );
    }
  }
);

Account.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Account);
