import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validate_login } from "../../helpers/validate_login";
import { useAuth } from "../../context/AuthContext";


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
  display: flex;
  justify-content: center;
  color: #dc3545;
  font-size: 14px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px 0;
  margin-top: 5px;
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

  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");
  
  const { login } = useAuth();

  const navigate = useNavigate();

  const handle_input = (e) => {
    const updatedData = {
      ...data,
      [e.target.name]: e.target.value,
    };

     setLoginError("");

    setData(updatedData);
  };

  const handle_submit = (e) => {
    e.preventDefault();

    const validationErrors = validate_login(data);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    axios  
      .post(
        `${API_URL}/users/login`, 
        data, {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        login(res.data.user, res.data.token);

        navigate("/home");
      })
      .catch((err) => {
        console.error(err.response?.data);

        setLoginError(
          err.response?.data?.error ||
          err.response?.data?.message ||
          "No se pudo iniciar sesión"
        );
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

        {errors.username && (
          <ErrorLabel>
            {errors.username}
          </ErrorLabel>
        )}
      </InputGroup>

      <InputGroup>
        <Input
          type="password"
          name="password"
          value={data.password}
          onChange={handle_input}
          placeholder="Contraseña"
        />

        {errors.password && (
          <ErrorLabel>
            {errors.password}
          </ErrorLabel>
        )}
      </InputGroup>

      {loginError && (
        <ErrorLabel>
          {loginError}
        </ErrorLabel>
      )}

      <SubmitButton type="submit">
        Ingresar
      </SubmitButton>
    </Form>
  );
};