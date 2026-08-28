import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  background-color: #4a90e2;
  padding: 2px 20px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
`;

const NavList = styled.ul`
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 0;
`;

const NavItem = styled.li`
  margin-left: 20px;
  margin-right: 15px;
  background-color: #FFF5F5;
  padding: 20px;
`;

const NavLink = styled(Link)`
  color: black;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;

  &:hover {
    color: #ffd700;
  }
`;

const Nav_bar = () => {
  return (
    <Nav>
      <NavList>
        <NavItem>
          <NavLink to="/home">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/login">Login</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/register">Registrarse</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/appointment/schedule">Solicitar un turno</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/mis-turnos">Mis Turnos</NavLink>
        </NavItem>
      </NavList>
    </Nav>
  );
};

export default Nav_bar;