import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import classnames from 'classnames';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardHeader from '@material-ui/core/CardHeader';

const styles = theme => ({
    details: {
        display: 'flex',
        flexDirection: 'column',
        padding: 10
    },
    media: {
        height: 100,
        backgroundSize: 'contain',
    },
    actions: {
        padding: '0 10px 0 10px',
        justifyContent: 'space-between',
    },
    card: {
        width: '100%',
    },
    root: {
        margin: 1,
        marginBottom: 10
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },

});


class MediaActionCard extends Component {
    state = { expanded: false };

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };

    render() {
        const { classes, content, header = null, collapseBody, actions, image } = this.props
        return (
            <React.Fragment>
                <main className={classes.root}>
                    <Card className={classes.card}>
                        {header && <CardHeader
                            avatar={
                                header.avatar
                            }
                            action={
                                header.actions
                            }
                            title={header.title}
                            subheader={header.subheader}
                        />}
                        {image && <CardMedia
                            image={image}
                            className={classes.media}
                        />}
                        {content && <CardContent className={classes.details}>
                            {content.caption && <Typography variant="subtitle2" gutterBottom>
                                {content.caption}
                            </Typography>}
                            {content.title && <Typography variant="h5" gutterBottom color={content.titleColor}>
                                {content.title}
                            </Typography>}
                            {content.textBody && <Typography variant='body2'>
                                {content.textBody}
                            </Typography>}
                            {content.customBody}
                        </CardContent>}
                        {actions && <CardActions className={classes.actions}>
                            {actions}
                            {collapseBody && <IconButton
                                className={classnames(classes.expand, {
                                    [classes.expandOpen]: this.state.expanded,
                                })}
                                onClick={this.handleExpandClick}
                                aria-expanded={this.state.expanded}
                                aria-label="Show more"
                            ><ExpandMoreIcon />
                            </IconButton>}
                        </CardActions>}
                        {collapseBody && <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography variant='body1'>
                                    {collapseBody}
                                </Typography>
                            </CardContent>
                        </Collapse>}
                    </Card>
                </main>
            </React.Fragment>
        )
    };
}

MediaActionCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(MediaActionCard));
