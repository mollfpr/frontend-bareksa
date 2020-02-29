import Review from './Review';
import PaddingStyle from './styles/PaddingStyles';
import TitleStyle from './styles/TitleStyles';

const Reviews = ({ user_reviews }) => (
  <PaddingStyle>
    <TitleStyle>
      <h3>Reviews</h3>
    </TitleStyle>

    {user_reviews &&
      user_reviews.map(({ review }) => <Review review={review}></Review>)}
  </PaddingStyle>
);

export default Reviews;
