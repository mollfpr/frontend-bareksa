import styled from 'styled-components';

const PaddingStyle = styled.div`
  padding: 20px;
  text-align: left;
  h3 {
    margin: 0;
    color: ${props => props.theme.grey};
  }
  p {
    padding: 0;
  }
`;

export default PaddingStyle;
