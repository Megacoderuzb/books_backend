import Joi from "joi";

export const addBookSchema = Joi.object({
  title: Joi.string().min(1).required(),
  authorId: Joi.string().min(1).required(),
  category: Joi.string().min(1).required(),
});
export const bookEditSchema = Joi.object({
    title: Joi.string().min(1),
    authorId: Joi.string().min(1),
    category: Joi.string().min(1).required(),
});
