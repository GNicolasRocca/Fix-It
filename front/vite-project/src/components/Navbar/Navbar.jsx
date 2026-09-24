import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import userIcon from "../../assets/user.png";
import { useAuth } from "../../context/AuthContext";

const Nav = styled.nav`
  background-color: #4a90e2;
  padding: 2px 20px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
`;

const NavList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  padding: 0;
`;

const NavItem = styled.li`
  margin-left: 20px;
  margin-right: 15px;
  padding: 20px;
  background-color: #FFF5F5;
  border-style: solid;
  border-color: #2E6FA0;
`;

const NavLinkStyled = styled(NavLink)`
  color: black;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;

  &:hover {
    color: #ffd700;
  }
  &.active {
    color: #ffd700;
    font-weight: 700;
  }
`;

const UserMenuContainer = styled.div`
  position: relative;
  margin-left: auto;
`;

const UserIcon = styled.img`
  display: flex;
  width: 42px;
  height: 42px;
  object-fit: contain;
  cursor: pointer;
  margin-right: 30px;
`;

const UserDropdown = styled.div`
  position: absolute;
  top: 48px;
  right: 0;

  width: 220px;
  padding: 18px;

  background-color: white;
  border-radius: 12px;

  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.18);

  z-index: 1000;

  &::before {
    content: "";
    position: absolute;

    top: -10px;
    right: 10px;

    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid white;
  }
`;

const MenuTitle = styled.p`
  margin: 0 0 12px;
  font-weight: 600;
  color: #222;
`;

const MenuText = styled.p`
  margin: 0 0 12px;
  color: #666;
  font-size: 14px;
`;

const MenuLink = styled(NavLink)`
  display: block;
  text-decoration: none;
  text-align: center;

  padding: 10px;
  margin-top: 8px;

  border-radius: 8px;

  background-color: #4a90e2;
  color: white;

  font-weight: 500;

  &:hover {
    background-color: #357ab8;
  }
`;

const RegisterLink = styled(MenuLink)`
  background-color: white;
  color: #4a90e2;
  border: 1px solid #4a90e2;

  &:hover {
    background-color: #eef5ff;
  }
`;

const LogoutButton = styled.button`
  width: 100%;

  margin-top: 10px;
  padding: 10px;

  border: none;
  border-radius: 8px;

  background-color: #dc3545;
  color: white;

  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #c82333;
  }
`;

const Nav_bar = () => {
  const [openUserMenu, setOpenUserMenu] = useState(false);

  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const toggleUserMenu = () => {
    setOpenUserMenu(!openUserMenu);
  };

  const closeUserMenu = () => {
    setOpenUserMenu(false);
  };

  const handleLogout = () => {
    logout();
    setOpenUserMenu(false);
    navigate("/home");
  };

  return (
    <Nav>
      <NavList>
        <NavItem>
          <NavLinkStyled to="/home">Inicio</NavLinkStyled>
        </NavItem>
        <NavItem>
          <NavLinkStyled to="/appointments/schedule">Solicitar un turno</NavLinkStyled>
        </NavItem>
        <NavItem>
          <NavLinkStyled to="/my-appointments">Mis turnos</NavLinkStyled>
        </NavItem>
        <NavItem>
          <NavLinkStyled to="/about-us">Sobre nosotros</NavLinkStyled>
        </NavItem>

        <UserMenuContainer>
          <UserIcon src={userIcon} alt="Icono de usuario interactivo" onClick={toggleUserMenu} />

          {openUserMenu && (
              <UserDropdown>

                {user ? (
                  <>
                    <MenuTitle>Hola, {user.name || user.username}</MenuTitle>

                    <MenuText>Sesión iniciada</MenuText>
                    <LogoutButton onClick={handleLogout}>Cerrar sesión</LogoutButton>
                  </>
                ) : (
                  <>
                    <MenuTitle>Bienvenido</MenuTitle>
                    <MenuText>Iniciá sesión o registrate para continuar.</MenuText>
                    <MenuLink to="/login" onClick={closeUserMenu}>Iniciar sesión</MenuLink>
                  <RegisterLink to="/register" onClick={closeUserMenu}>Registrarse</RegisterLink>
                </>
              )}

            </UserDropdown>
          )}
        </UserMenuContainer>
      </NavList>
    </Nav>
  );
};

export default Nav_bar;