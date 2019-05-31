import api from "../configs/api";

class ReportService {
  async GetTopSellingProducts(id) {
    const url = `${api.server}/topSellingProduct?merchantId=${id}`;
    var header = new Headers();
    header.append("Content-Type", "application/json");
    header.append("Accept", "application/json");
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: header
      });
      const json = await response.json();
      return json;
    } catch (error) {
      return {
        status: 1,
        message: "Failed to retrieve top selling product"
      };
    }
  }

  async GetTransactionsByMonth(id) {
    const url = `${api.server}/transactionsByMonth?merchantId=${id}`;
    var header = new Headers();
    header.append("Content-Type", "application/json");
    header.append("Accept", "application/json");
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: header
      });
      const json = await response.json();
      return json;
    } catch (error) {
      return {
        status: 1,
        message: "Failed to retrieve top selling product"
      };
    }
  }
}

export default new ReportService();
