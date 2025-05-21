import Joi from "joi";

export const bookSchema = Joi.object({
    title: Joi.string().min(2).max(100).required(),
    author: Joi.string().min(2).max(50).required(),
    genre: Joi.string().min(2).max(30).required(),
    publishedYear: Joi.number().integer().min(1000).max(new Date().getFullYear()),
});

export const bookQuerySchema = Joi.object({
    page: Joi.number().integer().min(1),
    keyword: Joi.string().min(1),
    author: Joi.string().min(1),
    genre: Joi.string().min(1),
});

export const searchSchema = Joi.object({
    query: Joi.string().min(1).required(),
});