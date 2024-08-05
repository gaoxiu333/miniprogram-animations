import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbotrace: {
      // control the log level of the turbotrace, default is `error`
      logLevel: "info",

      // control if the log of turbotrace should contain the details of the analysis, default is `false`
      logDetail: true,
      // show all log messages without limit
      // turbotrace only show 1 log message for each categories by default
      logAll: true,
      // control the context directory of the turbotrace
      // files outside of the context directory will not be traced
      // set the `experimental.outputFileTracingRoot` has the same effect
      // if the `experimental.outputFileTracingRoot` and this option are both set, the `experimental.turbotrace.contextDirectory` will be used
    },
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};

export default nextConfig;
