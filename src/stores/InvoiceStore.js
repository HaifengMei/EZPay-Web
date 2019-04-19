import { observable, decorate } from "mobx";
import { action } from "mobx";
import InvoiceService from "../services/InvoiceService";
import userStore from "./UserStore";
import uiStore from "./UIStore";

class InvoiceStore {
  invoices = [];

  async addInvoice(invoice) {
    uiStore.posting = true;
    invoice.merchantId = userStore.user.id;
    const res = await InvoiceService.AddInvoice(invoice);
    uiStore.posting = false;
    if (res.type == "success") {
      invoice.id = res.message;
      this.invoices.push(invoice);
    } else {
      console.log(res.message);
    }
  }

  async setInvoices() {
    uiStore.loading = true;
    const merchantId = userStore.user.id;
    const res = await InvoiceService.GetInvoices(merchantId);
    if (res.status != 1) {
      Object.keys(res).forEach(key => {
        this.invoices.push(res[key]);
      });
    } else {
      console.log(res.message);
    }
    uiStore.loading = false;
  }
}

decorate(InvoiceStore, {
  invoices: observable,
  addInvoice: action
});

const invoiceStore = new InvoiceStore();
export default invoiceStore;
