import ItemInfo from './ItemInfo';
import ItemStyles from './styles/ItemStyles';

const Item = ({ restaurant }) => (
  <ItemStyles>
    {/* featured_image */}
    <img src={restaurant.featured_image} alt={restaurant.name} />

    <ItemInfo restaurant={restaurant}></ItemInfo>
  </ItemStyles>
);

export default Item;
