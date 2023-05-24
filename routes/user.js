import { Router } from "express";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { genValidator } from "../utils/gen-validator.js";
import {
  userEditSchema,
  userLoginSchema,
  userRegisterSchema,
} from "../schemas/user.js";
import db from "../db/index.js";
import { isSuperAdmin } from "../utils/is-super-admin.js";
import { isAdmin } from "../utils/is-admin.js";
import { isAdminDel } from "../utils/is-admin-delete.js";
import { isLoggedIn } from "../utils/is-logged-in.js";
import {
  getUsers,
  getMyInfo,
  editMyAccount,
  deleteUser,
  registerUser,
  registerAdmin,
  loginUser,
} from "../controllers/users/index.js";

const Edit = genValidator(userEditSchema);
const Register = genValidator(userRegisterSchema);
const Login = genValidator(userLoginSchema);

const router = Router();

router.get("/users", isAdmin, getUsers);

router.get("/users/me", isLoggedIn, getMyInfo);

router.delete("/users/:id", isAdminDel, deleteUser);

router.patch("/users/me", isLoggedIn, Edit, editMyAccount);

router.post("/users/register", Register, registerUser);

router.post("/users", Register, isSuperAdmin, registerAdmin);

router.post("/users/login", Login, loginUser);

export default router;
