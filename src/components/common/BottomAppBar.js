import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import CssBaseline from '@material-ui/core/CssBaseline'
import { observer } from 'mobx-react';
import uiStore from '../../stores/UIStore';
import { Link, withRouter } from 'react-router-dom'
import merchantStore from '../../stores/MerchantStore';
import NavConfig from '../../config/nav'
import userStore from '../../stores/UserStore';

const styles = theme => ({
});

const LabelBottomNavigation = observer(class LabelBottomNavigation extends Component {

    handleChange = (event, value) => {
        uiStore.updateBottomAppBar(value)
    };

    switchBAB() {
        const pathname = this.props.history.location.pathname
        const auth = userStore.isLoggedIn()
        if (pathname.slice(0, 10) === '/merchants') {
            return NavConfig.MerchantNav
        } else if (auth) {
            return NavConfig.LoggedInBAB
        } else {
            return NavConfig.LoggedOutBAB
        }
    }

    componentWillUnmount(){
        merchantStore.unSetCurrentMerchant()
    }

    render() {
        const selected = uiStore.getBABIndex()
        const currentMerchant = merchantStore.getCurrentMerchant()
        const babNav = this.switchBAB()
        return (
            <React.Fragment>
                <CssBaseline />
                <BottomNavigation position="sticky" value={selected} onChange={this.handleChange} showLabels>
                    {babNav.map((nav, index) => (
                        <BottomNavigationAction
                            component={Link}
                            to={currentMerchant ? `/merchants/${currentMerchant.merchantid}${nav.path}` : nav.path}
                            key={nav.id}
                            label={nav.title}
                            value={index}
                            icon={nav.icon}
                        />
                    ))}
                </BottomNavigation>
            </React.Fragment>
        );
    }
})

LabelBottomNavigation.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(LabelBottomNavigation));
