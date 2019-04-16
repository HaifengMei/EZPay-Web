import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { observer } from 'mobx-react';
import { Paper } from '@material-ui/core';

function TabContainer({ children, dir }) {
    return (
        <Typography variant="body1" dir={dir} style={{ padding: 10, marginTop: 50 }}>
            {children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
    dir: PropTypes.string.isRequired,
};

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: 'inherit',
        margin: '-10px -10px 0 -10px'
    },

    tabsRoot: {
        minWidth: 120
    },

    appBar: {
        position: 'fixed',
        zIndex: 2,
        width: '100%'
    },
});

const FullWidthTabs = observer(class FullWidthTabs extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (value) => {
        this.setState({ value });
    };

    render() {
        const { classes, theme, tabs, tabContents } = this.props;
        console.log(tabContents)
        const { value } = this.state
        return (
            <div className={classes.root}>
                <Paper className={classes.appBar} color="default">
                    <Tabs
                        value={value}
                        onChange={(event, value) => this.handleChange(value)}
                        indicatorColor="secondary"
                        textColor="secondary"
                        variant={tabs.length > 3 ? "scrollable" : "fullWidth"}
                        scrollButtons="auto"
                    >
                        {
                            tabs.map(t => (
                                <Tab key={t.id} classes={{ root: classes.tabsRoot }} icon={t.icon && t.icon} label={t.title && t.title} />
                            ))
                        }
                    </Tabs>
                </Paper>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={this.handleChange}
                >
                    {tabContents.map(tc => (
                        <TabContainer key={tc.id} dir={theme.direction}>{tc.value}</TabContainer>
                    ))}
                </SwipeableViews>
            </div>
        );
    }
})

FullWidthTabs.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(FullWidthTabs);