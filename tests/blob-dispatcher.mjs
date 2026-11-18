import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const sdkRequire = createRequire(require.resolve("@vercel/blob"));
const { Agent, setGlobalDispatcher } = sdkRequire("undici");

// Initialise Node's built-in dispatcher before substituting the test dispatcher.
await fetch("data:,fixture");
const agent = new Agent().compose((dispatch) => (options, handler) => {
  if (String(options.origin) === "https://admin01.private.blob.vercel-storage.com") {
    return dispatch({
      ...options,
      origin: process.env.VERCEL_BLOB_API_URL,
      path: "/private" + options.path,
    }, handler);
  }
  return dispatch(options, handler);
});
setGlobalDispatcher(agent);
