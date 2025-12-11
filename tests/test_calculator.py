import math
import pytest

from calculator import Calculator


def test_digit_entry_and_clear():
    calc = Calculator()
    calc.press_digit(1)
    calc.press_digit(2)
    assert calc.display == "12"
    calc.press_clear()
    assert calc.display == "0"


def test_basic_addition():
    calc = Calculator()
    calc.press_digit(2)
    calc.press_operator("+")
    calc.press_digit(3)
    assert calc.press_equals() == 5
    assert calc.display == "5"


def test_basic_subtraction():
    calc = Calculator()
    calc.press_digit(9)
    calc.press_operator("-")
    calc.press_digit(4)
    assert calc.press_equals() == 5


def test_basic_multiplication():
    calc = Calculator()
    calc.press_digit(7)
    calc.press_operator("*")
    calc.press_digit(6)
    assert calc.press_equals() == 42


def test_basic_division():
    calc = Calculator()
    calc.press_digit(8)
    calc.press_operator("/")
    calc.press_digit(4)
    assert calc.press_equals() == 2


def test_division_by_zero():
    calc = Calculator()
    calc.press_digit(5)
    calc.press_operator("/")
    calc.press_digit(0)
    with pytest.raises(ZeroDivisionError):
        calc.press_equals()


def test_sqrt():
    calc = Calculator()
    calc.press_digit(9)
    assert calc.sqrt() == 3
    assert calc.display == "3"


def test_sqrt_negative():
    calc = Calculator()
    calc.press_digit(9)
    calc.press_operator("-")
    calc.press_digit(1)
    calc.press_digit(6)
    calc.press_equals()
    with pytest.raises(ValueError):
        calc.sqrt()


def test_memory_functions():
    calc = Calculator()
    calc.press_digit(5)
    calc.memory_add()
    calc.press_clear()
    calc.press_digit(2)
    calc.memory_add()
    assert calc.memory_recall() == 7
    calc.memory_subtract()
    assert calc.memory == 0
    calc.memory_clear()
    assert calc.memory == 0


def test_chained_operations():
    calc = Calculator()
    calc.press_digit(1)
    calc.press_operator("+")
    calc.press_digit(2)
    calc.press_operator("+")
    calc.press_digit(3)
    assert calc.press_equals() == 6


def test_decimal_entry_and_formatting():
    calc = Calculator()
    calc.press_digit(1)
    calc.press_decimal()
    calc.press_digit(5)
    assert math.isclose(calc.display_value, 1.5)
    calc.press_operator("+")
    calc.press_digit(2)
    result = calc.press_equals()
    assert math.isclose(result, 3.5)
