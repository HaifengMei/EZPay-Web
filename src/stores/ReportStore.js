import { observable, decorate } from "mobx";
import UIStore from "./UIStore";
import ReportService from "../services/ReportService";
import userStore from "./UserStore";

class ReportStore {
  topSellingProducts = [];

  async getTopSellingpProducts() {
    UIStore.loading = true;
    const uid = userStore.user.id;
    const res = await ReportService.GetTopSellingProducts(uid);
    UIStore.loading = false;

    if (res.status != 1) {
      this.topSellingProducts = []
      Object.keys(res).forEach(key => {
        this.topSellingProducts.push({ product: key, quantity: res[key] });
      });
      return res;
    }
  }

  // async getTransactionsByMonth() {
  //   UIStore.loading = true;
  //   const uid = userStore.user.id;
  //   const res = await ReportService.GetTransactionsByMonth(uid);
  //   if (res.status != 1) {
  //     this.topSellingProducts = res;
  //   }
  //   UIStore.loading = false;
  // }
}

decorate(ReportStore, {
  topSellingProducts: observable
});

const reportStore = new ReportStore();
export default reportStore;
