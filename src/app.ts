import cors from "cors";
import express, { Application, Request, Response } from "express";
import { ProductRoutes } from "./app/modules/product/product.route";

const app: Application = express();

app.use(cors());
app.use(express.json());

// use all route
app.use("/api/products", ProductRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "l2b3 Assignment: 4 Fitness Equipment Server Running",
  });
});

app.all("*", (req: Request, res: Response) => {
  res.status(200).json({
    success: false,
    message: "Route not found",
  });
});

export default app;
