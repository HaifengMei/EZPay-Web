import { observable, decorate } from "mobx";
import { action } from "mobx";
import UIStore from "./UIStore";
import UserService from "../services/UserService";
import uiStore from "./UIStore";

class InvoiceStore {
  invoices = [
    {
      id: "INV122",
      category: "dining",
      title: "Shrimp and Chorizo Paella",
      lastUpdated: Date.now(),
      location: "POS",
      price: 150,
      description:
        "A simple paella recipe made with chorizo, shrimp, and chicken and cooked with tomatoes, veggies, and yellow rice. It's a great one-pot meal for weeknights",
      img:
        "https://muybuenocookbook.com/wp-content/uploads/2016/04/shrimp-and-chorizo-paella.jpg"
    },
    {
      id: "INV456",
      category: "bar",
      title: "Pineapple Mango Frozen Daiquiri",
      lastUpdated: Date.now(),
      location: "Arima",
      price: 70,
      description:
        "This frozen pineapple mango daiquiri is a surefire way to get you in the summer mood.",
      img:
        "https://www.mybakingaddiction.com/wp-content/uploads/2016/06/Frozen-Pineapple-Mango-Daiquiri-6-of-7-600x900.jpg"
    },
    {
      id: "INV789",
      category: "cafe",
      title: "Indian Espresso Coffee",
      lastUpdated: Date.now(),
      location: "San Fernando",
      price: 36,
      description:
        "Indian Espresso Coffee, a rich, creamy and frothy coffee, which can actually be described as an amalgam of espresso and cappuccino",
      img:
        "http://images.honestcooking.com/wp-content/uploads/2011/05/Indian-Espresso-Coffee.jpg"
    },
    {
      id: "INV143",
      category: "fastfood",
      title: "The Whopper Sandwiche",
      lastUpdated: Date.now(),
      location: "POS",
      price: 40,
      description:
        "The Whopper sandwiche is the signature hamburger product sold by the international fast-food resturant chain Burger King and it's Australian franchise Hungry Jack's",
      img:
        "https://bk-emea-prd.s3.amazonaws.com/sites/burgerking.co.uk/files/Whopper_detail.png"
    }
  ];

  addInvoice(invoice) {
    invoice.id = "INV" + Math.floor(100 + Math.random() * 900);
    this.invoices.push(invoice);
  }
}

decorate(InvoiceStore, {
  invoices: observable,
  addInvoice: action
});

const userStore = new InvoiceStore();
export default userStore;
