import helmet from "helmet";
import cors from "cors";

import isProduction from "@/utils/isProduction";
import Boom from "@hapi/boom";

const HelmetLib = helmet({
  hidePoweredBy: true,
  crossOriginEmbedderPolicy: false,
  referrerPolicy: { policy: "same-origin" },
  crossOriginResourcePolicy: { policy: "cross-origin" },
  permittedCrossDomainPolicies: { permittedPolicies: "all" },
});

const whitelist = ["http://localhost:3000"];

const CorsLib = cors({
  origin(requestOrigin: string | undefined, callback) {
    if (!isProduction) {
      callback(null, true);
      return;
    } else if (
      (requestOrigin && whitelist.indexOf(requestOrigin) !== -1) ||
      !requestOrigin
    ) {
      callback(null, true);
    } else {
      callback(Boom.forbidden("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: "GET,POST,OPTIONS",
  maxAge: 600,
  allowedHeaders: ["Content-Type", "Referer", "Set-Cookie", "Cookie"],
});

export { HelmetLib as HelmetSecurity, CorsLib as CorsSecurity };
