import db from "../../db/index.js";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";
import jwt from "jsonwebtoken"

const getUsers = async (req, res, next) => {
  try {
    await db.read();
    if (req.query.role == "superAdmin") {
      return res.json(db.data.users.filter((user) => user.role === "admin"));
    }
    if (req.query.role == "customer") {
      return res.json(db.data.users.filter((user) => user.role === "customer"));
    }
    res.json(db.data.users);
  } catch (error) {
    next(error);
  }
};
const getMyInfo = async (req, res, next) => {
  try {
    await db.read();
    const user = db.data.users.find((u) => u.id === req.user.userId);
    res.json(user);
  } catch (error) {
    next(error);
  }
};
const deleteUser = async (req, res, next) => {
  try {
    await db.read();
    db.data.users = db.data.users.filter((user) => user.id !== req.params.id);
    await db.write();
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    next(error);
  }
};
const editMyAccount = async (req, res, next) => {
  try {
    await db.read();
    const { firstName, lastName, email, password } = req.body;
    const user = db.data.users.find((u) => u.id === req.user.userId);
    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userIndex = db.data.users.indexOf(user);
    db.data.users.splice(userIndex, 1, {
      id: user.id,
      firstName: firstName || user.firstName,
      lastName: lastName || user.lastName,
      email: email || user.email,
      password: hashedPassword || user.password,
    });
    await db.write();
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    next(error);
  }
};
const registerUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(password, salt);

    await db.read();
    const existingUser = db.data.users.find((user) => user.email === email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    db.data.users.push({
      id: randomUUID(),
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: "customer",
    });
    await db.write();

    res.status(201).json({ message: "Registred successful" });
  } catch (error) {
    next(error);
  }
};

const registerAdmin = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(password, salt);

    await db.read();
    const existingUser = db.data.users.find((user) => user.email === email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    db.data.users.push({
      id: randomUUID(),
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: "admin",
    });
    await db.write();

    res.status(201).json({ message: "Registred successful" });
  } catch (error) {
    next(error);
  }
};
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    await db.read();
    const user = db.data.users.find((u) => u.email === email);

    if (!user) {
      return res.status(400).json({ message: "Wrong email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Wrong email or password" });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
export {
  getUsers,
  getMyInfo,
  editMyAccount,
  deleteUser,
  loginUser,
  registerAdmin,
  registerUser,
};
