const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");

function load(relative, mocks) {
  const filename = path.resolve(__dirname, "../src", relative);
  const output = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const exports = {};
  vm.runInNewContext(output, { exports, require: (id) => {
    if (id in mocks) return mocks[id];
    return require(require.resolve(id, { paths: [path.dirname(filename)] }));
  } }, { filename });
  return exports;
}

class BadRequestException extends Error { statusCode = 400; }
class NotFoundException extends Error { statusCode = 404; }
class ConflictException extends Error { statusCode = 409; }
const exceptions = {
  "../exceptions/BadRequestException": { BadRequestException },
  "../exceptions/NotFoundException": { NotFoundException },
  "../exceptions/ConflictException": { ConflictException },
};
function controllers(service) {
  return load("controllers/appointments.controller.ts", {
    ...exceptions, "../handlers/appointments.service": service,
    "../interfaces/IRole": { Role: { admin: "admin", user: "user" } },
  });
}
function response() {
  return { status(code) { this.code = code; return this; }, json(body) { this.body = body; return this; } };
}

const appointment = {
  id: "appointment-1", date: "2026-10-20", time: "09:00", status: "active",
  user: { id: "user-1", name: "Ana", email: "ana@example.com", nDni: 1234,
    birthdate: "1990-01-01", role: "user", credentials: { password: "secret" } },
};

test("ordinary users see occupied slots without personal information", async () => {
  const api = controllers({ get_appointments_service: async () => [appointment] });
  const res = response();
  await api.appointments_get_controller({ userRole: "user" }, res);
  assert.equal(res.code, 200);
  assert.deepEqual(Object.keys(res.body.data[0]).sort(), ["date", "id", "status", "time"]);
});

test("admins see the owner but never credentials", async () => {
  const api = controllers({ get_appointments_service: async () => [appointment] });
  const res = response();
  await api.appointments_get_controller({ userRole: "admin" }, res);
  assert.equal(res.body.data[0].user.id, "user-1");
  assert.equal(res.body.data[0].user.email, "ana@example.com");
  assert.equal(res.body.data[0].user.credentials, undefined);
});

test("admin cancellation uses both distinct route parameters", async () => {
  let received;
  const api = controllers({ appointment_cancelled_service: async (...args) => { received = args; return appointment; } });
  const res = response();
  await api.appointment_admin_cancel_controller({ params: { userId: "user-1", appointmentId: "appointment-1" } }, res);
  assert.deepEqual(received, ["appointment-1", "user-1"]);
  assert.equal(res.code, 200);
});

test("unexpected cancellation failures return a response", async () => {
  const api = controllers({ appointment_cancelled_service: async () => { throw new Error("database unavailable"); } });
  const res = response();
  await api.appointment_admin_cancel_controller({ params: { userId: "user-1", appointmentId: "appointment-1" } }, res);
  assert.equal(res.code, 500);
});

test("cancellation rejects a slot that does not belong to the supplied user", async () => {
  let saved = false;
  const api = load("handlers/appointments.service.ts", {
    ...exceptions, "./users.service": {},
    "../entities/appointments.entity": {},
    "../interfaces/IAppointment": { Status: { active: "active", cancelled: "cancelled" } },
    "../repositories/appointments.repository": { AppointmentsRepository: {
      find_appointment_by_id_and_user_repository: async (id, userId) => {
        assert.equal(id, "appointment-1"); assert.equal(userId, "other-user"); return null;
      },
      cancel_appointment_repository: async () => { saved = true; },
    } },
  });
  await assert.rejects(api.appointment_cancelled_service("appointment-1", "other-user"), NotFoundException);
  assert.equal(saved, false);
});

test("appointment listing failures are handled", async () => {
  const api = controllers({ get_appointments_service: async () => { throw new Error("database unavailable"); } });
  const res = response();
  await api.appointments_get_controller({ userRole: "user" }, res);
  assert.equal(res.code, 500);
});
