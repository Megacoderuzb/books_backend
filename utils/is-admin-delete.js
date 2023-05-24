import express from "express";
import "dotenv/config";
import jwt from "jsonwebtoken";
import db from "../db/index.js";

export const isAdminDel = async (req, res, next) => {
  try {
    await db.read();
    const superAdmin = db.data.users.find((u) => u.role === "superAdmin");
    const token = req.headers.authorization;
    const result = jwt.verify(token, process.env.SECRET_KEY);
    if (result.role == "customer") {
      return res.status(403).json({
        message: "Forbidden",
      });
    }
    if (result.userId === req.params.id) {
      return res.send("You can not delete your own infos");
    }
    if (req.params.id === superAdmin.id) {
      return res.send("you can not delete super admin user");
    }
    next();
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized",
      error,
    });
  }
};
