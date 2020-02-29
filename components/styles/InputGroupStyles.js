import styled from 'styled-components';

const InputGroupStyle = styled.div`
  position: relative;
  margin-bottom: 23px;
  -webkit-box-shadow: 0px 8px 20px 0px rgba(0, 0, 0, 0.15);
  -moz-box-shadow: 0px 8px 20px 0px rgba(0, 0, 0, 0.15);
  box-shadow: 0px 8px 20px 0px rgba(0, 0, 0, 0.15);
  padding: 16px 20px;
  padding-bottom: 10px;
  background: #fff;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  margin-right: 10px;
  width: ${props => props.width || '190px'};
  :last-child {
    margin-right: 0;
  }
  label {
    font-size: 12px;
    color: #999;
    text-transform: uppercase;
    display: block;
    font-weight: 700;
  }
  input {
    font-size: 18px;
    padding: 9px 0;
    color: #666;
    outline: none;
    margin: 0;
    border: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    width: 100%;
  }
  @media screen and (max-width: 600px) {
    width: ${props => props.mobileWidth || '50%'};
    margin-right: 0;
  }
`;

export default InputGroupStyle;
