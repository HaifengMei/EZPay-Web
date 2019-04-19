import { observable, decorate } from "mobx";
import { action } from "mobx";
import UIStore from "./UIStore";
import UserService from "../services/UserService";

class UseStore {
  user = null;

  async signup(email, name, paypalId, password) {
    UIStore.loading = true;
    const res = await UserService.Signup(email, name, paypalId, password);
    UIStore.loading = false;
    return res;
  }

  async signin(id) {
    UIStore.loading = true;
    const res = await UserService.SignIn(id);
    UIStore.loading = false;
  }

  async getMerchant(id) {
    UIStore.loading = true;
    const res = await UserService.GetMerchant(id);
    UIStore.loading = false;
    if (res.status && res.status == 1) {
      return false;
    } else {
      this.user = res;
      return true;
    }
  }
}

decorate(UseStore, {
  user: observable,
  signin: action,
  signup: action
});

const userStore = new UseStore();
export default userStore;
