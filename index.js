const express = require("express");
const handlebars = require("express-handlebars");
const itemService = require("./services/itemService");
const mongoose = require("mongoose");
const Item = require("./models/Item");
const authController = require("./controllers/authController");
const cookieParser = require("cookie-parser");
const { auth } = require("./middlewares/authMiddleware");
const { isAuth } = require("./middlewares/authMiddleware");

mongoose.connect("mongodb://localhost:27017/shoppingCart")
    .then(() => console.log("DB connected sucesfully!"));
   

const shoes = [
    {
        id: 1,
        gender: "male",
        imageURL: "https://shoegrab.com.au/cdn/shop/products/AirJordanWolfGreyWomensSHOEGRAB.png?v=1626304234",
        description: "Grey nike",
        price: 55,
        quantity: 1
    },
    {
        id: 2,
        gender: "male",
        imageURL: "https://classic.cdn.media.amplience.net/i/hibbett/0P044_6000_main",
        description: "Red nike",
        price: 120,
        quantity: 1
    },
    {
        id: 3,
        gender: "female",
        imageURL: "https://media.istockphoto.com/id/1436061606/photo/flying-colorful-womens-sneaker-isolated-on-white-background-fashionable-stylish-sports-shoe.webp?b=1&s=612x612&w=0&k=20&c=0HNmSNlbRt-6S0-Skx9DKZxrYYYdJRMJqOyYASt3EEI=",
        description: "Nike air soft",
        price: 100,
        quantity: 1
    },
    {
        id: 4,
        gender: "female",
        imageURL: "https://5.imimg.com/data5/SELLER/Default/2023/1/QV/PH/GJ/182603251/pomzr-512-500x500.jpg",
        description: "Pink buldozer",
        price: 150,
        quantity: 1
    }
]

//Item.create(shoes).then(data => console.log(data));

//Get data
//Student.find()
//   .then(students => {
//    students.forEach(student => console.log(student.getInfo()));
//   })
//
const app = express();

app.engine("hbs", handlebars.engine({
    extname: "hbs"
}));
app.set("view engine", "hbs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use("/auth", authController);
app.use(cookieParser());
app.use(auth);

//Homepage
app.get("/", (req, res) => {
    const isAuthenticated = !!req.user;

    res.render("home", { shoes, isAuthenticated });
});

//Man
app.get("/man", (req, res) => {
    const isAuthenticated = !!req.user;

    try{
        const manShoes = shoes.filter(shoe => shoe.gender === "male");

        res.render("home", { shoes: manShoes, isAuthenticated });
    }catch(err){
        console.log(err);
    }
});

//Woman
app.get("/woman", (req, res) => {
    const isAuthenticated = !!req.user;

    try{
        const womanShoes = shoes.filter(woman => woman.gender === "female");

        res.render("home", { shoes: womanShoes, isAuthenticated });
    }catch (err){
        console.log(err);
    }
});

//Information
app.get("/information/:itemId", (req, res) => {
    const isAuthenticated = !!req.user;
   
    const itemId = req.params.itemId;
    const item = itemService.getOne(itemId);

    res.render("information", { item, isAuthenticated });
});

//Cart
app.get("/cart/:itemId", isAuth, (req, res) => {
    const isAuthenticated = !!req.user;

    const cartId = req.params.itemId;
    const cart = itemService.getOne(cartId);

    Item.create(cart);

    res.render("cart", { cart, isAuthenticated });
});
    //console.log(poping);

//Purchased
app.get("/purchased", (req, res) => {
    try{
        res.redirect("/");
        console.log("Purchase made sucessfully!");
    }catch (err){
        console.log(err);
    }

});

app.listen(5000, () => console.log("Server is listening on http://localhost:5000"));