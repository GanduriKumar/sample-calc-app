import { useEffect, useMemo, useState } from "react";
import {
  createSession,
  getDisplay,
  pressDigit,
  pressDecimal,
  pressOperator,
  pressEquals,
  takeSqrt,
  clearEntry,
  memoryClear,
  memoryRecall,
  memoryAdd,
  memorySubtract,
} from "./api";

const digits = [
  ["7", "8", "9"],
  ["4", "5", "6"],
  ["1", "2", "3"],
  ["0", "."],
];

const operators = ["+", "-", "*", "/"];

export default function App() {
  const [sessionId, setSessionId] = useState(null);
  const [display, setDisplay] = useState("0");
  const [memory, setMemory] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const disabled = useMemo(() => loading || !sessionId, [loading, sessionId]);

  useEffect(() => {
    const init = async () => {
      try {
        const { session_id } = await createSession();
        setSessionId(session_id);
        const state = await getDisplay(session_id);
        setDisplay(state.display);
        setMemory(state.memory);
      } catch (err) {
        setError(err.message);
      }
    };
    init();
  }, []);

  const run = async (fn) => {
    if (!sessionId) return;
    setLoading(true);
    setError("");
    try {
      const state = await fn();
      setDisplay(state.display);
      setMemory(state.memory);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDigit = (d) => run(() => (d === "." ? pressDecimal(sessionId) : pressDigit(sessionId, Number(d))));
  const handleOperator = (op) => run(() => pressOperator(sessionId, op));
  const handleEquals = () => run(() => pressEquals(sessionId));
  const handleSqrt = () => run(() => takeSqrt(sessionId));
  const handleClear = () => run(() => clearEntry(sessionId));
  const handleMemClear = () => run(() => memoryClear(sessionId));
  const handleMemRecall = () => run(() => memoryRecall(sessionId));
  const handleMemAdd = () => run(() => memoryAdd(sessionId));
  const handleMemSubtract = () => run(() => memorySubtract(sessionId));

  return (
    <div className="page">
      <div className="card">
        <header>
          <div>
            <h1>Calculator</h1>
            <p className="muted">FastAPI backend · React UI</p>
          </div>
          <div className="status">
            <span className={sessionId ? "pill" : "pill pill-bad"}>{sessionId ? "Session ready" : "No session"}</span>
          </div>
        </header>

        <div className="display">
          <div className="label">Memory: {memory}</div>
          <div className="value">{display}</div>
        </div>

        {error && <div className="error">{error}</div>}

        <div className="grid">
          <div className="digits">
            {digits.map((row, idx) => (
              <div className="row" key={idx}>
                {row.map((d) => (
                  <button key={d} onClick={() => handleDigit(d)} disabled={disabled}>
                    {d}
                  </button>
                ))}
              </div>
            ))}
            <div className="row">
              <button className="accent" onClick={handleEquals} disabled={disabled}>
                =
              </button>
              <button onClick={handleSqrt} disabled={disabled}>
                √
              </button>
              <button onClick={handleClear} disabled={disabled}>
                C
              </button>
            </div>
          </div>

          <div className="ops">
            {operators.map((op) => (
              <button key={op} onClick={() => handleOperator(op)} disabled={disabled}>
                {op}
              </button>
            ))}
            <div className="mem">
              <button onClick={handleMemClear} disabled={disabled}>
                MC
              </button>
              <button onClick={handleMemRecall} disabled={disabled}>
                MR
              </button>
              <button onClick={handleMemAdd} disabled={disabled}>
                M+
              </button>
              <button onClick={handleMemSubtract} disabled={disabled}>
                M-
              </button>
            </div>
          </div>
        </div>

        <footer className="muted small">API base: {import.meta.env.VITE_API_BASE_URL || "http://localhost:8000"}</footer>
      </div>
    </div>
  );
}
