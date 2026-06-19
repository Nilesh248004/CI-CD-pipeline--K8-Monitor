const express = require("express");
const client = require("prom-client");

const app = express();
const PORT = process.env.PORT || 3000;
const APP_NAME = process.env.APP_NAME || "CI/CD Kubernetes Monitoring App";

client.collectDefaultMetrics();

const httpRequestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status_code"]
});

app.use((req, res, next) => {
  res.on("finish", () => {
    httpRequestCounter.inc({
      method: req.method,
      route: req.path,
      status_code: res.statusCode
    });
  });
  next();
});

app.get("/", (req, res) => {
  res.json({
    message: `Welcome to ${APP_NAME}`,
    version: "1.0.0",
    status: "running"
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "UP",
    service: APP_NAME,
    timestamp: new Date().toISOString()
  });
});

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

app.listen(PORT, () => {
  console.log(`${APP_NAME} running on port ${PORT}`);
});