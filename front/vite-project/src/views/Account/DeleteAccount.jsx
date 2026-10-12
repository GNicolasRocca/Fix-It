import axios from "axios";
import { useRef, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

const Page = styled.div`
  height: 100%;
  overflow-y: auto;
  padding: 30px 20px;
`;

const Card = styled.section`
  max-width: 450px;
  margin: 30px auto;
  padding: 30px;
  background: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  color: #333;
  h1 { font-size: 24px; text-align: center; }
  p { line-height: 1.6; }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  margin-top: 12px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 8px;
  font: inherit;
  cursor: pointer;
  &:hover { background: #c82333; }
  &:disabled { background: #aaa; cursor: not-allowed; }
`;

const CancelButton = styled(Button)`
  background: #4a90e2;
  &:hover { background: #357ab8; }
`;

const ErrorMessage = styled.p`
  color: #b42332;
`;

export const DeleteAccount = () => {
  const { isAuthenticated, token, logout } = useAuth();
  const navigate = useNavigate();
  const [confirming, setConfirming] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const requestPending = useRef(false);

  if (!isAuthenticated) {
    return <Navigate to="/users/login" replace />;
  }

  const handleDelete = async () => {
    if (!confirming || requestPending.current) return;
    requestPending.current = true;
    setIsSubmitting(true);
    setError("");

    try {
      await axios.put(`${API_URL}/users/delete`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      logout();
      navigate("/home", {
        replace: true,
        state: { accountDeleted: true },
      });
    } catch (err) {
      const detail = err.response?.data?.error || err.response?.data?.message;
      setError(typeof detail === "string" ? detail : "No se pudo eliminar la cuenta. Intentá nuevamente.");
    } finally {
      requestPending.current = false;
      setIsSubmitting(false);
    }
  };

  return (
    <Page>
      <Card aria-labelledby="delete-account-title" aria-busy={isSubmitting}>
        <h1 id="delete-account-title">Eliminar cuenta</h1>
        <p>Tu cuenta será eliminada y no podrás volver a iniciar sesión. Tus turnos activos serán cancelados.</p>
        {error && <ErrorMessage role="alert">{error}</ErrorMessage>}
        {confirming ? (
          <>
            <p role="alert">¿Confirmás que querés eliminar tu cuenta?</p>
            <Button type="button" onClick={handleDelete} disabled={isSubmitting}>
              {isSubmitting ? "Eliminando cuenta…" : "Sí, eliminar mi cuenta"}
            </Button>
            <CancelButton type="button" disabled={isSubmitting} onClick={() => {
              setConfirming(false);
              setError("");
            }}>Cancelar</CancelButton>
          </>
        ) : (
          <>
            <Button type="button" onClick={() => setConfirming(true)}>Eliminar mi cuenta</Button>
            <p><Link to="/home">Volver al inicio</Link></p>
          </>
        )}
      </Card>
    </Page>
  );
};
