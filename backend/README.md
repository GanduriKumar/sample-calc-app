# Scientific Calculator

This project is a scientific calculator implemented in Python. It provides a variety of mathematical operations, including basic arithmetic and advanced scientific functions. The calculator also features memory storage capabilities for convenience.

## Project Structure

```
backend
├── src
│   ├── calculator.py          # Main interface for calculations
│   ├── scientific_functions.py # Contains scientific functions
│   ├── memory.py              # Manages memory storage
│   └── utils.py               # Utility functions
├── tests
│   ├── test_calculator.py     # Unit tests for Calculator
│   ├── test_scientific_functions.py # Unit tests for ScientificFunctions
│   └── test_memory.py         # Unit tests for Memory
├── requirements.txt           # Project dependencies
└── README.md                  # Project documentation
```

## Installation

To set up the project, clone the repository and install the required dependencies:

```bash
git clone <repository-url>
cd backend
pip install -r requirements.txt
```

## Usage

To use the calculator, you can create an instance of the `Calculator` class from the `calculator.py` file. Here’s a simple example:

```python
from src.calculator import Calculator

calc = Calculator()
result = calc.add(5, 3)
print(result)  # Output: 8
```

## Classes and Methods

### Calculator

- **add(a, b)**: Returns the sum of `a` and `b`.
- **subtract(a, b)**: Returns the difference of `a` and `b`.
- **multiply(a, b)**: Returns the product of `a` and `b`.
- **divide(a, b)**: Returns the quotient of `a` and `b`.
- **call_scientific_function(func_name, *args)**: Calls a scientific function based on the provided name.

### ScientificFunctions

- **sin(x)**: Returns the sine of `x`.
- **cos(x)**: Returns the cosine of `x`.
- **tan(x)**: Returns the tangent of `x`.
- **log(x)**: Returns the logarithm of `x`.
- **exp(x)**: Returns `e` raised to the power of `x`.
- **sqrt(x)**: Returns the square root of `x`.

### Memory

- **store(value)**: Stores a value in memory.
- **recall()**: Recalls the stored value.
- **clear()**: Clears the stored value from memory.

## Running Tests

To ensure everything is working correctly, you can run the unit tests using:

```bash
pytest tests/
```

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License. See the LICENSE file for details.