import express from "express";
import cors from "cors";
import { pinoHttp } from "pino-http";
import type { IncomingMessage, ServerResponse } from "node:http";
import { loadEnvFile } from "./lib/load-env.js";
import router from "./routes/index.js";
import { logger } from "./lib/logger.js";

loadEnvFile();

/** Disable Vercel body parsing so multer can read multipart uploads. */
export const config = {
  api: {
    bodyParser: false,
  },
  maxDuration: 60,
};

const app = express();

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

/**
 * Vercel catch-all `api/[[...path]].js` may pass `/api/...` or `/...`.
 * Mount once at both so driver-application routes always match.
 */
app.use("/api", router);
app.use(router);

export default app;
