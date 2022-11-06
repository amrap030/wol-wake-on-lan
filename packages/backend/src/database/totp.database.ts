import { JsonDB, Config } from "node-json-db";
import { DB_DIR } from "@config";

export let db;

export const initDB = () =>
  (db = new JsonDB(
    new Config(
      DB_DIR.endsWith("/") ? DB_DIR.concat("totp") : DB_DIR.concat("/totp"),
      true,
      false,
      "/"
    )
  ));
