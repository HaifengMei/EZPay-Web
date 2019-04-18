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
import UIStore from "../../stores/UIStore";
import LoaderButton from "../../components/common/LoaderButton";
import { withFirebase } from "../../components/Firebase";
import { withRouter } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

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
    color: "red"
  }
});

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null,
  showPassword: false
};

class SigninFormBase extends Component {
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

  onSubmit = event => {
    const { email, password } = this.state;
    UIStore.loading = true;
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
    UIStore.loading = false;

    event.preventDefault();
  };

  render() {
    const { classes } = this.props;
    const { loading } = UIStore;
    const { email, password, error, showPassword } = this.state;

    const isInvalid = password === "" || email === "";

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <form className={classes.form} onSubmit={this.onSubmit}>
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
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={this.onChange}
                autoComplete="password"
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
            {error && <p className={classes.error}>{error.message}</p>}
          </form>
        </Paper>
      </main>
    );
  }
}

const SignupForm = withRouter(withFirebase(SigninFormBase));

SignupForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignupForm);
