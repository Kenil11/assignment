import Joi from "joi";

export const reviewSchema = Joi.object({
    rating: Joi.number().integer().min(1).max(5).required(),
    comment: Joi.string().min(1).max(500),
});

export const reviewUpdateSchema = Joi.object({
    rating: Joi.number().integer().min(1).max(5),
    comment: Joi.string().min(1).max(500),
}).or('rating', 'comment');