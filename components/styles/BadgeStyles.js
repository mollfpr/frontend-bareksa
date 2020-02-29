import styled from 'styled-components';

const BadgeStyle = styled.div`
  border-radius: 15px;
  padding: 0 15px;
  margin: 4px;
  font-size: 1rem;
  font-weight: 600;
  background-color: ${props => props.theme.lightgrey};
  color: ${props => props.theme.grey};
  :first-child {
    margin-left: 0;
  }
  :last-child {
    margin-right: 0;
  }
`;

export default BadgeStyle;
