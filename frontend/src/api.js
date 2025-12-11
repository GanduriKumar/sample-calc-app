const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

async function request(path, { method = "GET", body, sessionId } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (sessionId) headers["session-id"] = sessionId;
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const detail = await res.json().catch(() => ({}));
    const message = detail.detail || res.statusText;
    throw new Error(message);
  }
  return res.json();
}

export async function createSession() {
  return request("/session", { method: "POST" });
}

export async function getDisplay(sessionId) {
  return request("/display", { sessionId });
}

export async function pressDigit(sessionId, digit) {
  return request("/press-digit", { method: "POST", sessionId, body: { digit } });
}

export async function pressDecimal(sessionId) {
  return request("/press-decimal", { method: "POST", sessionId });
}

export async function pressOperator(sessionId, operator) {
  return request("/press-operator", { method: "POST", sessionId, body: { operator } });
}

export async function pressEquals(sessionId) {
  return request("/equals", { method: "POST", sessionId });
}

export async function takeSqrt(sessionId) {
  return request("/sqrt", { method: "POST", sessionId });
}

export async function clearEntry(sessionId) {
  return request("/clear", { method: "POST", sessionId });
}

export async function memoryClear(sessionId) {
  return request("/memory/clear", { method: "POST", sessionId });
}

export async function memoryRecall(sessionId) {
  return request("/memory/recall", { method: "POST", sessionId });
}

export async function memoryAdd(sessionId) {
  return request("/memory/add", { method: "POST", sessionId });
}

export async function memorySubtract(sessionId) {
  return request("/memory/subtract", { method: "POST", sessionId });
}
