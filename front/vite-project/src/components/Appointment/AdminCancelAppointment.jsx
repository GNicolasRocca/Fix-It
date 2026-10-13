import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Confirmation, DangerButton, ErrorMessage, RetryButton, SuccessMessage } from "../../views/Admin/AdminStyles";

export default function AdminCancelAppointment({ appointment, userId, userName, onCancelled }) {
  const { token } = useAuth();
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const pending = useRef(null);
  const backButton = useRef(null);

  useEffect(() => () => pending.current?.abort(), []);
  useEffect(() => {
    if (confirming) backButton.current?.focus();
  }, [confirming]);

  const cancel = async () => {
    if (pending.current) return;
    const controller = new AbortController();
    pending.current = controller;
    setBusy(true);
    setError("");
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/appointments/user-cancel/${encodeURIComponent(userId)}/${encodeURIComponent(appointment.id)}`, {}, {
        headers: { Authorization: `Bearer ${token}` }, signal: controller.signal,
      });
      if (controller.signal.aborted) return;
      setConfirming(false);
      setSuccess(true);
      onCancelled();
    } catch (err) {
      if (controller.signal.aborted) return;
      setError(err.response?.data?.message || "No se pudo cancelar el turno. Intentá nuevamente.");
    } finally {
      pending.current = null;
      if (!controller.signal.aborted) setBusy(false);
    }
  };

  if (success) return <SuccessMessage role="status">Turno cancelado correctamente.</SuccessMessage>;
  if (appointment.status !== "active") return null;
  return confirming ? <Confirmation aria-label="Confirmar cancelación del turno" aria-busy={busy}>
    <h3>Confirmar cancelación</h3>
    <p>¿Querés cancelar el turno de <strong>{userName || "este usuario"}</strong> del {appointment.date} a las {appointment.time}?</p>
    {error && <ErrorMessage role="alert">{error}</ErrorMessage>}
    <DangerButton type="button" disabled={busy} onClick={cancel}>{busy ? "Cancelando…" : "Sí, cancelar turno"}</DangerButton>
    <RetryButton ref={backButton} type="button" disabled={busy} onClick={() => { setConfirming(false); setError(""); }}>Volver</RetryButton>
  </Confirmation> : <DangerButton type="button" onClick={() => setConfirming(true)}>Cancelar turno</DangerButton>;
}
