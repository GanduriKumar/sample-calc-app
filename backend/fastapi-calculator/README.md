# FastAPI Calculator

This project is a simple calculator API built using FastAPI. It provides endpoints for basic arithmetic operations such as addition, subtraction, multiplication, and division.

## Project Structure

```
fastapi-calculator
├── app
│   ├── __init__.py
│   ├── main.py
│   ├── routers
│   │   ├── __init__.py
│   │   └── calculator.py
│   └── models
│       ├── __init__.py
│       └── schemas.py
├── requirements.txt
└── README.md
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd fastapi-calculator
   ```

2. Install the required dependencies:
   ```
   pip install -r requirements.txt
   ```

3. Run the application:
   ```
   uvicorn app.main:app --reload
   ```

## Usage

Once the application is running, you can access the API at `http://127.0.0.1:8000`.

### API Endpoints

- **Addition**
  - **Endpoint:** `/add`
  - **Method:** `POST`
  - **Request Body:** `{ "a": number, "b": number }`
  - **Response:** `{ "result": number }`

- **Subtraction**
  - **Endpoint:** `/subtract`
  - **Method:** `POST`
  - **Request Body:** `{ "a": number, "b": number }`
  - **Response:** `{ "result": number }`

- **Multiplication**
  - **Endpoint:** `/multiply`
  - **Method:** `POST`
  - **Request Body:** `{ "a": number, "b": number }`
  - **Response:** `{ "result": number }`

- **Division**
  - **Endpoint:** `/divide`
  - **Method:** `POST`
  - **Request Body:** `{ "a": number, "b": number }`
  - **Response:** `{ "result": number }`

## License

This project is licensed under the MIT License.