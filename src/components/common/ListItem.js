import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemIcon from '@material-ui/core/ListItemIcon';

const styles = theme => ({
    inline: {
        display: 'inline',
    },
});

function CustomListItem(props) {
    const { classes, icon, avatar, title, body, action } = props;
    return (
        <ListItem alignItems="flex-start">
            {avatar && <ListItemAvatar>
                {avatar}
            </ListItemAvatar>}
            {icon && <ListItemIcon>
                {icon}
            </ListItemIcon>}
            <ListItemText
                primary={title || ''}
                secondary={body || ''}
            />
            {action && <ListItemSecondaryAction>
                {action}
            </ListItemSecondaryAction>}
        </ListItem>
    );
}

CustomListItem.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomListItem);