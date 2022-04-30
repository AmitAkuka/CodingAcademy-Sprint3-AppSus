export function ReviewPreview({ review, onDeleteReview }) {
  const stars = [1, 2, 3, 4, 5]
  return (
    <article className="review">
      <div className="review-header">
        <div className="user-details">
          <img src="../assets/img/user-img.png" alt="" />
          <h2>{review.fullName}</h2>
        </div>
        <h3 className="read-at">Read at: {review.readAt}</h3>
      </div>
      <div className="review-content">
        <h3 className="review-desc">{review.review}</h3>
        <div className="rating">
          <h3>Rating:</h3>
          <div className="stars-container">
            {stars.map((star) => {
              if (star <= review.rating)
                return (
                  <img
                    key={star}
                    className="star-img"
                    src="../assets/img/star-full.png"
                  ></img>
                )
            })}
          </div>
        </div>
        <button
          className="btn delete-review"
          onClick={() => onDeleteReview(review.id)}
        >
          Delete
        </button>
        <span className="created-at">Posted on: {review.createdAt}</span>
      </div>
    </article>
  )
}
