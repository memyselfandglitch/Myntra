import mongoose from "mongoose";
import Product from "../models/Product.js"; // Adjust the path to your Product model

// Connect to MongoDB
mongoose.connect("mongodb+srv://deveshisingh7b:Hecv3RVLHOeXMGYo@cluster0.sv4afcx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const products = [
  {
    name: "Roadster Men Black & White Checked Casual Shirt",
    description: "Men Black & White Checked Casual Shirt",
    price: 799,
    link:
      "https://www.myntra.com/shirts/roadster/roadster-men-black--white-checked-casual-shirt/11986896/buy",
    imagePath: "roadster_black_white_shirt.jpeg",
  },
  {
    name: "HRX by Hrithik Roshan Men Navy Blue Solid Polo Collar T-shirt",
    description: "Men Navy Blue Solid Polo Collar T-shirt",
    price: 649,
    link:
      "https://www.myntra.com/tshirts/hrx-by-hrithik-roshan/hrx-by-hrithik-roshan-men-navy-blue-solid-polo-collar-t-shirt/11386708/buy",
    imagePath: "hrx_navy_blue_tshirt.jpeg",
  },
  {
    name: "Puma Men Black BMW MMS Drift Cat 8 Sneakers",
    description: "Men Black BMW MMS Drift Cat 8 Sneakers",
    price: 8999,
    link:
      "https://www.myntra.com/sports-shoes/puma/puma-men-black-bmw-mms-drift-cat-8-sneakers/10976370/buy",
    imagePath: "puma_black_sneakers.jpeg",
  },
  {
    name: "Louis Philippe Sport Men Blue & Green Checked Casual Shirt",
    description: "Men Blue & Green Checked Casual Shirt",
    price: 1999,
    link:
      "https://www.myntra.com/shirts/louis-philippe-sport/louis-philippe-sport-men-blue--green-checked-casual-shirt/11381752/buy",
    imagePath: "louis_philippe_blue_green_shirt.jpeg",
  },
  {
    name: "Levis Men Grey Solid Hoodie",
    description: "Men Grey Solid Hoodie",
    price: 2799,
    link: "https://www.myntra.com/hoodies/levis/levis-men-grey-solid-hoodie/11578754/buy",
    imagePath: "levis_grey_hoodie.jpeg",
  },
  {
    name: "Zara Women Black Mini Skirt",
    description: "Women Black Mini Skirt",
    price: 1499,
    link: "https://www.myntra.com/skirts/zara/zara-women-black-mini-skirt/12009560/buy",
    imagePath: "zara_black_mini_skirt.jpeg",
  },
  {
    name: "Nike Women Black Solid Pants",
    description: "Women Black Solid Pants",
    price: 2499,
    link: "https://www.myntra.com/pants/nike/nike-women-black-solid-pants/11876349/buy",
    imagePath: "nike_black_pants.jpeg",
  },
  {
    name: "Forever 21 Women Red Floral Dress",
    description: "Women Red Floral Dress",
    price: 1899,
    link: "https://www.myntra.com/dresses/forever-21/forever-21-women-red-floral-dress/11078756/buy",
    imagePath: "forever_21_red_floral_dress.jpeg",
  },
  {
    name: "Ray-Ban Unisex Aviator Sunglasses",
    description: "Unisex Aviator Sunglasses",
    price: 6999,
    link: "https://www.myntra.com/sunglasses/ray-ban/ray-ban-unisex-aviator-sunglasses/11786898/buy",
    imagePath: "ray_ban_aviator_sunglasses.jpeg",
  },
  {
    name: "Levis Men Blue Slim Fit Jeans",
    description: "Men Blue Slim Fit Jeans",
    price: 2199,
    link: "https://www.myntra.com/jeans/levis/levis-men-blue-slim-fit-jeans/11995368/buy",
    imagePath: "levis_blue_jeans.jpeg",
  },
  // Add more products as needed
];


const populateProducts = async () => {
  try {
    await Product.deleteMany(); // Optional: Delete all existing products
    await Product.insertMany(products);
    console.log("Products populated successfully");
  } catch (error) {
    console.error("Error populating products:", error);
  } finally {
    mongoose.connection.close();
  }
};

populateProducts();
