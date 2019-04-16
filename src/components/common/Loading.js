import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },

  center: {
    margin: 'auto',
    textAlign: 'center'
  }
});

function CircularIndeterminate(props) {
  const { classes } = props;
  return (
    <div className={classes.center}>
      <CircularProgress size={68} className={classes.progress} />
    </div>
  );
}

CircularIndeterminate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CircularIndeterminate);