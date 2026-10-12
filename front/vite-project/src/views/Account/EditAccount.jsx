import axios from "axios";
import { useEffect, useRef, useState } from "react";
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
  max-width: 500px;
  margin: 10px auto;
  padding: 30px;
  background: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  color: #333;
  h1 { margin-top: 0; font-size: 26px; }
`;
const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 18px;
  label { font-weight: 500; }
`;
const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font: inherit;
  &:focus { outline: 2px solid #4a90e2; outline-offset: 2px; }
`;
const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: #4a90e2;
  color: white;
  border: none;
  border-radius: 8px;
  font: inherit;
  cursor: pointer;
  &:hover { background: #357ab8; }
  &:disabled { background: #aaa; cursor: not-allowed; }
`;
const ErrorMessage = styled.p`
  color: #b42332;
`;
const SuccessMessage = styled.p`
  color: #217a38;
`;

function errorText(err) {
  if (err.response?.status === 401) return "Tu sesión venció o no es válida. Volvé a iniciar sesión.";
  const body = err.response?.data;
  if (Array.isArray(body?.details)) return body.details.filter((item) => typeof item === "string").join(". ") || body.message;
  const detail = body?.error || body?.message;
  return typeof detail === "string" ? detail : "No se pudo completar la operación. Intentá nuevamente.";
}

function EditForm({ profile }) {
  const { token, updateUser } = useAuth();
  const [values, setValues] = useState({ name: profile.name, username: profile.username, birthdate: profile.birthdate });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const pending = useRef(null);

  useEffect(() => () => pending.current?.abort(), []);

  const handleChange = (event) => {
    setValues((previous) => ({ ...previous, [event.target.name]: event.target.value }));
    setError("");
    setSuccess(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (pending.current) return;
    const payload = { name: values.name.trim(), username: values.username.trim(), birthdate: values.birthdate };
    if (payload.name.length < 2 || payload.name.length > 50 || payload.username.length < 4 || payload.username.length > 50 || !/^\d{4}-\d{2}-\d{2}$/.test(payload.birthdate)) {
      setError("Revisá los campos: nombre de 2 a 50 caracteres, usuario de 4 a 50 y fecha en formato YYYY-MM-DD.");
      return;
    }
    const controller = new AbortController();
    pending.current = controller;
    setSaving(true);
    setError("");
    setSuccess(false);
    try {
      const { data } = await axios.put(`${API_URL}/users/edit`, payload, {
        headers: { Authorization: `Bearer ${token}` },
        signal: controller.signal,
      });
      if (controller.signal.aborted) return;
      const updated = data.data;
      updateUser(updated);
      setValues({ name: updated.name, username: updated.username, birthdate: updated.birthdate });
      setSuccess(true);
    } catch (err) {
      if (!controller.signal.aborted) setError(errorText(err));
    } finally {
      pending.current = null;
      if (!controller.signal.aborted) setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} aria-busy={saving}>
      <Field>
        <label htmlFor="edit-name">Nombre</label>
        <Input id="edit-name" name="name" value={values.name} onChange={handleChange} minLength={2} maxLength={50} required disabled={saving} autoComplete="name" />
      </Field>
      <Field>
        <label htmlFor="edit-username">Nombre de usuario</label>
        <Input id="edit-username" name="username" value={values.username} onChange={handleChange} minLength={4} maxLength={50} required disabled={saving} autoComplete="username" />
      </Field>
      <Field>
        <label htmlFor="edit-birthdate">Fecha de nacimiento</label>
        <Input id="edit-birthdate" name="birthdate" type="date" value={values.birthdate} onChange={handleChange} required disabled={saving} autoComplete="bday" />
      </Field>
      {error && <ErrorMessage role="alert">{error}</ErrorMessage>}
      {success && <SuccessMessage role="status">Tu información se actualizó correctamente.</SuccessMessage>}
      <Button type="submit" disabled={saving}>{saving ? "Guardando…" : "Guardar cambios"}</Button>
    </form>
  );
}

function EditContent() {
  const { token } = useAuth();
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState(null);
  useEffect(() => {
    const controller = new AbortController();
    axios.get(`${API_URL}/users/user`, {
      headers: { Authorization: `Bearer ${token}` }, signal: controller.signal,
    }).then(({ data }) => {
      if (!controller.signal.aborted) setResult({ token, attempt, profile: data.data, error: "" });
    }).catch((err) => {
      if (!controller.signal.aborted) setResult({ token, attempt, profile: null, error: errorText(err) });
    });
    return () => controller.abort();
  }, [token, attempt]);
  const loading = result?.token !== token || result?.attempt !== attempt;
  return <Page><Card aria-labelledby="edit-title">
    <h1 id="edit-title">Editar mi información</h1>
    {loading ? <p role="status">Cargando tu información…</p> : result.error ? <>
      <ErrorMessage role="alert">{result.error}</ErrorMessage>
      <Button type="button" onClick={() => setAttempt((value) => value + 1)}>Reintentar</Button>
    </> : <EditForm key={token} profile={result.profile} />}
    <p><Link to="/users/user">Volver a mi perfil</Link></p>
  </Card></Page>;
}

export default function EditAccount() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/users/login" replace />;
  return <EditContent />;
}
