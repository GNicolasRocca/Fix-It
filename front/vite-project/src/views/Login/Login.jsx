import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import { validate_login } from "../../helpers/validate_login";

const Form = styled.form`
  max-width: 400px;
  margin: 60px auto;
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

export const Login = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "Debe colocar un nombre de usuario",
    password: "Debe colocar una contraseña",
  });

  const handle_input = (e) => {
    const updatedData = {
      ...data,
      [e.target.name]: e.target.value,
    };
    setData(updatedData);
    setErrors(validate_login(updatedData));
  };

  const handle_submit = (e) => {
    e.preventDefault();
    const validationErrors = validate_login(data);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    axios
      .post("http://localhost:3000/users/login", data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        alert("Inicio de sesión exitoso");
      })
      .catch((err) => {
        console.error(err.response?.data);
        alert("Error en el inicio de sesión");
      });
  };

  return (
    <Form onSubmit={handle_submit}>
      <Title>Inicio de sesión</Title>

      <InputGroup>
        <Input
          type="text"
          name="username"
          value={data.username}
          onChange={handle_input}
          placeholder="Nombre de usuario"
        />
        {errors.username && <ErrorLabel>{errors.username}</ErrorLabel>}
      </InputGroup>

      <InputGroup>
        <Input
          type="password"
          name="password"
          value={data.password}
          onChange={handle_input}
          placeholder="Contraseña"
        />
        {errors.password && <ErrorLabel>{errors.password}</ErrorLabel>}
      </InputGroup>

      <SubmitButton type="submit">Ingresar</SubmitButton>
    </Form>
  );
};
