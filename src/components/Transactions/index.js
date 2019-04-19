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
import Tooltip from "@material-ui/core/Tooltip";
import userStore from "../../stores/UserStore";
import { withFirebase } from "../Firebase";

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

const TransactionsBase = observer(
  class Transactions extends Component {
    state = { open: false };

    // async componentDidMount() {
    //   this.onListenForTransactions();
    // }

    refresh = async () => {
      await TransactionStore.setTransactions();
    }

    // onListenForTransactions = () => {
    //   uiStore.loading = true;

    //   this.props.firebase
    //     .transactions(userStore.user.id)
    //     .on("child_added", snapshot => {
    //       TransactionStore.appendNewTransaction(snapshot.val());
    //     });

    //   uiStore.loading = false;
    // };

    render() {
      const { loading } = uiStore;
      if (loading) {
        return <LoadingScreen />;
      }
      const { classes } = this.props;
      const { transactions } = TransactionStore;
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
          <Tooltip title="Refresh Transactions" aria-label="Refresh">
            <Fab
              color="primary"
              aria-label="Refresh"
              className={classes.fab}
              onClick={this.refresh}
            >
              <RefreshIcon />
            </Fab>
          </Tooltip>
        </React.Fragment>
      );
    }
  }
);

const Transactions = withFirebase(TransactionsBase);

Transactions.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Transactions);
