import api from "../configs/api";

class UserService {
  async Signup(email, name, paypalId, password) {
    const url = `${api.server}/createNewMerchant`;
    var header = new Headers();
    header.append("Content-Type", "application/json");
    header.append("Accept", "application/json");
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: header,
        body: JSON.stringify({
          email: email,
          name: name,
          paypalId: paypalId,
          password: password
        })
      });
      const json = await response.json();
      return json;
    } catch (error) {
      return {
        status: 1,
        message: "Failed to create account. Try again later."
      };
    }
  }

  async GetMerchant(id) {
    const url = `${api.server}/getMerchant?id=${id}`;
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
        message: "Failed to retrieve merchant information"
      };
    }
  }

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
}

export default new UserService();
