import express from "express";
import cors from "cors";

import productRoutes from "./routes/productRoutes.js";

const app = express();

app.use(
  cors({
    origin: "*"
  })
);
app.use(express.json());

app.use("/api/products", productRoutes);

export default app;
