import { createApp } from "./create-app.js";

/** Required for multer file uploads on Vercel serverless */
export const config = {
  api: {
    bodyParser: false,
  },
  maxDuration: 60,
};

/** Vercel serves this at /api/* — paths arrive without the /api prefix */
export default createApp({ mountPath: "/" });
