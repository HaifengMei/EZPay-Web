import React, { Component } from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import { observer } from "mobx-react";
import UserStore from "../../stores/UserStore";
import UIStore from "../../stores/UIStore";
import LoaderButton from "../../components/common/LoaderButton";
import { withFirebase } from "../../components/Firebase";
import { Link, withRouter } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { Button } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  error: {
    color: 'red'
  }
});

const INITIAL_STATE = {
  name: "",
  email: "",
  paypalId: "",
  passwordOne: "",
  passwordTwo: "",
  error: null,
  showPassword: false
};

class SignupFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  onSubmit = async event => {
    event.preventDefault();
    const { name, paypalId, email, passwordOne } = this.state;
    const response = await UserStore.signup(email, name, paypalId, passwordOne);
    if (response.status == 0) {
      this.setState({ ...INITIAL_STATE });
      this.props.history.push(ROUTES.SIGN_IN);
    } else {
      this.setState({ error: response.message });
    }
  };

  render() {
    const { classes } = this.props;
    const { loading } = UIStore;
    const {
      name,
      email,
      paypalId,
      passwordOne,
      passwordTwo,
      error,
      showPassword
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      name === "" ||
      paypalId === "";

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} onSubmit={this.onSubmit}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input
                name="name"
                value={name}
                onChange={this.onChange}
                autoComplete="name"
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                name="email"
                value={email}
                onChange={this.onChange}
                autoComplete="email"
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Paypal ID</InputLabel>
              <Input
                name="paypalId"
                value={paypalId}
                onChange={this.onChange}
                autoComplete="paypalId"
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="passwordOne"
                type={showPassword ? "text" : "password"}
                value={passwordOne}
                onChange={this.onChange}
                autoComplete="passwordOne"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={this.handleClickShowPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Confirm Password</InputLabel>
              <Input
                name="passwordTwo"
                type={showPassword ? "text" : "password"}
                value={passwordTwo}
                onChange={this.onChange}
                autoComplete="passwordTwo"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={this.handleClickShowPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <LoaderButton
              type="Submit"
              variant="contained"
              color="primary"
              loading={loading}
              disabled={isInvalid}
              title={loading ? "Signing up.." : "Submit"}
              className={classes.submit}
              fullWidth={true}
            />
            {error && <p className={classes.error}>{error}</p>}
          </form>
        </Paper>
      </main>
    );
  }
}

const SignupForm = withRouter(withFirebase(SignupFormBase));

SignupForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignupForm);
