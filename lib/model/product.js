// import mongoose from "mongoose";

// const productModel = new mongoose.Schema({
//     event: { type: String, required: true },
//     date: { type: String, required: true },
//     age: { type: Number }
// })

// export const Product = mongoose.models.products || mongoose.model("products", productModel)


// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema({
//   event: { type: String, required: true },
//   date: { type: String, required: true },
//   age: { type: Number }, // optional
// });

// // IMPORTANT: use 'Product' (capitalized), not 'products'
// export const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
// lib/model/product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  event: { type: String, required: true },
  date: { type: String, required: true },
  age: { type: Number },
});

export const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

