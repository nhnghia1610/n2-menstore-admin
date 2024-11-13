import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: String,
  description: String,
  media: [String],
  categoryId: String,
  collections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Collection" }],
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  tags: [String],
  sizes: [String],
  colors: [String],
  price: { type: mongoose.Schema.Types.Decimal128, get: (v: mongoose.Schema.Types.Decimal128) => { return parseFloat(v.toString()) }},
  expense: { type: mongoose.Schema.Types.Decimal128, get: (v: mongoose.Schema.Types.Decimal128) => { return parseFloat(v.toString()) }},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, { toJSON: { getters: true } });

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;