import { observable, decorate } from 'mobx'
import { action } from 'mobx'

class UIStore {
    loading = false
    snackbar = {
        open: false,
        message: null,
        autoHideDuration: null,
        specialAction: null
    }

    dialog = {
        open: false,
        title: null,
        confirmText: 'confirm',
        closeAction: null,
        children: null
    }

    drawer = {
        open: false,
    }

    drawerIndex = 0

    bottomAppBarIndex = 0

    openDialog(title = null, confirmText = 'confirm', closeAction = null, children = null) {
        this.dialog = {
            open: true,
            title: title,
            confirmText: confirmText,
            closeAction: closeAction,
            children: children
        }
    }

    closeDialog = () => {
        this.dialog = {
            open: false,
            title: '',
            confirmText: 'confirm',
            children: null
        }
    }

    openSnackBar(message = null, autoHideDuration = null) {
        this.snackbar = {
            open: true,
            message: message,
            autoHideDuration: autoHideDuration,
        }
    }

    closeSnackBar() {
        this.snackbar = {
            open: false,
            message: null,
            autoHideDuration: null,
        }
    }

    toggleDrawer = (open) => {
        this.drawer.open = open
    }

    updateDrawerSelection = (idx) => {
        this.drawerIndex = idx
        localStorage.setItem('DIndex', idx);
    }

    updateBottomAppBar = (idx) => {
        this.bottomAppBarIndex = idx
        localStorage.setItem('BABIndex', idx);
    }

    getBABIndex = () =>{
        if (localStorage.getItem('BABIndex')) {
            return parseInt(localStorage.getItem('BABIndex'))
        } else if (this.bottomAppBarIndex) {
            return this.bottomAppBarIndex
        }
        return 0
    }

    getDIndex = () =>{
        if (localStorage.getItem('DIndex')) {
            return parseInt(localStorage.getItem('DIndex'))
        } else if (this.drawerIndex) {
            return this.drawerIndex
        }
        return 0
    }
}

decorate(UIStore, {
    loading: observable,
    snackbar: observable,
    dialog: observable,
    drawer: observable,
    drawerIndex: observable,
    bottomAppBarIndex: observable,
    openDialog: action,
    closeDialog: action,
    openSnackBar: action,
    closeSnackBar: action,
    toggleDrawer: action,
    updateDrawerSelection: action,
    updateBottomAppBar: action,
    getBABIndex: action,
    getDIndex: action
    
})

const uiStore = new UIStore()
export default uiStore