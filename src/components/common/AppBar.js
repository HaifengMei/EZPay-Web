import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import { observer } from 'mobx-react'
import CssBaseline from '@material-ui/core/CssBaseline'
import UserStore from '../../stores/UserStore'
import { withRouter } from 'react-router-dom'
import MenuIcon from '@material-ui/icons/Menu'
import uiStore from '../../stores/UIStore'
import merchantStore from '../../stores/MerchantStore';
import NavConfig from '../../config/nav'
import { Link } from 'react-router-dom'
import Format from '../common/Format'

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  homeButton: {
    float: 'right'
  },
  grow: {
    flex: 1,
  },
  link: {
    textDecoration: 'none',
    color: 'black'
  }
})

const TopAppBar = withRouter(observer(class TopAppBar extends Component {

  state = {
    anchorEl: null,
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  handleLogout = async () => {
    UserStore.logout(this.props.history)
  }

  handleProfile = () => {
    this.setState({ anchorEl: null })
    this.props.history.push("/profile")
  }

  updateTitle() {
    const currentMerchant = merchantStore.getCurrentMerchant()
    if (currentMerchant) {
      return currentMerchant.merchantname
    } else if (this.props.history.location.pathname.length > 1) {
      const pathname = this.props.history.location.pathname
      return Format.capitalize(pathname.slice(1, pathname.length))
    }
    return 'RCL Loyalties'
  }

  navHome =() =>{
    merchantStore.unSetCurrentMerchant()
    uiStore.updateBottomAppBar(0)
    uiStore.updateDrawerSelection(0)
  }

  render() {
    const { classes } = this.props
    const merchantNav = this.props.history.location.pathname.slice(0, 10) === '/merchants'
    const title = this.updateTitle()
    const { toggleDrawer } = uiStore
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="sticky" color="primary">
          <Toolbar disableGutters>
            <IconButton color="inherit" aria-label="Menu" onClick={() => toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              {title}
            </Typography>
            {merchantNav &&
              <IconButton className={classes.homeButton}
                color="inherit" component={Link}
                to={NavConfig.navs.home.path}
                onClick={this.navHome}>
                {NavConfig.navs.home.icon}
              </IconButton>
            }
          </Toolbar>
        </AppBar>
      </React.Fragment>
    )
  }
}))


TopAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(TopAppBar)