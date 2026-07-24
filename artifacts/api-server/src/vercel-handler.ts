import express from "express";
import cors from "cors";
import { pinoHttp } from "pino-http";
import type { IncomingMessage, ServerResponse } from "node:http";
import { loadEnvFile } from "./lib/load-env.js";
import router from "./routes/index.js";
import { logger } from "./lib/logger.js";

loadEnvFile();

const app = express();

/** Restore original path when Vercel rewrites /api/* → /api. */
app.use((req, _res, next) => {
  const candidates = [
    req.headers["x-forwarded-uri"],
    req.headers["x-invoke-path"],
    req.headers["x-vercel-forwarded-path"],
    req.headers["x-matched-path"],
  ];
  for (const value of candidates) {
    const pathValue = Array.isArray(value) ? value[0] : value;
    if (typeof pathValue === "string" && pathValue.startsWith("/api")) {
      const q = req.url?.includes("?") ? req.url.slice(req.url.indexOf("?")) : "";
      req.url = pathValue.includes("?") ? pathValue : `${pathValue}${q}`;
      break;
    }
  }
  next();
});

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req: IncomingMessage) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res: ServerResponse) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);
app.use(router);

export default app;
