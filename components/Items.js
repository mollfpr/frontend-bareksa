import styled from 'styled-components';
import Item from './Item';

const Center = styled.div`
  text-align: center;
`;

const ItemsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`;

const Items = ({ restaurants }) => (
  <Center>
    <ItemsList>
      {restaurants &&
        restaurants.map(({ restaurant }) => (
          <Item key={restaurant.id} restaurant={restaurant}></Item>
        ))}
    </ItemsList>
  </Center>
);

export default Items;
