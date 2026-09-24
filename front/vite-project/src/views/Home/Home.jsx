import { Link } from "react-router-dom";
import "./Home.css";
import fixItHome from "../../assets/home.png";

const Home = () => {
  return (
    <div className="homeContainer">
      <div className="imageContainer">
        <img src={fixItHome} alt="Fix It - Reparación de computadoras" className="homeImage" />
      </div>

       <Link to="/appointments/schedule" className="appointmentButton">Solicitar turno</Link>
    </div>
  );
};

export default Home;