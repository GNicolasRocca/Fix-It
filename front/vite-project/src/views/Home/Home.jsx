import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import "./Home.css";
import fixItHome from "../../assets/home.png";

const SuccessMessage = styled.p`
  position: fixed;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  width: max-content;
  max-width: calc(100% - 32px);
  margin: 0;
  padding: 14px 20px;
  border: 1px solid #28a745;
  border-radius: 8px;
  background: #edf8ef;
  color: #155724;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1100;
`;

const Home = () => {
  const { state } = useLocation();
  return (
    <div className="homeContainer">
      {state?.accountDeleted === true && (
        <SuccessMessage role="status">Tu cuenta fue eliminada correctamente. Se cerró tu sesión.</SuccessMessage>
      )}
      <div className="imageContainer">
        <img src={fixItHome} alt="Fix It - Reparación de computadoras" className="homeImage" />
      </div>

       <Link to="/appointments/schedule" className="appointmentButton">Solicitar turno</Link>
    </div>
  );
};

export default Home;
