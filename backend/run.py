from flask import Flask, jsonify, request
from src.calculator import Calculator
from src.repositories.math_repositories import MathRepository
from src.services.calculator_services import CalculatorService

app = Flask(__name__)

# Initialize the calculator and repository
calculator = Calculator()
math_repository = MathRepository()
calculator_service = CalculatorService(calculator, math_repository)

@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.json
    operation = data.get('operation')
    operand1 = data.get('operand1')
    operand2 = data.get('operand2')

    result = calculator_service.perform_operation(operation, operand1, operand2)
    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(debug=True)