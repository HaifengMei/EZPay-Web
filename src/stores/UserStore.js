import { observable, decorate } from 'mobx'
import { action } from 'mobx'
import UIStore from './UIStore'
import UserService from '../services/UserService'
import uiStore from './UIStore';

class UseStore {
    token = null
    userDetails = null

    isLoggedIn() {
        return this.getToken() ? true : false
    }

    async signin(username, password, history) {
        UIStore.loading = true
        const res = await UserService.SignIn(username, password);
        if (await res.value) {
            this.setToken(res)
            UIStore.updateBottomAppBar(0)
            UIStore.updateBottomAppBar(0)
            UIStore.loading = false
            history.push('/')
        } else if (await res.error) {
            UIStore.loading = false
            UIStore.openSnackBar(res.error, null)
        }
    }

    signout = (history) => {
        this.token = null
        localStorage.removeItem('token');
        UIStore.updateBottomAppBar(0)
        UIStore.updateBottomAppBar(0)
    }

    setToken(token) {
        this.token = token
        localStorage.setItem('token', JSON.stringify(token));
    }

    getToken = () => {
        if (this.token) {
            return this.token
        } else if (localStorage.getItem('token')) {
            return JSON.parse(localStorage.getItem('token'))
        }
        return null
    }

    async getProfile() {
        uiStore.loading = true
        const details = await UserService.getUserDetails()
        console.log(details)
        this.userDetails = details
        uiStore.loading = false
    }

}

decorate(UseStore, {
    token: observable,
    userDetails: observable,
    isLoggedIn: action,
    signin: action,
    getToken: action,
    getProfile: action
})

const userStore = new UseStore()
export default userStore