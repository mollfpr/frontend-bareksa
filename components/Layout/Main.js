import styled from 'styled-components';

const Main = styled.main`
  padding: 5rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 600px) {
    width: 100%;
    padding: 0 15px;
  }
`;

export default Main;
