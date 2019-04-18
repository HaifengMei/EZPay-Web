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
}

decorate(UseStore, {
  user: observable,
  signin: action,
  signup: action
});

const userStore = new UseStore();
export default userStore;
