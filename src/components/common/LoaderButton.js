import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
    },
    wrapper: {
        width:'100%',
        position: 'relative',
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -2,
        marginLeft: -12,
    },
});

class CircularIntegration extends React.Component {

    render() {
        const { disabled, loading, title, className, color, variant, type, fullWidth = false } = this.props
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <div className={classes.wrapper}>
                    <Button
                        variant={variant}
                        color={color}
                        className={className}
                        disabled={loading || disabled}
                        type={type}
                        fullWidth={fullWidth}
                    >
                        {title}
                    </Button>
                    {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                </div>
            </div>
        );
    }
}

CircularIntegration.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CircularIntegration);
