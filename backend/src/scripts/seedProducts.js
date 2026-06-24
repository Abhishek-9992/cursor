import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Product from "../models/Product.js";
import { generateProducts } from "../utils/generateProducts.js";

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected");

    await Product.deleteMany();

    const BATCH_SIZE = 10000;
    const TOTAL = 200000;

    for (let i = 0; i < TOTAL; i += BATCH_SIZE) {
      const products = generateProducts(BATCH_SIZE);

      await Product.insertMany(products);

      console.log(`Inserted ${i + BATCH_SIZE}`);
    }

    console.log("200k products inserted");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seed();
