import cors from "cors";
import createError from "http-errors";
import express from "express";
import cookieParser from "cookie-parser";
import http from "http";

import { rateLimiter, requestLogger } from "./middlewares/security.js";
import fixtureRouter from "./routes/fixturesRoutes.js";
import { PORT } from "./config/env.js";
import syncTableRouter from "./database/syncTables.js";

const app = express();
const server = http.createServer(app);

app.set("trust proxy", 1);

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(requestLogger);
app.use(rateLimiter);

app.use("/api/v1/fixtures", fixtureRouter);
app.use("/api/v1/", syncTableRouter);

app.use((req, res, next) => {
  next(createError(404, "API endpoint not found"));
});

// we start our server here
const startServer = async () => {
  try {
    server.listen(PORT, () => {
      console.log(` Online Store API is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Unable to start server:", error);
    process.exit(1);
  }
};

// start the server
startServer();

export default app;
