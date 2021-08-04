import { Express, Request, Response } from "express";
import { createUserSessionHandler } from "./controller/session.controller";
import { createUserHandler } from "./controller/user.controller";
import validateRequest from "./middleware/validateRequest";
import { createUserSchema, createSessionSchema } from "./schema/user.schema";

export default function (app: Express) {
    app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));
    app.post("/api/v1/user", validateRequest(createUserSchema), createUserHandler);
    app.post("/api/v1/session", validateRequest(createSessionSchema), createUserSessionHandler);
}