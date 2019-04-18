import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import uiStore from "../../stores/UIStore";
import LoadingScreen from "../common/Loading";
import { observer } from "mobx-react";
import { Divider, Typography, Button } from "@material-ui/core";
import TransactionCard from "./TransactionCard";
import TransactionStore from "../../stores/TransactionStore";
import { Link } from "react-router-dom";
import Fab from "@material-ui/core/Fab";
import RefreshIcon from "@material-ui/icons/Refresh";

const styles = theme => ({
  layout: {
    marginTop: 60
  },
  reward: {
    marginBottom: 10
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  }
});

const Transactions = observer(
  class Transactions extends Component {
    state = { open: false };

    render() {
      const { loading } = uiStore;
      if (loading) {
        return <LoadingScreen />;
      }
      const { classes } = this.props;
      const { transactions } = TransactionStore;
      const { open } = this.state;
      return (
        <React.Fragment>
          <CssBaseline />
          <Typography variant="h5">Transactions</Typography>
          <Divider className="mb-4" />
          <div className="row">
            {transactions.map(transaction => (
              <div className="col-sm-12 col-md-6 mb-4" key={transaction.id}>
                <TransactionCard transaction={transaction} />
              </div>
            ))}
          </div>
          <Fab
            color="primary"
            aria-label="Add"
            className={classes.fab}
            onClick={this.handleClickOpen}
          >
            <RefreshIcon />
          </Fab>
        </React.Fragment>
      );
    }
  }
);

Transactions.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Transactions);
