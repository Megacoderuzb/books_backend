import { randomUUID } from "crypto";
import db from "../../db/index.js";

const addAuthor = (req, res, next) => {
  try {
    const { name } = req.body;
    db.read();
    db.data.authors.push({
      id: randomUUID(),
      name,
    });
    db.write();

    res.status(201).json({ message: "Authors added successful" });
  } catch (error) {
    next(error);
  }
};
const getAuthors = async (req, res, next) => {
  try {
    await db.read();

    res.json(db.data.authors);
  } catch (error) {
    next(error);
  }
};

const getAuthor = async (req, res, next) => {
  try {
    await db.read();
    const authorInfo = db.data.authors.find(
      (author) => author.id === req.params.id
    );
    await db.read();
    let books = db.data.books.filter((book) => book.authorId === authorInfo.id);
    console.log(authorInfo, books);
    let author = [authorInfo, books];
    res.json(author);
  } catch (error) {
    next(error);
  }
};
const delAuthor = async (req, res, next) => {
  try {
    await db.read();
    db.data.authors = db.data.authors.filter(
      (authors) => authors.id !== req.params.id
    );
    await db.write();
    res.status(200).json({ message: "authors deleted ❌" });
  } catch (error) {
    next(error);
  }
};
const editAuthorInfo = async (req, res, next) => {
  try {
    const { name } = req.body;

    await db.read();
    const authors = db.data.authors.find(
      (authors) => authors.id === req.params.id
    );
    console.log(authors);
    authors.name = name;
    await db.write();

    res.status(200).json({ message: "authors edited successfully" });
  } catch (error) {
    next(error);
  }
};

export { addAuthor, getAuthors, getAuthor, delAuthor, editAuthorInfo };
