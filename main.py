from __future__ import annotations

import sys
from calculator import Calculator

PROMPT = "calc> "


def print_help() -> None:
    print(
        "Commands:\n"
        "  digits 0-9 and '.' to enter numbers\n"
        "  + - * /   set operator\n"
        "  =         evaluate\n"
        "  sqrt      square root of current entry\n"
        "  c         clear\n"
        "  mc mr m+ m- memory clear/recall/add/subtract\n"
        "  q         quit\n"
    )


def main() -> int:
    calc = Calculator()
    print("Simple Calculator (type 'h' for help, 'q' to quit)")
    print_help()

    buffer = ""
    while True:
        try:
            raw = input(PROMPT).strip().lower()
        except (EOFError, KeyboardInterrupt):
            print()  # newline
            return 0

        if raw in {"q", "quit", "exit"}:
            return 0
        if raw in {"h", "help", "?"}:
            print_help()
            continue
        if raw == "c":
            calc.press_clear()
            buffer = ""
            print("cleared ->", calc.display)
            continue
        if raw in {"mc", "mr", "m+", "m-"}:
            if raw == "mc":
                calc.memory_clear()
                print("memory cleared")
            elif raw == "mr":
                val = calc.memory_recall()
                buffer = calc.display
                print("memory recall ->", val)
            elif raw == "m+":
                val = calc.memory_add()
                print("memory add ->", val)
            else:
                val = calc.memory_subtract()
                print("memory subtract ->", val)
            continue
        if raw == "sqrt":
            try:
                result = calc.sqrt()
                buffer = calc.display
                print("sqrt ->", result)
            except ValueError as exc:
                print(f"error: {exc}")
            continue
        if raw in {"+", "-", "*", "/"}:
            try:
                # commit buffer to display first
                if buffer:
                    for ch in buffer:
                        if ch == ".":
                            calc.press_decimal()
                        else:
                            calc.press_digit(int(ch))
                buffer = ""
                calc.press_operator(raw)
            except ValueError as exc:
                print(f"error: {exc}")
            continue
        if raw == "=":
            try:
                if buffer:
                    for ch in buffer:
                        if ch == ".":
                            calc.press_decimal()
                        else:
                            calc.press_digit(int(ch))
                    buffer = ""
                result = calc.press_equals()
                print("=", result)
            except Exception as exc:  # broad to catch ZeroDivisionError
                print(f"error: {exc}")
            continue

        # numeric entry
        if all(ch.isdigit() or ch == "." for ch in raw) and raw:
            buffer += raw
            print("entry ->", buffer)
            continue

        print("Unknown command. Type 'h' for help.")


def cli():
    raise SystemExit(main())


if __name__ == "__main__":
    cli()
