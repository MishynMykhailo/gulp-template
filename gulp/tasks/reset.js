import { deleteAsync } from "del";

import { path } from "../config/path.js";
export function reset() {
  return deleteAsync(path.clean);
}
