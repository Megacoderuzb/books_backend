import express from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

/**
 *
 * @param {express.Request} req
 * @param {*} res
 * @param {*} next
 */
export const isLoggedIn = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    const payload = jwt.verify(token, process.env.SECRET_KEY);

    req.user = { userId: payload.userId };
    // console.log("this is :", req.user,payload);
    next();
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized",
      error,
    });
  }
};
