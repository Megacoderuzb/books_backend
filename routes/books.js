import { Router } from "express";
import { randomUUID } from "crypto";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { addBookSchema, bookEditSchema } from "../schemas/book.js";
import { genValidator } from "../utils/gen-validator.js";
import db from "../db/index.js";
import { isAdmin } from "../utils/is-admin.js";
import { isLoggedIn } from "../utils/is-logged-in.js";

import { newBook, allBooks, singleBook,removeBook,editBook } from "../controllers/books/index.js";

const addBook = genValidator(addBookSchema);
const Edit = genValidator(bookEditSchema);

const router = Router();

router.post("/books", isAdmin, addBook, newBook);

router.get("/books", isLoggedIn, allBooks);

router.get("/books/:id", isLoggedIn, singleBook);

router.delete("/books/:id", isAdmin, removeBook);

router.put("/books/:id", isLoggedIn, Edit, editBook);

export default router;
