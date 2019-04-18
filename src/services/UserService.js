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
        status: 0,
        message: "Failed to create account. Try again later."
      };
    }
  }
}

export default new UserService();
