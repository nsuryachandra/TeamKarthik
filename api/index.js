import { createRequire } from "module";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serverPath = path.join(__dirname, "..", "dist", "server.cjs");
if (!fs.existsSync(serverPath)) {
  throw new Error("server.cjs not found at " + serverPath + ". Run 'npm run build' first.");
}

const { default: app } = createRequire(import.meta.url)(serverPath);
export default app;
