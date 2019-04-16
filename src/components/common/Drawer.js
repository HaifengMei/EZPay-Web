import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { observer } from 'mobx-react'
import uiStore from '../../stores/UIStore'
import NavConfig from '../../config/nav'
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom'
import drawerBg from '../../assets/img/drawer-bg.jpg'
import Format from './Format'
import AccountIcon from '@material-ui/icons/AccountCircle'
import userStore from '../../stores/UserStore';
import merchantStore from '../../stores/MerchantStore';


const styles = theme => ({
    list: {
        width: 250,
    },

    cardHeader: {
        background: `linear-gradient(rgba(255,255,255,.7), rgba(255,255,255,.7)), url(${drawerBg}) no-repeat center `,
        backgroundSize: 'cover',
        height: 120,
        alignItems: 'flex-end'
    },

    cardHeader_title: {
        weight: 600
    },

    cardHeader_subTitle: {
        color: 'black'
    },

    avatar: {
        width: 50,
        height: 50,
    },

    avatarIcon: {
        width: 50,
        height: 50,
    },

    selectedListItem: {
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.main
    },

    signinLink: {
        color: theme.palette.primary.main,
        textDecoration: 'none'
    }
})

const TempDrawer = observer(class TempDrawer extends Component {

    toggleDrawer = (open) => () => {
        uiStore.toggleDrawer(open)
    }

    handleListItemClick = (index, id) => {
        if (id === 'signout') {
            userStore.signout()
        }
        merchantStore.unSetCurrentMerchant()
        uiStore.updateDrawerSelection(index)
        uiStore.updateBottomAppBar(index)
    };

    componentWillUnmount() {
        uiStore.updateBottomAppBar(0)
        uiStore.updateDrawerSelection(0)
    }

    render() {
        const { classes } = this.props
        const { open } = uiStore.drawer
        const selected = uiStore.getDIndex()
        const token = userStore.getToken()
        const drawerNav = token ? NavConfig.LoggedInDrawer : NavConfig.LoggedOutDrawer
        const sideList = (
            <div className={classes.list}>
                <List>
                    {drawerNav.map((nav, index) => (
                        <ListItem
                            button
                            selected={selected === index}
                            component={Link} to={nav.path}
                            key={nav.id}
                            onClick={event => this.handleListItemClick(index, nav.id)}
                        >
                            <ListItemIcon>{nav.icon}</ListItemIcon>
                            <ListItemText primary={nav.title} />
                        </ListItem>
                    ))}
                </List>
            </div>
        )

        return (
            <div>
                <SwipeableDrawer open={open} onOpen={this.toggleDrawer(true)} onClose={this.toggleDrawer(false)}>
                    <CardHeader
                        className={classes.cardHeader}
                        avatar={
                            token ? <Avatar alt="profile_image" src='https://data.whicdn.com/images/294408121/large.jpg' className={classes.avatar} /> : <Avatar className={classes.avatar}><AccountIcon className={classes.avatarIcon} /></Avatar>
                        }
                        title={
                            <Typography variant="subtitle1" color="default">
                                <b>{token ? `${Format.capitalize(token.fname)} ${Format.capitalize(token.lname)}` : <Link onClick={this.toggleDrawer(false)} className={classes.signinLink} to='/signin'>Signin</Link>} </b>
                            </Typography>
                        }
                        subheader={
                            <Typography variant="subtitle2" color="default">
                                Resonance Loyalties
                            </Typography>
                        }
                    />
                    <Divider />
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer(false)}
                        onKeyDown={this.toggleDrawer(false)}
                    >
                        {sideList}
                    </div>
                </SwipeableDrawer>
            </div>
        )
    }
})

TempDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(TempDrawer)
