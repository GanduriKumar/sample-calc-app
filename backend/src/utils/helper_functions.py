def is_number(value):
    try:
        float(value)
        return True
    except ValueError:
        return False

def validate_input(operand1, operand2):
    if not is_number(operand1) or not is_number(operand2):
        raise ValueError("Both operands must be numbers.")
    return float(operand1), float(operand2)

def format_result(result):
    return f"The result is: {result}"