import { fileURLToPath } from "url";
import path from "path";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const file = path.join(__dirname, "db.json");

const adapter = new JSONFile(file);
const defaultData = { users: [] };
export default new Low(adapter, defaultData);
