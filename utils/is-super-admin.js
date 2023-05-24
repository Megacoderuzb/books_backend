import express from "express"
import "dotenv/config"
import jwt from 'jsonwebtoken';


/**
 * Used to check if user is authenticated
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

export const isSuperAdmin = (req, res, next) => {
    try {
        const token = req.headers.authorization
        const payload = jwt.verify(token, process.env.SECRET_KEY)
        console.log(payload);
        if(payload.role != "superAdmin"){
            return res.status(403).json({
                message: 'Forbidden',
              })
        }
        next()
    } catch (error) {
        res.status(401).json({
            message: 'Unauthorized',
            error,
          });
    }
}