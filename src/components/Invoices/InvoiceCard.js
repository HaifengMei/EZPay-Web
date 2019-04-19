import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import FastFoodIcon from "@material-ui/icons/Fastfood";
import LocalCafeIcon from "@material-ui/icons/LocalCafe";
import LocalBarIcon from "@material-ui/icons/LocalBar";
import LocalDiningIcon from "@material-ui/icons/LocalDining";
import LocalShopping from "@material-ui/icons/LocalGroceryStore";
import QRCode from "qrcode";
import { teal } from "@material-ui/core/colors";
import moment from 'moment'
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
  card: {
    maxWidth: 400
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: teal
  },
  qrcode: {
    margin: -10,
    float:'right'
  }
});

class InvoiceCard extends React.Component {
  state = { expanded: false, qrcode: null };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  async componentDidMount() {
    try {
      const qrcode = await QRCode.toDataURL(
        JSON.stringify(this.props.invoice.id)
      );
      this.setState({ qrcode: qrcode });
    } catch (err) {
      console.error(err);
    }
  }

  displayIcon(category) {
    switch (category) {
      case "dining":
        return <LocalDiningIcon color="primary"/>;
      case "fastfood":
        return <FastFoodIcon color="primary"/>;
      case "cafe":
        return <LocalCafeIcon color="primary"/>;
      case "bar":
        return <LocalBarIcon color="primary"/>;
      default:
        return <LocalShopping color="primary"/>;
    }
  }

  truncate(string, length) {
    if(string.length > length){
      return `${string.substring(0, length)}...`
    }
    return string
  }

  render() {
    const { classes, invoice } = this.props;
    const { category, title, lastUpdated, description, imgUrl, price, location } = invoice;
    const { qrcode } = this.state;
    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              <Tooltip title={category} aria-label={category}>{this.displayIcon(category)}</Tooltip>
            </Avatar>
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={this.truncate(title,25)}
          subheader={`Updated: ${moment(lastUpdated).format('LL')}`}
        />
        <CardMedia className={classes.media} image={imgUrl} title={title} />
        <CardContent>
          <div className="row">
            <div className="col-sm-6">
              <Typography variant="h5" color="primary">
                $ {price}.00
              </Typography>
              <Typography variant="h6">
                {location}
              </Typography>
            </div>
            <div className="col-sm-6">
              {qrcode && <img alt= 'qrCode' className={classes.qrcode} src={qrcode} />}
            </div>
          </div>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography variant="body2">{description}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

InvoiceCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(InvoiceCard);
