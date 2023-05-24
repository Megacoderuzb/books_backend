import Joi from 'joi';
import express from 'express';

/**
 * @param {Joi.Schema} schema
 * @param {string} redirectPath
 */
export const genValidator = (schema) => {
  
  return (req, res, next) => {
    const result = schema.validate(req.body);

    if (result.error) {
      return res.status(400).json({message: "user is not find"})
    }

    next();
  };
};
