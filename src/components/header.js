import React from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components';

const Nav = styled.div`
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.0975);
`;
const NavHeader = styled.div`
  max-width: 1010px;
  padding: 26px 20px;
  width: 100%;
  display: flex;
  align-items: center;
  margin: 0 auto;
`;
const NavLeft = styled.div`
  width: 33.333%;
  color: palevioletred;
  font-size: 1.5em;
  text-align: left;
`;

const NavRight = styled.div`
  width: 100%;
  text-align: right;
`;

const Header = () => {
    return <Nav>
        <NavHeader>
            <NavLeft>Scoutbase Test</NavLeft>
            <NavRight>
                <Link to="/" > Home </Link> &nbsp;| <Link to="/countries" > Countries </Link>
            </NavRight>
        </NavHeader>
    </Nav>;

};

export default Header;