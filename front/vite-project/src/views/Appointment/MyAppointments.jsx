// Utilizar lazy loading para mis turnos en caso de que el usuario saque muchos turnos
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../context/AuthContext";

const Container = styled.div`
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const TurnCard = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 15px 20px;
  margin-bottom: 15px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TurnInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const TurnText = styled.p`
  margin: 3px 0;
  font-weight: 500;
  color: #555;
`;

const Status = styled.span`
  font-weight: bold;
  color: ${(props) => (props.$status === "active" ? "#28a745" : "#dc3545")};
`;

const CancelButton = styled.button`
  background-color: #dc3545;
  color: #fff;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #c82333;
  }

  &:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }
`;

const MyAppointments = () => {
  const [turnos, setTurnos] = useState([]);

    const { token } = useAuth();

  useEffect(() => {
    if (!token) {
      console.error("Usuario no autenticado");
      return;
    }

     axios
      .get(
        `${API_URL}/appointments/my-appointments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log("TURNOS DEL USUARIO:", res.data);
        setTurnos(res.data.data);
      })
      .catch((err) => {
        console.error(
          "Error al obtener turnos:",
          err.response?.data || err.message
        );
      });

  }, [token]);

  const cancelarTurno = async (turnoId) => {
    try {
      axios.put(`${API_URL}/appointments/cancel/${turnoId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );

      setTurnos(prev =>
        prev.map(t =>
          t.id === turnoId ? { ...t, status: "cancelled" } : t
        )
      );
    } catch (err) {
      console.error("Error al cancelar:", err);
    }
  };

  return (
    <Container>
      {turnos.length === 0 ? (
        <p>No tienes turnos</p>
      ) : (
        turnos.map(t => (
          <TurnCard key={t.id}>
            <TurnInfo>
              <TurnText>Fecha: {t.date}</TurnText>
              <TurnText>Hora: {t.time}</TurnText>
              <TurnText>
                Estado: <Status $status={t.status}>
                    {t.status === "cancelled" ? "Cancelado" : "Activo"}
                  </Status>
              </TurnText>
            </TurnInfo>

            {t.status === "active" && (
              <CancelButton onClick={() => cancelarTurno(t.id)}>
                Cancelar
              </CancelButton>
            )}
          </TurnCard>
        ))
      )}
    </Container>
  );
};

export default MyAppointments;