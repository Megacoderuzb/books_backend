import { Router } from "express";
import "dotenv/config";
import { randomUUID } from "crypto";
import db from "../db/index.js";
import { addAuthorsSchema, authorsEditSchema } from "../schemas/authors.js";
import { genValidator } from "../utils/gen-validator.js";
import { isAdmin } from "../utils/is-admin.js";
import { isLoggedIn } from "../utils/is-logged-in.js";

import {
  addAuthor,
  getAuthor,
  getAuthors,
  delAuthor,
  editAuthorInfo,
} from "../controllers/authors/index.js";

const vAddAuthors = genValidator(addAuthorsSchema);
const Edit = genValidator(authorsEditSchema);

const router = Router();

router.post("/authors", isAdmin, vAddAuthors, addAuthor);

router.get("/authors", isLoggedIn, getAuthors);

router.get("/authors/:id", isLoggedIn, getAuthor);

router.delete("/authors/:id", isAdmin, delAuthor);

router.put("/authors/:id", isLoggedIn, Edit, editAuthorInfo);

export default router;
