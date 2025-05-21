import express from 'express';
import verify from '../middleware/auth.middleware.js';
import { deleteReview, submitReview, updateReview } from '../controller/review.controller.js';
import { validate } from '../middleware/schema.middleware.js';
import { reviewSchema, reviewUpdateSchema } from '../validator/review.validator.js';


const router = express.Router();

router.route('/books/:id/reviews').post(verify, validate(reviewSchema),submitReview);
router.route('/reviews/:id').put(verify, validate(reviewUpdateSchema),updateReview).delete(verify, deleteReview);

export default router;