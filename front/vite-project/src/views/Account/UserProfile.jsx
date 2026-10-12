import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

const Page = styled.div`
  height: 100%;
  overflow-y: auto;
  padding: 30px 20px;
`;
const Card = styled.section`
  max-width: 600px;
  margin: 10px auto;
  padding: 30px;
  background: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  color: #333;
  h1 { margin-top: 0; font-size: 26px; }
`;
const Details = styled.dl`
  display: grid;
  grid-template-columns: minmax(100px, 160px) minmax(0, 1fr);
  gap: 14px;
  dt { font-weight: 600; }
  dd { margin: 0; overflow-wrap: anywhere; }
  @media (max-width: 480px) { grid-template-columns: 1fr; gap: 8px; }
`;
const ErrorMessage = styled.p`
  color: #b42332;
`;
const RetryButton = styled.button`
  padding: 10px 14px;
  background: #4a90e2;
  color: white;
  border: none;
  border-radius: 8px;
  font: inherit;
  cursor: pointer;
  &:hover { background: #357ab8; }
`;
const AppointmentsLink = styled(Link)`
  display: inline-block;
  margin-top: 16px;
  color: #2e6fa0;
`;

function ProfileContent() {
  const { token } = useAuth();
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    axios.get(`${API_URL}/users/user`, {
      headers: { Authorization: `Bearer ${token}` },
      signal: controller.signal,
    }).then(({ data }) => {
      if (!controller.signal.aborted) {
        setResult({ token, attempt, user: data.data, error: "" });
      }
    }).catch((err) => {
      if (controller.signal.aborted) return;
      const detail = err.response?.data?.error || err.response?.data?.message;
      const error = err.response?.status === 401
        ? "Tu sesión venció o no es válida. Volvé a iniciar sesión."
        : typeof detail === "string" ? detail : "No se pudo obtener tu información. Intentá nuevamente.";
      setResult({ token, attempt, user: null, error });
    });
    return () => controller.abort();
  }, [token, attempt]);

  const loading = result?.token !== token || result?.attempt !== attempt;
  const user = loading ? null : result.user;
  const error = loading ? "" : result.error;

  return (
    <Page>
      <Card aria-labelledby="profile-title" aria-busy={loading}>
        <h1 id="profile-title">Mi perfil</h1>
        {loading && <p role="status">Cargando tu información…</p>}
        {error && <>
          <ErrorMessage role="alert">{error}</ErrorMessage>
          <RetryButton type="button" onClick={() => setAttempt((value) => value + 1)}>Reintentar</RetryButton>
          <p><Link to="/users/login">Ir a iniciar sesión</Link></p>
        </>}
        {user && <>
          <Details>
            <dt>Nombre</dt><dd>{user.name}</dd>
            <dt>Usuario</dt><dd>{user.username}</dd>
            <dt>Email</dt><dd>{user.email}</dd>
            <dt>Fecha de nacimiento</dt><dd>{user.birthdate}</dd>
            <dt>DNI</dt><dd>{user.nDni}</dd>
            <dt>Rol</dt><dd>{user.role}</dd>
          </Details>
          <p><AppointmentsLink to="/users/edit">Editar mi información</AppointmentsLink></p>
          <AppointmentsLink to="/appointments/my-appointments">Consultar mis turnos</AppointmentsLink>
        </>}
      </Card>
    </Page>
  );
}

export default function UserProfile() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/users/login" replace />;
  return <ProfileContent />;
}
