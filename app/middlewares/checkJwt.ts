import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
 const authHeader = req.headers['authorization']
 
 const token = authHeader && authHeader.split(' ')[1]

 if (!token) return res.status(401).send('Acceso denegado. Debe proveer un token') // if there isn't any token
 jwt.verify(token, process.env.SESSION_SECRET as string, (err: any, user: any) => {
   if (err) return res.status(403).send('Acceso denegado. Su token no es valido');
   req.user = user
   next() // pass the execution off to whatever request the client intended
 }) 
};