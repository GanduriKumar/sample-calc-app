class CalculatorService:
    def __init__(self, calculator, repository):
        self.calculator = calculator
        self.repository = repository

    def perform_operation(self, operand1, operand2, operation_type):
        result = None
        if operation_type == 'add':
            result = self.calculator.add(operand1, operand2)
        elif operation_type == 'subtract':
            result = self.calculator.subtract(operand1, operand2)
        elif operation_type == 'multiply':
            result = self.calculator.multiply(operand1, operand2)
        elif operation_type == 'divide':
            result = self.calculator.divide(operand1, operand2)
        elif operation_type == 'sin':
            result = self.calculator.sin(operand1)
        elif operation_type == 'cos':
            result = self.calculator.cos(operand1)
        elif operation_type == 'tan':
            result = self.calculator.tan(operand1)
        elif operation_type == 'sqrt':
            result = self.calculator.sqrt(operand1)

        if result is not None:
            self.repository.save_operation(operand1, operand2, operation_type, result)
        
        return result