import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
 const authHeader = req.headers['authorization']
 const token = authHeader && authHeader.split(' ')[1]
 if (token == null) return res.status(401).send() // if there isn't any token

 jwt.verify(token, process.env.SESSION_SECRET as string, (err: any, user: any) => {
   if (err) return res.status(403).send();
   req.user = user
   next() // pass the execution off to whatever request the client intended
 }) 
};