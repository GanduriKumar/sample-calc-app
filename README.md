# Simple Calculator (Python)

A minimal console calculator with digit entry, basic arithmetic (+, -, *, /), square root, clear, and memory functions (MC, MR, M+, M-), plus a FastAPI HTTP interface.

## Features
- Digits 0-9 with decimal entry
- Arithmetic: add, subtract, multiply, divide (division by zero guarded)
- Square root with negative-input protection
- Memory: clear, recall, add, subtract
- Clear entry and pending operation
- CLI prompt with simple commands

## Getting Started
### Prerequisites
- Python 3.9+
- (Optional) Virtual environment recommended

### Install dependencies
```powershell
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

### Run the CLI
```powershell
python main.py
```

### Run the API server (FastAPI)
```powershell
uvicorn api:app --reload
```

Key endpoints (set `session-id` header after creating a session):
- `POST /session` → `{ "session_id": "..." }`
- `GET /display`
- `POST /press-digit` body `{ "digit": 7 }`
- `POST /press-decimal`
- `POST /press-operator` body `{ "operator": "+" }`
- `POST /equals`
- `POST /sqrt`
- `POST /clear`
- Memory: `POST /memory/clear`, `/memory/recall`, `/memory/add`, `/memory/subtract`

Commands inside the prompt:
- Digits / `.` to build a number
- `+` `-` `*` `/` select operator
- `=` evaluate
- `sqrt` square root of current entry
- `c` clear
- `mc` `mr` `m+` `m-` memory clear/recall/add/subtract
- `h` help, `q` quit

### Run tests
```powershell
pytest
```
API tests are included and run with the same command.

## Notes
- `ZeroDivisionError` is raised when dividing by zero.
- `ValueError` is raised for invalid digits/operators or square root of a negative number.
