class Calculator:
    def add(self, operand1, operand2):
        return operand1 + operand2

    def subtract(self, operand1, operand2):
        return operand1 - operand2

    def multiply(self, operand1, operand2):
        return operand1 * operand2

    def divide(self, operand1, operand2):
        if operand2 == 0:
            raise ValueError("Cannot divide by zero.")
        return operand1 / operand2

    def sin(self, angle):
        import math
        return math.sin(math.radians(angle))

    def cos(self, angle):
        import math
        return math.cos(math.radians(angle))

    def tan(self, angle):
        import math
        return math.tan(math.radians(angle))

    def sqrt(self, value):
        if value < 0:
            raise ValueError("Cannot take the square root of a negative number.")
        import math
        return math.sqrt(value)