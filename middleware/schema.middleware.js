import { BadRequestError } from "../error/error.js";

export const validate = (schema, source = 'body') => (req, res, next) => {
    const { error } = schema.validate(req[source]);
    
    if (error) {
        throw new BadRequestError(error.details[0].message);
    }
    
    next();
};

export const validateParams = (schema) => validate(schema, 'params');
export const validateQuery = (schema) => validate(schema, 'query');