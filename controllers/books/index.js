import db from "../../db/index.js";
import { randomUUID } from "crypto";

export const newBook = (req, res, next) => {
  try {
    let { title, authorId, category } = req.body;
    db.read();
    db.data.books.push({
      id: randomUUID(),
      title,
      authorId,
      category,
    });
    db.write();

    res.status(201).json({ message: "Book added successful" });
  } catch (error) {
    next(error);
  }
};

export const allBooks = async (req, res, next) => {
  try {
    await db.read();
    if (req.query.category) {
      return res.json(
        db.data.books.filter((books) => books.category == req.query.category)
      );
    }
    res.json(db.data.books);
  } catch (error) {
    next(error);
  }
};

export const singleBook = async (req, res, next) => {
  try {
    await db.read();
    let bookinfo = db.data.books.find((book) => book.id === req.params.id);
    let authorInfo = db.data.authors.find((a) => a.id === bookinfo.authorId);
    let book = [bookinfo, authorInfo];
    res.json(book);
  } catch (error) {
    next(error);
  }
};
export const removeBook = async (req, res, next) => {
  try {
    await db.read();
    db.data.books = db.data.books.filter((book) => book.id !== req.params.id);
    await db.write();
    res.status(200).json({ message: "Book deleted ❌" });
  } catch (error) {
    next(error);
  }
};
export const editBook = async (req, res, next) => {
  try {
    let { title, authorId, category } = req.body;

    await db.read();
    let book = db.data.books.find((book) => book.id === req.params.id);
    console.log(book);
    let bookIndex = db.data.books.indexOf(book);
    db.data.books.splice(bookIndex, 1, {
      id: book.id,
      title,
      authorId,
      category,
    });
    await db.write();

    res.status(200).json({ message: "Book edited successfully" });
  } catch (error) {
    next(error);
  }
};
