class Operation:
    def __init__(self, operand1, operand2, operation_type):
        self.operand1 = operand1
        self.operand2 = operand2
        self.operation_type = operation_type

    def __repr__(self):
        return f"Operation({self.operand1}, {self.operand2}, '{self.operation_type}')"