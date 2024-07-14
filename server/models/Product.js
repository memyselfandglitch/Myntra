import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    price: Number,
    link: {
        type: String,
        required: true
    },
    imagePath: {
        type: String,
        required: true
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
