import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
import { useState } from "react";
import styled from "styled-components";
import { validate_turnos } from "../../helpers/validate_appointments";
import { useAuth } from "../../context/AuthContext";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background-color: #f0f2f5;
`;

const Form = styled.form`
  width: 100%;
  max-width: 450px;
  padding: 30px;
  background: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const Input = styled.input`
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 5px rgba(74, 144, 226, 0.5);
  }
`;

const ErrorLabel = styled.label`
  color: #dc3545;
  font-size: 14px;
  margin-top: 5px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px 0;
  background-color: #4a90e2;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #357ab8;
  }
`;

const TimeAvailable = styled.h1`
  text-align: center;
  margin-bottom: 28px;
  font-weight: 500;
  color: #000000;
`;

export const ScheduleAppointment = () => {
  const [data, setData] = useState({ date: "", time: "" });

  const [errors, setErrors] = useState({});

  const { token } = useAuth();


  const handle_input = (e) => {
    const updatedData = { ...data, [e.target.name]: e.target.value };

    setData(updatedData);
    setErrors(validate_turnos(updatedData));
  };

  const handle_submit = (e) => {
    e.preventDefault();

    const validationErrors = validate_turnos(data);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;
 
    if (!token) {
      alert("Debes iniciar sesión primero");
      return;
    }

    const normalizeDate = (dateString) => {
      const [year, month, day] = dateString.split("-");
      return `${year}-${month}-${day}`;
    };

    const appointmentData = {
      date: normalizeDate(data.date),
      time: data.time,
    };

    axios
      .post(`${API_URL}/appointments/schedule`, 
        appointmentData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        }
      )
      .then((res) => {
        alert("Turno creado exitosamente", res.data);

        setData({
          date: "",
          time: "",
        });
      })
      .catch((err) => {
        console.error(
          "Error al crear turno:",
          err.response?.data || err.message
        );

        // esto despues cambiarlo
        alert(
          err.response?.data?.error ||
          err.response?.data?.message ||
          "Hubo un problema al crear el turno"
        );
      });
  };

  return (
    <PageWrapper>
      <TimeAvailable>
        Horarios de 8 a 18 hs<br/>
        Lunes a Viernes
      </TimeAvailable>
      <Form onSubmit={handle_submit}>
        <InputGroup>
          <Input type="date" name="date" onChange={handle_input} value={data.date} />
          {errors.date && <ErrorLabel>{errors.date}</ErrorLabel>}
        </InputGroup>

        <InputGroup>
          <Input type="time" name="time" onChange={handle_input} value={data.time} />
          {errors.time && <ErrorLabel>{errors.time}</ErrorLabel>}
        </InputGroup>

        <SubmitButton type="submit">Aceptar</SubmitButton>
      </Form>
    </PageWrapper>
  );
};
