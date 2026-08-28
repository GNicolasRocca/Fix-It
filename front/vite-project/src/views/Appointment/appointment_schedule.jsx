import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import { validate_turnos } from "../../helpers/validate_appointments";

const PageWrapper = styled.div`
  display: flex;
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

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
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

export const CreateTurn = () => {
  const [data, setData] = useState({ date: "", time: "" });
  const [errors, setErrors] = useState({});

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

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Debes iniciar sesión primero");
      return;
    }

    const normalizeDate = (dateString) => {
      const [year, month, day] = dateString.split("-");
      return `${year}-${month}-${day}`;
    };

    const turnData = {
      userId: user.id,
      date: normalizeDate(data.date),
      time: data.time,
    };

    axios
      .post("http://localhost:3000/turns/schedule", turnData)
      .then(() => {
        alert("Turno creado exitosamente");
      })
      .catch((err) => {
        console.error("Error al crear el turno:", err);
        alert("Hubo un problema al crear el turno");
      });
  };

  return (
    <PageWrapper>
      <Form onSubmit={handle_submit}>
        <Title>Crear Turno</Title>

        <InputGroup>
          <Input type="date" name="date" onChange={handle_input} value={data.date} />
          {errors.date && <ErrorLabel>{errors.date}</ErrorLabel>}
        </InputGroup>

        <InputGroup>
          <Input type="time" name="time" onChange={handle_input} value={data.time} />
          {errors.time && <ErrorLabel>{errors.time}</ErrorLabel>}
        </InputGroup>

        <SubmitButton type="submit">Crear turno</SubmitButton>
      </Form>
    </PageWrapper>
  );
};
