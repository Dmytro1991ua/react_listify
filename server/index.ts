import express, { Application } from "express";
import "express-async-errors";
import "dotenv/config";
import bodyParser from "body-parser";
import cors from "cors";
import colors from "colors";
import path from "path";

import connectDB from "./config/db";
import { customExpressErrorHandler } from "./middleware/errorMiddleware";
import { Port } from "./interfaces";
import userRoutes from "./routes/userRoutes";
import shoppingListRoutes from "./routes/shoppingListRoutes";

colors.enable();
connectDB();

const app: Application = express();
const port: Port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({ origin: true }));

app.use("/api/users", userRoutes);
app.use("/api/shopping-lists", shoppingListRoutes);

app.use(customExpressErrorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
