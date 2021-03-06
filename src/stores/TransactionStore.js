import { observable, decorate } from "mobx";
import TransactionService from "../services/TransactionService";
import userStore from "./UserStore";
import uiStore from "./UIStore";

class TransactionStore {
  transactions = [];
  initialLoadTime = 0;

  async setTransactions() {
    uiStore.loading = true;
    const merchantId = userStore.user.id;
    const res = await TransactionService.GetTransactions(merchantId);
    if (res.status != 1) {
      this.transactions = [];
      Object.keys(res).forEach(key => {
        this.transactions.push(res[key]);
      });
    } else {
      console.log(res.message);
    }
    uiStore.loading = false;
  }

  appendNewTransaction(transaction) {
    if (new Date().getTime() - 5000 >= this.initialLoadTime) {
      uiStore.openSnackBar(
        `New paid invoice : ${transaction.invoiceNumber}`,
        null,
        "info",
        null
      );
    }
    this.transactions.push(transaction);
  }
}

decorate(TransactionStore, {
  transactions: observable,
  initialLoadTime: observable
});

const transactionStore = new TransactionStore();
export default transactionStore;
