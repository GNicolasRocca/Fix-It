import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ActionLink, Badge, Details, ErrorMessage, Page, Panel, RetryButton, Table, TableWrapper } from "./AdminStyles";

const API_URL = import.meta.env.VITE_API_URL;

function errorText(err) {
  if (err.response?.status === 401) return "Tu sesión venció o no es válida. Volvé a iniciar sesión.";
  if (err.response?.status === 403) return "No tenés permisos para consultar esta información.";
  const detail = err.response?.data?.message || err.response?.data?.error;
  return typeof detail === "string" ? detail : "No se pudo obtener la información. Intentá nuevamente.";
}

function useAdminRequest(path, field) {
  const { token } = useAuth();
  const [result, setResult] = useState(null);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    axios.get(`${API_URL}${path}`, {
      headers: { Authorization: `Bearer ${token}` },
      signal: controller.signal,
    }).then(({ data }) => {
      if (!controller.signal.aborted) {
        setResult({ path, attempt, token, data: data[field], error: "" });
      }
    }).catch((err) => {
      if (!controller.signal.aborted) {
        setResult({ path, attempt, token, data: null, error: errorText(err) });
      }
    });
    return () => controller.abort();
  }, [path, field, token, attempt]);
  const current = result?.path === path && result?.attempt === attempt && result?.token === token;
  return {
    data: current ? result.data : null,
    error: current ? result.error : "",
    loading: !current,
    retry: () => setAttempt((value) => value + 1),
  };
}

function RequestState({ request }) {
  if (request.loading) return <p role="status">Cargando…</p>;
  if (request.error) return <>
    <ErrorMessage role="alert">{request.error}</ErrorMessage>
    <RetryButton type="button" onClick={request.retry}>Reintentar</RetryButton>
  </>;
  return null;
}

export function AdminUsers() {
  const request = useAdminRequest("/users/", "data");
  return (
    <Page><Panel aria-labelledby="admin-title">
      <h1 id="admin-title">Administración de usuarios</h1>
      <RequestState request={request} />
      {!request.loading && !request.error && (
        request.data?.length ? (
          <TableWrapper><Table>
            <caption>Usuarios registrados en Fix-It</caption>
            <thead><tr>
              <th scope="col">Nombre</th><th scope="col">Email</th>
              <th scope="col">Rol</th><th scope="col">Cuenta</th><th scope="col">Información</th>
            </tr></thead>
            <tbody>{request.data.map((user) => <tr key={user.id}>
              <td>{user.name}</td><td>{user.email}</td><td>{user.role}</td>
              <td><Badge $active={user.isActive}>{user.isActive ? "Activa" : "Desactivada"}</Badge></td>
              <td><ActionLink to={`/admin/users/${encodeURIComponent(user.id)}`} aria-label={`Ver detalle de ${user.name}`}>Ver detalle</ActionLink></td>
            </tr>)}</tbody>
          </Table></TableWrapper>
        ) : <p>No hay usuarios registrados.</p>
      )}
    </Panel></Page>
  );
}

export function AdminUserDetail() {
  const { id } = useParams();
  const userRequest = useAdminRequest(`/users/get-user/${encodeURIComponent(id)}`, "data");
  const appointmentsRequest = useAdminRequest(`/appointments/user/${encodeURIComponent(id)}`, "appointments");
  const user = userRequest.data;
  return (
    <Page><Panel aria-labelledby="user-title">
      <p><ActionLink to="/admin">Volver al listado</ActionLink></p>
      <h1 id="user-title">Información del usuario</h1>
      <RequestState request={userRequest} />
      {!userRequest.loading && !userRequest.error && user && <Details>
        <dt>Usuario</dt><dd>{user.username}</dd>
        <dt>ID</dt><dd>{user.userId}</dd>
        <dt>Email</dt><dd>{user.email}</dd>
        <dt>Nacimiento</dt><dd>{user.birthdate}</dd>
        <dt>DNI</dt><dd>{user.nDni}</dd>
        <dt>Rol</dt><dd>{user.role}</dd>
      </Details>}
      <h2>Turnos del usuario</h2>
      <RequestState request={appointmentsRequest} />
      {!appointmentsRequest.loading && !appointmentsRequest.error && (
        appointmentsRequest.data?.length ? <TableWrapper><Table>
          <caption>Turnos y estados</caption>
          <thead><tr><th scope="col">Fecha</th><th scope="col">Hora</th><th scope="col">Estado</th></tr></thead>
          <tbody>{appointmentsRequest.data.map((appointment) => <tr key={appointment.id}>
            <td>{appointment.date}</td><td>{appointment.time}</td>
            <td><Badge $active={appointment.status === "active"}>
              {appointment.status === "active" ? "Activo" : appointment.status === "cancelled" ? "Cancelado" : appointment.status}
            </Badge></td>
          </tr>)}</tbody>
        </Table></TableWrapper> : <p>Este usuario no tiene turnos.</p>
      )}
    </Panel></Page>
  );
}
