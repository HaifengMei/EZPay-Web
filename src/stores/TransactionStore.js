import { observable, decorate } from "mobx";

class TransactionStore {
    transactions = [
        {
            id: "TXN122",
            category: "dining",
            title: "Shrimp and Chorizo Paella",
            dateInserted: Date.now(),
            location: "POS",
            customerName: 'John Snow',
            price: 150,
            img:
                "https://muybuenocookbook.com/wp-content/uploads/2016/04/shrimp-and-chorizo-paella.jpg"
        },
        {
            id: "TXN456",
            category: "bar",
            title: "Pineapple Mango Frozen Daiquiri",
            dateInserted: Date.now(),
            location: "Arima",
            price: 70,
            customerName: 'Daenerys Targaryen',
            description:
                "This frozen pineapple mango daiquiri is a surefire way to get you in the summer mood.",
            img:
                "https://www.mybakingaddiction.com/wp-content/uploads/2016/06/Frozen-Pineapple-Mango-Daiquiri-6-of-7-600x900.jpg"
        },
        {
            id: "TXN789",
            category: "cafe",
            title: "Indian Espresso Coffee",
            dateInserted: Date.now(),
            location: "San Fernando",
            price: 36,
            customerName: 'Cersei Lannister',
            description:
                "Indian Espresso Coffee, a rich, creamy and frothy coffee, which can actually be described as an amalgam of espresso and cappuccino",
            img:
                "http://images.honestcooking.com/wp-content/uploads/2011/05/Indian-Espresso-Coffee.jpg"
        },
        {
            id: "TXN143",
            category: "fastfood",
            title: "The Whopper Sandwiche",
            dateInserted: Date.now(),
            location: "POS",
            price: 40,
            customerName: 'Tyrion Lannister',
            description:
                "The Whopper sandwiche is the signature hamburger product sold by the international fast-food resturant chain Burger King and it's Australian franchise Hungry Jack's",
            img:
                "https://bk-emea-prd.s3.amazonaws.com/sites/burgerking.co.uk/files/Whopper_detail.png"
        }
    ];

}

decorate(TransactionStore, {
    transactions: observable,
});

const userStore = new TransactionStore();
export default userStore;
