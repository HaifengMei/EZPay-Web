
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import FastFoodIcon from "@material-ui/icons/Fastfood";
import LocalCafeIcon from "@material-ui/icons/LocalCafe";
import LocalBarIcon from "@material-ui/icons/LocalBar";
import LocalDiningIcon from "@material-ui/icons/LocalDining";
import LocalShopping from "@material-ui/icons/LocalGroceryStore";
import moment from 'moment'
import Tooltip from '@material-ui/core/Tooltip';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
    card: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 300,
        right: 0
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
    },
    playIcon: {
        height: 38,
        width: 38,
    },
});

class TransactionCard extends React.Component {

    displayIcon(category) {
        switch (category) {
            case "dining":
                return <LocalDiningIcon color="primary" />;
            case "fastfood":
                return <FastFoodIcon color="primary" />;
            case "cafe":
                return <LocalCafeIcon color="primary" />;
            case "bar":
                return <LocalBarIcon color="primary" />;
            default:
                return <LocalShopping color="primary" />;
        }
    }
    render() {
        const { classes, transaction, theme } = this.props;
        const { category, title, dateInserted, id, img, price, customerName, location } = transaction;
        return (
            <Card className={classes.card}>
                <div className={classes.details}>
                    <CardHeader
                        avatar={
                            <Avatar className={classes.avatar}>
                                <Tooltip title={category} aria-label={category}>{this.displayIcon(category)}</Tooltip>
                            </Avatar>
                        }
                        title={title}
                        subheader={`Paid on: ${moment(dateInserted).format('lll')}`}
                    />
                    <CardContent className={classes.content}>
                        <Typography component="h5" variant="h5" color="primary">
                            {customerName}
                        </Typography>
                        <Typography component="h6" variant="h6">
                            <b>$ {price}.00</b>
                        </Typography>
                    </CardContent>
                </div>
                <CardMedia
                    className={classes.cover}
                    image={img}
                    title={title}
                />
            </Card>
        )
    };
}

TransactionCard.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(TransactionCard);