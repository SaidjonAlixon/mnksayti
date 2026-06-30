import { createApp } from "../artifacts/api-server/src/create-app";

/** Required for multer file uploads on Vercel serverless */
export const config = {
  api: {
    bodyParser: false,
  },
};

/** Vercel serves this at /api/* — paths arrive without the /api prefix */
export default createApp({ mountPath: "/" });
