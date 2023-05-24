import express from "express";
import "dotenv/config";
import jwt from "jsonwebtoken";

export const isAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    if (payload.role != "admin") {
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    next();
  } catch (error) {
    return res.send(error);
  }
};
