import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import LinearProgress from "@material-ui/core/LinearProgress";
import uiStore from "../../stores/UIStore";
import { observer } from "mobx-react";

const INITIAL_STATE = {
  title: "",
  description: "",
  imgUrl: "",
  category: "",
  location: "POS",
  price: 0,
  error: null
};
const styles = theme => ({});
const categories = ["dining", "bar", "fastfood", "cafe"];
const locations = ["POS", "Arima", "San Fernando", "West Morings"];

class InvoiceBaseForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const {
      title,
      description,
      imgUrl,
      category,
      price,
      location
    } = this.state;
    const invoice = {
      title,
      description,
      imgUrl,
      category,
      price,
      location
    };
    this.props.handleCreate(invoice);
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleFocus = event => event.target.select();

  jsUcfirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {
    const { classes, open, handleClose } = this.props;
    const { posting } = uiStore;
    const {
      title,
      description,
      price,
      category,
      location,
      imgUrl,
      error
    } = this.state;

    const isInvalid =
      description === "" ||
      title === "" ||
      category === "" ||
      location === "" ||
      imgUrl === "";
    return (
      <div>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <form className={classes.form} onSubmit={this.onSubmit}>
            <DialogTitle id="form-dialog-title">New Invoice</DialogTitle>
            <DialogContent>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="title">Title</InputLabel>
                <Input
                  name="title"
                  value={title}
                  onChange={this.onChange}
                  autoComplete="title"
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="price">Price</InputLabel>
                <Input
                  name="price"
                  type="number"
                  value={price}
                  onChange={this.onChange}
                  autoComplete="price"
                  onFocus={this.handleFocus}
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="category">Category</InputLabel>
                <Select
                  value={category}
                  onChange={this.onChange}
                  inputProps={{
                    name: "category",
                    id: "category-simple"
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {categories.map(option => (
                    <MenuItem key={option} value={option}>
                      {this.jsUcfirst(option)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="location">Location</InputLabel>
                <Select
                  value={location}
                  onChange={this.onChange}
                  inputProps={{
                    name: "location",
                    id: "location-simple"
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {locations.map(option => (
                    <MenuItem key={option} value={option}>
                      {this.jsUcfirst(option)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="description">Description</InputLabel>
                <Input
                  name="description"
                  value={description}
                  onChange={this.onChange}
                  autoComplete="description"
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="imgUrl">Image Url</InputLabel>
                <Input
                  name="imgUrl"
                  value={imgUrl}
                  onChange={this.onChange}
                  autoComplete="imgUrl"
                />
              </FormControl>

              {error && <p>{error.message}</p>}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button
                type="submit"
                color="primary"
                disabled={isInvalid || posting}
              >
                Submit
              </Button>
            </DialogActions>
            {posting && <LinearProgress />}
          </form>
        </Dialog>
      </div>
    );
  }
}

const InvoiceForm = withRouter(observer(InvoiceBaseForm));

InvoiceForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(InvoiceForm);
