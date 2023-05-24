import Joi from "joi";

export const addAuthorsSchema = Joi.object({
  name: Joi.string().min(1).required(),
});
export const authorsEditSchema = Joi.object({
  name: Joi.string().min(1),
});
