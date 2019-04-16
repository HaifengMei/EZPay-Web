import React, { Component } from 'react';
import SnackBar from './Snackbar'
import { observer } from 'mobx-react'
import UIStore from '../../stores/UIStore'


const Notification =  observer(class Notification extends Component {
    handleClose = () => {
        UIStore.closeSnackBar()
    }
    render() {
        const { message, variant, autoHideDuration } = UIStore.snackbar;
        return (
            <div>
                <SnackBar open={UIStore.snackbar.open} message={message} autoHideDuration={autoHideDuration} variant={variant} handleClose={this.handleClose} />
            </div>
        )
    }
})

export default Notification