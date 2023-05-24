import express from "express";
import userRoutes from "./routes/user.js";
import bookRoutes from "./routes/books.js";
import authorRoutes from "./routes/authors.js";

const app = express();

app.use(express.json());
app.use(userRoutes);
app.use(bookRoutes);
app.use(authorRoutes);

const PORT = 7000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/`);
});
