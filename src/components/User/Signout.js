import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import UIStore from "../../stores/UIStore";
import { withFirebase } from "../../components/Firebase";
import { Button } from "@material-ui/core";

const styles = theme => ({
  submit: {
    marginRight: theme.spacing.unit * 1
  }
});

class SignoutButton extends Component {
  onSubmit = () => {
    UIStore.loading = true;
    console.log("signout");
    this.props.firebase.doSignOut();
    UIStore.loading = false;
  };

  render() {
    const { classes } = this.props;
    return (
      <Button
        color="inherit"
        onClick={this.onSubmit}
        className={classes.submit}
      >
        Signout
      </Button>
    );
  }
}

const SignupForm = withFirebase(SignoutButton);

SignupForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignupForm);
