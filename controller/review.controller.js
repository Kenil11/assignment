import asyncHandler from 'express-async-handler';
import Book from '../models/Book.model.js';
import Review from '../models/review.model.js';

// @desc    Submit a review
// @route   POST /api/books/:id/reviews
// @access  Private
const submitReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const bookId = req.params.id;

  const book = await Book.findById(bookId);

  if (!book) {
    res.status(404);
    throw new Error('Book not found');
  }

  // Check if user already submitted a review for this book
  const alreadyReviewed = await Review.findOne({
    book: bookId,
    user: req.user._id,
  });

  if (alreadyReviewed) {
    res.status(400);
    throw new Error('You have already reviewed this book');
  }

  const review = await Review.create({
    rating,
    comment,
    book: bookId,
    user: req.user._id,
  });

  res.status(201).json(review);
});

// @desc    Update review
// @route   PUT /api/reviews/:id
// @access  Private
const updateReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const reviewId = req.params.id;

  const review = await Review.findById(reviewId);

  if (!review) {
    res.status(404);
    throw new Error('Review not found');
  }

  // Check if the review belongs to the user
  if (review.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to update this review');
  }

  review.rating = rating || review.rating;
  review.comment = comment || review.comment;

  const updatedReview = await review.save();

  res.json(updatedReview);
});

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private
const deleteReview = asyncHandler(async (req, res) => {
  const reviewId = req.params.id;

  const review = await Review.findById(reviewId);

  if (!review) {
    res.status(404);
    throw new Error('Review not found');
  }

  // Check if the review belongs to the user
  if (review.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to delete this review');
  }

  await review.deleteOne();

  res.json({ message: 'Review removed' });
});

export { submitReview, updateReview, deleteReview };