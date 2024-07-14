import Product from "../models/Product.js";

/* READ */
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
    console.log(products)
    res.status(200).json(products);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (err) {
    console.log("Could not get product")
    res.status(404).json({ message: err.message });
  }
};