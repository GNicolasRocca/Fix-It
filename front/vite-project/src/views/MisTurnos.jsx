// Utilizar lazy loading para mis turnos en caso de que el usuario saque muchos turnos


import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
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

const MisTurnos = () => {
  const [turnos, setTurnos] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.id) {
      console.error("Usuario no disponible");
      return;
    }

    axios
      .get(`http://localhost:3000/turns/user/${user.id}`)
      .then(res => {
        console.log("TURNOS DEL USUARIO:", res.data);
        setTurnos(res.data.data);
      })
      .catch(err => console.log(err));
  }, []);

  const cancelarTurno = async (turnoId) => {
    try {
      const res = await axios.put(`http://localhost:3000/turns/cancel/${turnoId}`);
      console.log("Cancelado:", res.data);

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
      <Title>Mis turnos</Title>

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
                    {t.status}
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

export default MisTurnos;