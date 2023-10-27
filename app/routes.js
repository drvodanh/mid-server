import { Router } from "express";
import controllers from "./controllers";

let router = Router();

export default function routes() {
  router.get("/link/*", controllers.filePipe);
  router.get("*", controllers.domainPipe);
  return router;
}
