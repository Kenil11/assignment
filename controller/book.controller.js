import asyncHandler from 'express-async-handler';
import Book from '../models/Book.model.js';

const addBook = asyncHandler(async (req, res) => {
  const { title, author, genre, publishedYear } = req.body;

  const book = await Book.create({
    title,
    author,
    genre,
    publishedYear,
    createdBy: req.user._id,
  });

  res.status(201).json(book);
});

// @desc    Get all books
// @route   GET /api/books
// @access  Public
const getBooks = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.page) || 1;

  const keyword = req.query.keyword
    ? {
        $or: [
          { title: { $regex: req.query.keyword, $options: 'i' } },
          { author: { $regex: req.query.keyword, $options: 'i' } },
        ],
      }
    : {};

  const authorFilter = req.query.author
    ? { author: { $regex: req.query.author, $options: 'i' } }
    : {};
  const genreFilter = req.query.genre
    ? { genre: { $regex: req.query.genre, $options: 'i' } }
    : {};

  const count = await Book.countDocuments({
    ...keyword,
    ...authorFilter,
    ...genreFilter,
  });

  const books = await Book.find({
    ...keyword,
    ...authorFilter,
    ...genreFilter,
  })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .populate('createdBy', 'name email');

  res.json({
    books,
    page,
    pages: Math.ceil(count / pageSize),
    count,
  });
});

// @desc    Get book by ID
// @route   GET /api/books/:id
// @access  Public
const getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id).populate(
    'createdBy',
    'name email'
  );

  if (book) {
    res.json(book);
  } else {
    res.status(404);
    throw new Error('Book not found');
  }
});

// @desc    Search books
// @route   GET /api/search
// @access  Public
const searchBooks = asyncHandler(async (req, res) => {
  const { query } = req.query;

  if (!query) {
    res.status(400);
    throw new Error('Please provide a search query');
  }

  const books = await Book.find({
    $or: [
      { title: { $regex: query, $options: 'i' } },
      { author: { $regex: query, $options: 'i' } },
    ],
  }).limit(10);

  res.json(books);
});

export { addBook, getBooks, getBookById, searchBooks };