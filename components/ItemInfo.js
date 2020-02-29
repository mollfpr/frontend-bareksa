import StarRatings from 'react-star-ratings';
import Link from 'next/link';
import { MapPin, Clock } from 'react-feather';
import styled from 'styled-components';
import PaddingStyle from './styles/PaddingStyles';
import TitleStyle from './styles/TitleStyles';
import RatingStyle from './styles/RatingStyles';
import CuisineStyle from './styles/CuisineStyles';
import BadgeStyle from './styles/BadgeStyles';

const FlexItemsCenter = styled.div`
  display: flex;
  flex-wrap: ${props => (props.wrap ? 'wrap' : 'unset')};
  align-items: center;
  svg {
    margin-right: 8px;
  }
  p {
    padding: 0;
    margin: 0;
    font-size: 1.2rem;
  }
`;

const ItemInfo = ({ restaurant }) => (
  <PaddingStyle>
    <TitleStyle>
      {/* name */}
      <Link href="/restaurant/[id]" as={`/restaurant/${restaurant.id}`}>
        <a>
          <h3>{restaurant.name}</h3>
        </a>
      </Link>
      <RatingStyle>
        {/* user_rating.aggregate_rating */}
        <StarRatings
          rating={parseFloat(restaurant.user_rating.aggregate_rating)}
          starRatedColor="gold"
          starDimension="15px"
          starSpacing="1px"
          name="rating"
        />
        ({restaurant.all_reviews_count} Reviews)
      </RatingStyle>
    </TitleStyle>

    {/* cuisines */}
    <CuisineStyle>{restaurant.cuisines}</CuisineStyle>
    <FlexItemsCenter>
      <MapPin size={16}></MapPin>
      <p>{restaurant.location.address}</p>
    </FlexItemsCenter>
    <FlexItemsCenter>
      <Clock size={16}></Clock>
      <p>{restaurant.timings}</p>
    </FlexItemsCenter>
    <FlexItemsCenter wrap>
      {restaurant.highlights.map(hightlight => (
        <BadgeStyle>{hightlight}</BadgeStyle>
      ))}
    </FlexItemsCenter>
  </PaddingStyle>
);

export default ItemInfo;
