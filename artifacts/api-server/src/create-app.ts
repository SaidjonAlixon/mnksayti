import type { IncomingMessage, ServerResponse } from "node:http";
import express, { type Express } from "express";
import cors from "cors";
import { pinoHttp } from "pino-http";
import router from "./routes/index.js";
import { logger } from "./lib/logger.js";

export type CreateAppOptions = {
  /** API mount path. Use "/" on Vercel (paths already include /api prefix). */
  mountPath?: string;
};

export function createApp(options: CreateAppOptions = {}): Express {
  const mountPath = options.mountPath ?? "/api";
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
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(mountPath, router);

  return app;
}
