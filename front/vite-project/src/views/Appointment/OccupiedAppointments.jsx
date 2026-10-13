import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AdminCancelAppointment from "../../components/Appointment/AdminCancelAppointment";
import { Page, Panel, TableWrapper, Table, Details, ErrorMessage, RetryButton, ActionLink, SuccessMessage } from "../Admin/AdminStyles";

export default function OccupiedAppointments() {
  const { token, user } = useAuth();
  const [result, setResult] = useState(null);
  const [attempt, setAttempt] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const [success, setSuccess] = useState("");
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    if (!token) return;
    const controller = new AbortController();
    axios.get(`${import.meta.env.VITE_API_URL}/appointments/`, {
      headers: { Authorization: `Bearer ${token}` }, signal: controller.signal,
    }).then(({ data }) => {
      if (!controller.signal.aborted) setResult({ token, attempt, data: data.data, error: "" });
    }).catch((err) => {
      if (!controller.signal.aborted) setResult({ token, attempt, data: [], error: err.response?.data?.message || "No se pudieron obtener los turnos." });
    });
    return () => controller.abort();
  }, [token, attempt]);

  if (!token) return <Navigate to="/users/login" replace />;
  const current = result?.token === token && result?.attempt === attempt;
  const appointments = current ? result.data.filter((appointment) => appointment.status === "active") : [];
  const selected = appointments.find((appointment) => appointment.id === selectedId);
  return <Page><Panel>
    <h1>Turnos ocupados</h1>
    {success && <SuccessMessage role="status">{success}</SuccessMessage>}
    <p>Consultá las fechas y los horarios reservados.{isAdmin && " Seleccioná un turno para ver los datos del usuario y administrarlo."}</p>
    {!current && <p role="status">Cargando turnos…</p>}
    {current && result.error && <>
      <ErrorMessage role="alert">{result.error}</ErrorMessage>
      <RetryButton type="button" onClick={() => setAttempt((value) => value + 1)}>Reintentar</RetryButton>
    </>}
    {isAdmin && selected?.user && <section aria-labelledby="appointment-user-title">
      <h2 id="appointment-user-title">Usuario del turno seleccionado</h2>
      <Details>
        <dt>Nombre</dt><dd>{selected.user.name}</dd>
        <dt>Email</dt><dd>{selected.user.email}</dd>
        <dt>DNI</dt><dd>{selected.user.nDni}</dd>
        <dt>Fecha de nacimiento</dt><dd>{selected.user.birthdate}</dd>
        <dt>Turno</dt><dd>{selected.date} a las {selected.time}</dd>
      </Details>
      <p><ActionLink to={`/admin/users/${encodeURIComponent(selected.user.id)}`}>Ver todos los turnos del usuario</ActionLink></p>
      <AdminCancelAppointment key={selected.id} appointment={selected} userId={selected.user.id} userName={selected.user.name} onCancelled={() => {
        setSuccess("Turno cancelado correctamente.");
        setSelectedId(null);
        setAttempt((value) => value + 1);
      }} />
      <p><RetryButton type="button" onClick={() => setSelectedId(null)}>Cerrar detalle</RetryButton></p>
    </section>}
    {current && !result.error && (appointments.length ? <TableWrapper><Table>
      <thead><tr><th scope="col">Fecha</th><th scope="col">Hora</th><th scope="col">Estado</th>{isAdmin && <th scope="col">Usuario</th>}</tr></thead>
      <tbody>{appointments.map((appointment) => <tr key={appointment.id}>
        <td>{isAdmin ? <RetryButton type="button" aria-expanded={selectedId === appointment.id} aria-label={`Ver turno del ${appointment.date} a las ${appointment.time}`} onClick={() => setSelectedId(appointment.id)}>{appointment.date}</RetryButton> : appointment.date}</td>
        <td>{appointment.time}</td><td>Ocupado</td>
        {isAdmin && <td>{appointment.user?.name || "Sin información"}</td>}
      </tr>)}</tbody>
    </Table></TableWrapper> : <p>No hay turnos ocupados.</p>)}
  </Panel></Page>;
}
