import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema(
  {
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent user from submitting more than one review per book
reviewSchema.index({ book: 1, user: 1 }, { unique: true });

// Static method to get average rating of a book
reviewSchema.statics.getAverageRating = async function (bookId) {
  const obj = await this.aggregate([
    {
      $match: { book: bookId },
    },
    {
      $group: {
        _id: '$book',
        averageRating: { $avg: '$rating' },
      },
    },
  ]);

  try {
    await this.model('Book').findByIdAndUpdate(bookId, {
      averageRating: obj[0] ? obj[0].averageRating : 0,
    });
  } catch (err) {
    console.error(err);
  }
};

// Call getAverageRating after save
reviewSchema.post('save', function () {
  this.constructor.getAverageRating(this.book);
});

// Call getAverageRating after remove
reviewSchema.post('remove', function () {
  this.constructor.getAverageRating(this.book);
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;