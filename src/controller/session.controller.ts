import { Request, Response } from "express";
import config from "config"
import { sign } from "../utils/jwt.utils";
import { createAccessToken, createSession } from "../services/session.service";
import { validatePassword } from "../services/user.service";

export async function createUserSessionHandler(req: Request, res: Response) {
    const user = await validatePassword(req.body);
    if(!user) {
        return res.status(401).send("invalid name or password")
    }
    const session = await createSession(user._id, req.get("user-agent") || "");
    const accessToken = createAccessToken({
        user, 
        session
    })
    const refreshToken = sign(session, {
        expiresIn: config.get("refreshToken")
    })
    return res.send({
        accessToken, 
        refreshToken
    })
}