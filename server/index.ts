import express, { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import colors from "colors";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({ origin: true }));

app.listen(port, () => console.log(`Server started on port ${port}`));
