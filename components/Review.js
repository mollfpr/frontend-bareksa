import styled from 'styled-components';
import StarRatings from 'react-star-ratings';

const ReviewContainer = styled.div`
  padding: 15px;
  background-color: ${props => props.theme.offWhite};
  border-radius: 5px;
  margin: 8px 0;
  :first-child {
    margin-top: 0;
  }
  :last-child: {
    margin-bottom: 0;
  }
  p {
    margin: 0;
  }
`;

const UserReviewer = styled.div`
  display: flex;
  align-items: center;
  h4 {
    margin: 0;
  }
  span {
    font-size: 1.2rem;
    color: ${props => props.theme.black};
  }
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
  }
`;

const Review = ({ review }) => (
  <ReviewContainer>
    <UserReviewer>
      <img src={review.user.profile_image} alt={review.user.name} />
      <div>
        <h4>{review.user.name}</h4>
        <span>
          Foodie Level <b>{review.user.foodie_level}</b>
        </span>
      </div>
    </UserReviewer>
    <StarRatings
      rating={parseFloat(review.rating)}
      starRatedColor="gold"
      starDimension="15px"
      starSpacing="1px"
      name="rating"
    />
    <p>{review.review_text}</p>
  </ReviewContainer>
);

export default Review;
