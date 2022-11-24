import express, { Application } from "express";
import "express-async-errors";
import "dotenv/config";
import bodyParser from "body-parser";
import cors from "cors";
import colors from "colors";
import path from "path";

import connectDB from "./config/db";
import { Port } from "./interfaces";
import { customErrorHandler } from "./middleware/errorMiddleware";
import routes from "./routes/routes";

class Server {
  private port: Port;
  private app: Application;

  constructor(port: Port, app: Application) {
    this.port = port;
    this.app = app;

    colors.enable();
    connectDB();
  }

  configs() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
    this.app.use(cors({ origin: true }));
  }

  routes() {
    routes(this.app);
  }

  serveStaticFiles() {
    this.app.use(express.static(path.join("client/dist")));

    this.app.get("*", (req, res) => res.sendFile(path.resolve("client", "dist", "index.html")));
  }

  errorHandling() {
    this.app.use(customErrorHandler.customExpressErrorHandler);
  }

  runPort() {
    this.app.listen(this.port, () => console.log(`Server started on port ${this.port}`));
  }
}

const server = new Server(process.env.PORT || 5000, express());
server.configs();
server.routes();
server.serveStaticFiles();
server.errorHandling();
server.runPort();
