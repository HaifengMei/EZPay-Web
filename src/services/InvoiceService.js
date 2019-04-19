import api from "../configs/api";

class InvoiceService {
  async AddInvoice(invoice) {
    const url = `${api.server}/addInvoice`;
    var header = new Headers();
    header.append("Content-Type", "application/json");
    header.append("Accept", "application/json");
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: header,
        body: JSON.stringify(invoice)
      });
      const json = await response.json();
      return json;
    } catch (error) {
      return {
        type: 'error',
        message: "Failed to create new invoice. Try again later."
      };
    }
  }

  async GetInvoices(id) {
    const url = `${api.server}/getMerchantInvoices?id=${id}`;
    var header = new Headers();
    header.append("Content-Type", "application/json");
    header.append("Accept", "application/json");
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: header,
      });
      const json = await response.json();
      return json;
    } catch (error) {
      return {
        status: 1,
        message: "Failed to retrieve merchant invoices"
      };
    }
  }

}

export default new InvoiceService();
