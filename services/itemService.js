const items = [
        {
            id: 1,
            gender: "male",
            imageURL: "https://shoegrab.com.au/cdn/shop/products/AirJordanWolfGreyWomensSHOEGRAB.png?v=1626304234",
            description: "Very comfortable, good for sport and especially running.",
            price: 55, 
            quantity: 1
        },
        {
            id: 2,
            gender: "male",
            imageURL: "https://classic.cdn.media.amplience.net/i/hibbett/0P044_6000_main",
            description: "Strong material, good for sport and hiking.",
            price: 120,
            quantity: 1
        },
        {
            id: 3,
            gender: "female",
            imageURL: "https://media.istockphoto.com/id/1436061606/photo/flying-colorful-womens-sneaker-isolated-on-white-background-fashionable-stylish-sports-shoe.webp?b=1&s=612x612&w=0&k=20&c=0HNmSNlbRt-6S0-Skx9DKZxrYYYdJRMJqOyYASt3EEI=",
            description: "Elegant, soft sole wich is very good for the feat and running.",
            price: 100,
            quantity: 1
        },
        {
            id: 4,
            gender: "female",
            imageURL: "https://5.imimg.com/data5/SELLER/Default/2023/1/QV/PH/GJ/182603251/pomzr-512-500x500.jpg",
            description: "Sport shoes for almost every ocassion.",
            price: 150,
            quantity: 1
        }
]

exports.getOne = (itemId) => {
    const newItem = items.find(item => item.id == itemId);
    return newItem;
}

exports.getAll = () => {
    return items.slice();
}

exports.create = (itemData) => {
    items.push(itemData);
}
