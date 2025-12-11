import pytest
from fastapi.testclient import TestClient

from api import app, _sessions

client = TestClient(app)


@pytest.fixture(autouse=True)
def clear_sessions():
    _sessions.clear()
    yield
    _sessions.clear()


def new_session_headers():
    resp = client.post("/session")
    assert resp.status_code == 200
    session_id = resp.json()["session_id"]
    return {"session-id": session_id}


def test_addition_flow():
    headers = new_session_headers()
    assert client.get("/display", headers=headers).json()["value"] == 0

    client.post("/press-digit", json={"digit": 2}, headers=headers)
    client.post("/press-operator", json={"operator": "+"}, headers=headers)
    client.post("/press-digit", json={"digit": 3}, headers=headers)
    res = client.post("/equals", headers=headers)
    assert res.status_code == 200
    body = res.json()
    assert body["value"] == 5
    assert body["display"] == "5"


def test_memory_and_sqrt():
    headers = new_session_headers()
    client.post("/press-digit", json={"digit": 9}, headers=headers)
    client.post("/memory/add", headers=headers)
    client.post("/clear", headers=headers)
    client.post("/press-digit", json={"digit": 1}, headers=headers)
    client.post("/press-digit", json={"digit": 6}, headers=headers)
    client.post("/press-operator", json={"operator": "/"}, headers=headers)
    client.post("/press-digit", json={"digit": 4}, headers=headers)
    client.post("/equals", headers=headers)
    sqrt_res = client.post("/sqrt", headers=headers)
    assert pytest.approx(sqrt_res.json()["value"], 1e-6) == 2
    mem_res = client.post("/memory/recall", headers=headers)
    assert mem_res.json()["memory"] == 9


def test_requires_session_header():
    res = client.post("/press-digit", json={"digit": 1})
    assert res.status_code == 400


def test_missing_session_returns_404():
    res = client.post("/press-digit", json={"digit": 1}, headers={"session-id": "missing"})
    assert res.status_code == 404
