from __future__ import annotations

from typing import Dict
from uuid import uuid4

from fastapi import FastAPI, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from calculator import Calculator

app = FastAPI(title="Calculator API", version="1.0.0")

# Allow local dev frontend (Vite default) and other origins for development.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory session store. Not suitable for production clustering.
_sessions: Dict[str, Calculator] = {}


class SessionResponse(BaseModel):
    session_id: str


class DisplayResponse(BaseModel):
    display: str
    value: float
    memory: float


class DigitRequest(BaseModel):
    digit: int


class OperatorRequest(BaseModel):
    operator: str


class EmptyRequest(BaseModel):
    pass


def _require_session(session_id: str | None) -> Calculator:
    if not session_id:
        raise HTTPException(status_code=400, detail="Provide session-id header. Create one via POST /session")
    calc = _sessions.get(session_id)
    if not calc:
        raise HTTPException(status_code=404, detail="Session not found. Create one via POST /session")
    return calc


def _serialize(calc: Calculator) -> DisplayResponse:
    return DisplayResponse(display=calc.display, value=calc.display_value, memory=calc.memory)


@app.post("/session", response_model=SessionResponse, summary="Create a new calculator session")
def create_session() -> SessionResponse:
    session_id = str(uuid4())
    _sessions[session_id] = Calculator()
    return SessionResponse(session_id=session_id)


@app.get("/display", response_model=DisplayResponse)
def get_display(session_id: str | None = Header(None, alias="session-id")) -> DisplayResponse:
    calc = _require_session(session_id)
    return _serialize(calc)


@app.post("/press-digit", response_model=DisplayResponse)
def press_digit(payload: DigitRequest, session_id: str | None = Header(None, alias="session-id")) -> DisplayResponse:
    calc = _require_session(session_id)
    calc.press_digit(payload.digit)
    return _serialize(calc)


@app.post("/press-decimal", response_model=DisplayResponse)
def press_decimal(session_id: str | None = Header(None, alias="session-id")) -> DisplayResponse:
    calc = _require_session(session_id)
    calc.press_decimal()
    return _serialize(calc)


@app.post("/press-operator", response_model=DisplayResponse)
def press_operator(payload: OperatorRequest, session_id: str | None = Header(None, alias="session-id")) -> DisplayResponse:
    calc = _require_session(session_id)
    calc.press_operator(payload.operator)
    return _serialize(calc)


@app.post("/equals", response_model=DisplayResponse)
def press_equals(session_id: str | None = Header(None, alias="session-id")) -> DisplayResponse:
    calc = _require_session(session_id)
    calc.press_equals()
    return _serialize(calc)


@app.post("/sqrt", response_model=DisplayResponse)
def take_sqrt(session_id: str | None = Header(None, alias="session-id")) -> DisplayResponse:
    calc = _require_session(session_id)
    calc.sqrt()
    return _serialize(calc)


@app.post("/clear", response_model=DisplayResponse)
def clear(session_id: str | None = Header(None, alias="session-id")) -> DisplayResponse:
    calc = _require_session(session_id)
    calc.press_clear()
    return _serialize(calc)


@app.post("/memory/clear", response_model=DisplayResponse)
def memory_clear(session_id: str | None = Header(None, alias="session-id")) -> DisplayResponse:
    calc = _require_session(session_id)
    calc.memory_clear()
    return _serialize(calc)


@app.post("/memory/recall", response_model=DisplayResponse)
def memory_recall(session_id: str | None = Header(None, alias="session-id")) -> DisplayResponse:
    calc = _require_session(session_id)
    calc.memory_recall()
    return _serialize(calc)


@app.post("/memory/add", response_model=DisplayResponse)
def memory_add(session_id: str | None = Header(None, alias="session-id")) -> DisplayResponse:
    calc = _require_session(session_id)
    calc.memory_add()
    return _serialize(calc)


@app.post("/memory/subtract", response_model=DisplayResponse)
def memory_subtract(session_id: str | None = Header(None, alias="session-id")) -> DisplayResponse:
    calc = _require_session(session_id)
    calc.memory_subtract()
    return _serialize(calc)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.on_event("shutdown")
def shutdown_clear_sessions() -> None:
    _sessions.clear()
