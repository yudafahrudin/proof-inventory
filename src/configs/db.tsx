import { join } from "path";
import { cwd } from "process";

export const ASSET_PATH = join(cwd(), "src/db/", "");
export const PROOF_STOCK_DB = "proof-stock-db.json";
export const PROOF_STOCK_IN_DB = "proof-stock-in-db.json";
export const PROOF_ITEM_XLSX_FILE = "template-item.xlsx";
