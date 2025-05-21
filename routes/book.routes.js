import express from 'express';
import verify from '../middleware/auth.middleware.js';
import { addBook, getBookById, getBooks, searchBooks } from '../controller/book.controller.js';
import { validate } from '../middleware/schema.middleware.js';
import { bookQuerySchema, bookSchema, searchSchema } from '../validator/book.validator.js';


const router = express.Router();

router.route('/').post(verify, validate(bookSchema),addBook).get(validate(bookQuerySchema),getBooks);
router.route('/:id').get(getBookById);
router.route('/search').get(validate(searchSchema),searchBooks);

export default router;