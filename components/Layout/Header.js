import styled from 'styled-components';
import Link from 'next/link';

const HeaderStyle = styled.header`
  a {
    font-size: 5rem;
    font-weight: 600;
  }
`;

const Header = () => (
  <HeaderStyle>
    <Link href="/">
      <a>Resto</a>
    </Link>
  </HeaderStyle>
);

export default Header;
