import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import uiStore from '../../stores/UIStore';
import LoadingScreen from '../common/Loading'
import { observer } from 'mobx-react';

const styles = theme => ({
    layout: {
        marginTop: 60
    },
    reward: {
        marginBottom: 10
    }
});


const Reports = observer(class Reports extends Component {


    render() {
        const { loading } = uiStore
        if (loading) {
            return <LoadingScreen />
        }
        const { classes } = this.props;
        return (
            <React.Fragment>
                <CssBaseline />
                Reports Page
            </React.Fragment>
        );
    }

})

Reports.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Reports);
