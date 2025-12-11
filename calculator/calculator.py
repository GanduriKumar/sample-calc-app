from __future__ import annotations

import math
from typing import Optional


class Calculator:
    """A simple stateful calculator with memory.

    Supports digit entry, basic arithmetic, square root, clear, and memory functions.
    """

    def __init__(self) -> None:
        self.memory: float = 0.0
        self.clear()

    # ----- Input and display management -----
    def press_digit(self, digit: int) -> float:
        """Append a digit (0-9) to the current display and return its numeric value."""
        if not isinstance(digit, int) or digit < 0 or digit > 9:
            raise ValueError("Digit must be an integer between 0 and 9")
        if self._display == "0":
            self._display = str(digit)
        else:
            self._display += str(digit)
        return self.display_value

    def press_decimal(self) -> float:
        """Insert a decimal point if not already present in the display."""
        if "." not in self._display:
            self._display += "."
        return self.display_value

    def press_clear(self) -> None:
        """Clear the current entry and any pending operation."""
        self.clear()

    def clear(self) -> None:
        self._display: str = "0"
        self._current_value: float = 0.0
        self._pending_operator: Optional[str] = None

    @property
    def display(self) -> str:
        return self._display

    @property
    def display_value(self) -> float:
        try:
            return float(self._display)
        except ValueError:
            # Fallback for malformed display, should not occur.
            return 0.0

    # ----- Operations -----
    def _apply_pending(self, rhs: float) -> float:
        if self._pending_operator is None:
            return rhs
        if self._pending_operator == "+":
            return self._current_value + rhs
        if self._pending_operator == "-":
            return self._current_value - rhs
        if self._pending_operator == "*":
            return self._current_value * rhs
        if self._pending_operator == "/":
            if rhs == 0:
                raise ZeroDivisionError("Cannot divide by zero")
            return self._current_value / rhs
        raise ValueError(f"Unsupported operator: {self._pending_operator}")

    def press_operator(self, operator: str) -> None:
        if operator not in {"+", "-", "*", "/"}:
            raise ValueError("Operator must be one of '+', '-', '*', '/' ")
        # Commit current display to current_value if needed
        if self._pending_operator is None:
            self._current_value = self.display_value
        else:
            self._current_value = self._apply_pending(self.display_value)
        self._pending_operator = operator
        self._display = "0"

    def press_equals(self) -> float:
        result = self._apply_pending(self.display_value)
        self._display = self._format(result)
        self._current_value = result
        self._pending_operator = None
        return result

    def sqrt(self) -> float:
        value = self.display_value
        if value < 0:
            raise ValueError("Cannot take square root of a negative number")
        result = math.sqrt(value)
        self._display = self._format(result)
        self._current_value = result
        return result

    # ----- Memory -----
    def memory_clear(self) -> None:
        self.memory = 0.0

    def memory_recall(self) -> float:
        self._display = self._format(self.memory)
        return self.memory

    def memory_add(self) -> float:
        self.memory += self.display_value
        return self.memory

    def memory_subtract(self) -> float:
        self.memory -= self.display_value
        return self.memory

    # ----- Helpers -----
    @staticmethod
    def _format(value: float) -> str:
        # Normalize to avoid trailing .0 when possible
        if value.is_integer():
            return str(int(value))
        return str(value)
