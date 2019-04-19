import api from "../configs/api";

class TransactionService {
    async GetTransactions(id) {
        const url = `${api.server}/getTransactionsByMerchantId?merchantId=${id}`;
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
            message: "Failed to retrieve merchant transactions"
          };
        }
      }
}

export default new TransactionService();
