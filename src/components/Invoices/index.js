import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import uiStore from "../../stores/UIStore";
import LoadingScreen from "../common/Loading";
import { observer } from "mobx-react";
import { Divider, Typography, Button } from "@material-ui/core";
import InvoiceCard from "./InvoiceCard";
import InvoiceStore from "../../stores/InvoiceStore";
import { Link } from "react-router-dom";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import InvoiceForm from "./InvoiceForm";
import Tooltip from "@material-ui/core/Tooltip";

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

const Invoices = observer(
  class Invoices extends Component {
    state = { open: false };

    handleClickOpen = () => {
      this.setState({ open: true });
    };

    handleClose = () => {
      this.setState({ open: false });
    };

    onCreate = async invoice => {
      await InvoiceStore.addInvoice(invoice);
      
      this.handleClose();
    };

    async componentDidMount() {
      await InvoiceStore.setInvoices();
    }

    render() {
      const { loading } = uiStore;
      if (loading) {
        return <LoadingScreen />;
      }
      const { classes } = this.props;
      const { invoices } = InvoiceStore;
      const { open } = this.state;
      return (
        <React.Fragment>
          <CssBaseline />
          <Typography variant="h5">Invoices</Typography>
          <Divider className="mb-4" />
          <div className="row">
            {invoices.map(invoice => (
              <div className="col-md-6 col-lg-4 col-xl-3 mb-3" key={invoice.id}>
                <InvoiceCard invoice={invoice} />
              </div>
            ))}
          </div>
          <Tooltip title="Add New Invoice" aria-label="Add">
            <Fab
              color="primary"
              aria-label="Add"
              className={classes.fab}
              onClick={this.handleClickOpen}
            >
              <AddIcon />
            </Fab>
          </Tooltip>
          <InvoiceForm
            open={open}
            handleClose={this.handleClose}
            handleCreate={this.onCreate}
          />
        </React.Fragment>
      );
    }
  }
);

Invoices.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Invoices);
