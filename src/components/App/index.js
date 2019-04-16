import React, { Component } from "react";
import "../../assets/css/App.css";
import {
  MuiThemeProvider as Themer,
  createMuiTheme
} from "@material-ui/core/styles";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { teal, red,  cyan } from "@material-ui/core/colors";
import Home from "./Home";
import Landing from "./Landing";

import { withFirebase } from '../Firebase';
const breakpointValues = {
  xs: 0,
  sm: 320,
  md: 375,
  lg: 400,
  xl: 600
};

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: cyan,
    error: red
  }
  //   breakpoints: { values: breakpointValues }
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null
    };
  }

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(
      authUser => {
        authUser
          ? this.setState({ authUser })
          : this.setState({ authUser: null });
      },
    );
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
    const authUser =  this.state.authUser
    console.log(authUser)
    return (
      <Themer theme={theme}>
        <Router>{authUser ? <Home /> : <Landing />}</Router>
      </Themer>
    );
  }
}

export default withFirebase(App);
