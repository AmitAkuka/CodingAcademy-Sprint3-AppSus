import { ReviewPreview } from './review-preview.jsx'

export function ReviewList({ reviews, onDeleteReview }) {
  return (
    <section className="review-list">
      {reviews.map((review) => (
        <ReviewPreview
          onDeleteReview={onDeleteReview}
          key={review.id}
          review={review}
        />
      ))}
    </section>
  )
}
