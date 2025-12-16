# Scientific Calculator Application

A full-stack scientific calculator application built with FastAPI backend and React frontend with TypeScript and Tailwind CSS.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Docker Deployment](#docker-deployment)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Code Structure and Modification Guide](#code-structure-and-modification-guide)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## 🔍 Overview

This project is a modern scientific calculator that provides both basic arithmetic operations and advanced scientific functions through a web interface. The application features a traditional calculator UI with support for trigonometric functions, logarithms, exponentials, and more.

## ✨ Features

### Basic Operations
- Addition, Subtraction, Multiplication, Division
- Power calculation (x^y)
- Percentage calculations

### Scientific Functions
- Trigonometric functions (sin, cos, tan)
- Logarithmic functions (ln, log10)
- Exponential function (e^x)
- Square root
- Factorial

### Additional Features
- Degree/Radian mode toggle
- Memory functions (MC, MR, M+, M-)
- Real-time calculation with backend API
- Error handling and validation
- Responsive design
- Traditional calculator interface

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern, fast web framework for building APIs
- **Python 3.11+** - Programming language
- **Uvicorn** - ASGI server
- **Pydantic** - Data validation
- **Pytest** - Testing framework

### Frontend
- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **React Router v6** - Client-side routing

## 📁 Project Structure

```
sample-calc-app/
├── backend/
│   ├── fastapi-calculator/
│   │   ├── app/
│   │   │   ├── __init__.py
│   │   │   ├── main.py              # FastAPI application entry point
│   │   │   ├── routers/
│   │   │   │   ├── __init__.py
│   │   │   │   └── calculator.py    # API route handlers
│   │   │   └── models/
│   │   │       ├── __init__.py
│   │   │       └── schemas.py       # Pydantic models
│   │   ├── requirements.txt         # Python dependencies
│   │   ├── Dockerfile               # Docker configuration
│   │   ├── docker-compose.yml       # Docker Compose configuration
│   │   └── README.md
│   ├── src/
│   │   ├── calculator.py            # Core calculator logic
│   │   ├── scientific_functions.py  # Scientific function implementations
│   │   ├── memory.py                # Memory management
│   │   └── utils.py                 # Utility functions
│   └── tests/                       # Backend unit tests
│
├── frontend/
│   └── my-react-app/
│       ├── src/
│       │   ├── components/
│       │   │   ├── ScientificCalculator.tsx  # Main calculator component
│       │   │   ├── Home.tsx                  # Home page
│       │   │   ├── About.tsx                 # About page
│       │   │   ├── NotFound.tsx              # 404 page
│       │   │   └── index.ts                  # Component exports
│       │   ├── services/
│       │   │   └── api.ts                    # API client
│       │   ├── styles/
│       │   │   ├── Calculator.css
│       │   │   └── ScientificCalculator.css
│       │   ├── types/
│       │   │   └── index.ts                  # TypeScript types
│       │   ├── App.tsx                       # Main app component
│       │   ├── main.tsx                      # App entry point
│       │   └── index.css                     # Global styles
│       ├── public/
│       ├── index.html
│       ├── package.json
│       ├── vite.config.ts                    # Vite configuration
│       ├── tailwind.config.js                # Tailwind configuration
│       ├── tsconfig.json                     # TypeScript configuration
│       └── Dockerfile                        # Docker configuration
│
├── .gitignore
├── LICENSE
└── README.md
```

## 📋 Prerequisites

### Local Development
- **Python 3.11 or higher**
- **Node.js 18 or higher**
- **npm or yarn**
- **Git**

### Docker Deployment
- **Docker 20.10+**
- **Docker Compose 2.0+**

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/sample-calc-app.git
cd sample-calc-app
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend/fastapi-calculator

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend/my-react-app

# Install dependencies
npm install

# or using yarn
yarn install
```

## 🏃 Running the Application

### Option 1: Local Development

#### Start Backend Server

```bash
cd backend/fastapi-calculator
uvicorn app.main:app --reload --port 8000
```

The backend API will be available at `http://localhost:8000`
- API Documentation: `http://localhost:8000/docs`
- Alternative API docs: `http://localhost:8000/redoc`

#### Start Frontend Development Server

```bash
cd frontend/my-react-app
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Option 2: Production Build

#### Build Frontend

```bash
cd frontend/my-react-app
npm run build
```

The built files will be in the `dist/` directory.

#### Serve Frontend

```bash
npm run serve
```

## 🐳 Docker Deployment

### Backend Only

```bash
cd backend/fastapi-calculator

# Build Docker image
docker build -t calculator-backend .

# Run container
docker run -d \
  --name calculator-backend \
  -p 8000:8000 \
  -e ALLOWED_ORIGINS="http://localhost:5173,http://localhost:3000" \
  calculator-backend
```

### Using Docker Compose (Recommended)

```bash
cd backend/fastapi-calculator

# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Full Stack Docker Deployment

Create a `docker-compose.yml` in the project root:

```yaml
version: '3.8'

services:
  backend:
    build:
      context: ./backend/fastapi-calculator
    container_name: calculator-backend
    ports:
      - "8000:8000"
    environment:
      - ALLOWED_ORIGINS=http://localhost:5173,http://frontend:5173
    networks:
      - calculator-network

  frontend:
    build:
      context: ./frontend/my-react-app
    container_name: calculator-frontend
    ports:
      - "5173:5173"
    depends_on:
      - backend
    environment:
      - VITE_API_URL=http://localhost:8000
    networks:
      - calculator-network

networks:
  calculator-network:
    driver: bridge
```

Then run:

```bash
docker-compose up -d
```

## 📚 API Documentation

### Base URL
```
http://localhost:8000/api
```

### Endpoints

#### Basic Operations

**Addition**
```http
POST /api/add
Content-Type: application/json

{
  "a": 5,
  "b": 3
}

Response: { "result": 8 }
```

**Subtraction**
```http
POST /api/subtract
Content-Type: application/json

{
  "a": 10,
  "b": 4
}

Response: { "result": 6 }
```

**Multiplication**
```http
POST /api/multiply
Content-Type: application/json

{
  "a": 6,
  "b": 7
}

Response: { "result": 42 }
```

**Division**
```http
POST /api/divide
Content-Type: application/json

{
  "a": 20,
  "b": 4
}

Response: { "result": 5 }
```

#### Scientific Operations

**Sine**
```http
POST /api/sin
Content-Type: application/json

{
  "x": 1.5708
}

Response: { "result": 1.0 }
```

**Cosine**
```http
POST /api/cos
Content-Type: application/json

{
  "x": 0
}

Response: { "result": 1.0 }
```

**Logarithm (Natural)**
```http
POST /api/log
Content-Type: application/json

{
  "x": 2.71828
}

Response: { "result": 1.0 }
```

**Square Root**
```http
POST /api/sqrt
Content-Type: application/json

{
  "x": 16
}

Response: { "result": 4.0 }
```

**Power**
```http
POST /api/power
Content-Type: application/json

{
  "a": 2,
  "b": 3
}

Response: { "result": 8.0 }
```

**Factorial**
```http
POST /api/factorial
Content-Type: application/json

{
  "x": 5
}

Response: { "result": 120 }
```

### Interactive API Documentation

Visit `http://localhost:8000/docs` for interactive Swagger UI documentation where you can test all endpoints directly.

## 🧪 Testing

### Backend Tests

```bash
cd backend
pytest tests/ -v
```

Run specific test file:
```bash
pytest tests/test_calculator.py -v
```

Run with coverage:
```bash
pytest tests/ --cov=src --cov-report=html
```

### Frontend Tests

```bash
cd frontend/my-react-app
npm test
```

## 📖 Code Structure and Modification Guide

### Backend Architecture

#### 1. Adding New API Endpoints

**File:** `backend/fastapi-calculator/app/routers/calculator.py`

```python
@router.post("/new-operation", response_model=CalculationResponse)
async def new_operation(request: CalculationRequest):
    # Your calculation logic here
    result = request.a + request.b  # Example
    return CalculationResponse(result=result)
```

#### 2. Modifying Request/Response Models

**File:** `backend/fastapi-calculator/app/models/schemas.py`

```python
class NewRequest(BaseModel):
    value: float
    mode: str = "default"
    
class NewResponse(BaseModel):
    result: float
    status: str
```

#### 3. Adding Core Calculator Functions

**File:** `backend/src/calculator.py`

```python
def new_calculation(self, a, b):
    """Add your new calculation logic"""
    return a + b
```

#### 4. Implementing Scientific Functions

**File:** `backend/src/scientific_functions.py`

```python
def new_scientific_function(x):
    """
    Calculate something scientific
    Args:
        x: Input value
    Returns:
        Calculated result
    """
    import math
    return math.some_function(x)
```

### Frontend Architecture

#### 1. Modifying Calculator UI

**File:** `frontend/my-react-app/src/components/ScientificCalculator.tsx`

To add a new button:
```tsx
<button 
    onClick={() => handleNewOperation('operation')}
    className="p-3.5 text-sm font-semibold ..."
    disabled={loading}
>
    New Op
</button>
```

To add new state:
```tsx
const [newState, setNewState] = useState<string>('');
```

#### 2. Adding API Calls

**File:** `frontend/my-react-app/src/services/api.ts`

```typescript
export const calculatorAPI = {
    newOperation: async (data: CalculationRequest): Promise<number> => {
        try {
            const response = await api.post<CalculationResponse>('/new-operation', data);
            return response.data.result;
        } catch (error: any) {
            throw new Error(error.response?.data?.detail || 'Error in operation');
        }
    },
};
```

#### 3. Styling with Tailwind

**File:** Any component `.tsx` file

Common Tailwind classes used:
- `bg-gradient-to-br` - Gradient background
- `from-[color] to-[color]` - Gradient colors
- `p-{size}` - Padding
- `m-{size}` - Margin
- `text-{size}` - Font size
- `rounded-{size}` - Border radius

Custom colors defined in `tailwind.config.js`:
```javascript
colors: {
  calculator: {
    dark: '#2c3e50',
    blue: '#3498db',
    // Add your custom colors
  }
}
```

#### 4. Adding New Routes

**File:** `frontend/my-react-app/src/App.tsx`

```tsx
<Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/new-page" element={<NewPage />} />
    <Route path="*" element={<NotFound />} />
</Routes>
```

#### 5. TypeScript Types

**File:** `frontend/my-react-app/src/types/index.ts`

```typescript
export interface NewType {
    id: number;
    value: string;
    // Add your properties
}
```

### Configuration Files

#### Backend Configuration

**CORS Settings** - `backend/fastapi-calculator/app/main.py`
```python
ALLOWED_ORIGINS = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:5173,http://localhost:3000"
).split(",")
```

#### Frontend Configuration

**API Base URL** - `frontend/my-react-app/src/services/api.ts`
```typescript
const API_BASE_URL = 'http://localhost:8000/api';
```

**Vite Proxy** - `frontend/my-react-app/vite.config.ts`
```typescript
server: {
    proxy: {
        '/api': {
            target: 'http://localhost:8000',
            changeOrigin: true,
        },
    },
}
```

## 🎨 Customization Guide

### Changing Color Scheme

**File:** `frontend/my-react-app/tailwind.config.js`

```javascript
theme: {
    extend: {
        colors: {
            calculator: {
                dark: '#YOUR_COLOR',
                blue: '#YOUR_COLOR',
                // Modify existing or add new colors
            }
        }
    }
}
```

### Modifying Calculator Layout

The calculator uses a 5-column grid layout. To change:

**File:** `frontend/my-react-app/src/components/ScientificCalculator.tsx`

```tsx
<div className="grid grid-cols-5 gap-2">
  {/* Change grid-cols-5 to your desired number */}
</div>
```

### Adding Memory Functions

Memory functions are placeholders. To implement:

1. Add state for memory:
```tsx
const [memory, setMemory] = useState<number>(0);
```

2. Implement handlers:
```tsx
const handleMemoryClear = () => setMemory(0);
const handleMemoryRecall = () => setDisplay(memory.toString());
const handleMemoryAdd = () => setMemory(memory + parseFloat(currentValue));
```

## 🔧 Environment Variables

### Backend (.env)

```env
# CORS Configuration
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000

# Server Configuration
HOST=0.0.0.0
PORT=8000

# Logging
LOG_LEVEL=info
```

### Frontend (.env)

```env
# API Configuration
VITE_API_URL=http://localhost:8000/api

# Environment
VITE_ENV=development
```

## 🤝 Contributing

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Write tests for your changes**
5. **Run tests**
   ```bash
   # Backend
   pytest tests/
   
   # Frontend
   npm test
   ```
6. **Commit your changes**
   ```bash
   git commit -m "Add: your feature description"
   ```
7. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```
8. **Create a Pull Request**

### Coding Standards

#### Python (Backend)
- Follow PEP 8 style guide
- Use type hints
- Write docstrings for functions
- Maximum line length: 100 characters

```python
def calculate_something(value: float, mode: str = "default") -> float:
    """
    Calculate something based on value and mode.
    
    Args:
        value: The input value
        mode: Calculation mode (default: "default")
        
    Returns:
        Calculated result
        
    Raises:
        ValueError: If value is negative
    """
    if value < 0:
        raise ValueError("Value must be positive")
    return value * 2
```

#### TypeScript (Frontend)
- Use TypeScript strict mode
- Define interfaces for all data structures
- Use functional components with hooks
- Use meaningful variable names

```typescript
interface CalculationProps {
    value: number;
    onCalculate: (result: number) => void;
}

const MyComponent: React.FC<CalculationProps> = ({ value, onCalculate }) => {
    const [result, setResult] = useState<number>(0);
    
    // Component logic
    
    return <div>...</div>;
};
```

## 🐛 Troubleshooting

### Common Issues

#### 1. CORS Errors

**Problem:** Browser shows CORS policy error

**Solution:**
- Check backend CORS configuration in `app/main.py`
- Ensure frontend URL is in `ALLOWED_ORIGINS`
- Restart backend server after changes

#### 2. Connection Refused

**Problem:** Frontend cannot connect to backend

**Solution:**
- Verify backend is running on port 8000
- Check `API_BASE_URL` in `services/api.ts`
- Ensure no firewall blocking the connection

#### 3. Module Not Found (Backend)

**Problem:** `ModuleNotFoundError` when running backend

**Solution:**
```bash
# Ensure virtual environment is activated
source venv/bin/activate  # macOS/Linux
venv\Scripts\activate     # Windows

# Reinstall dependencies
pip install -r requirements.txt
```

#### 4. npm Install Errors (Frontend)

**Problem:** Errors during `npm install`

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

#### 5. Tailwind Styles Not Working

**Problem:** Tailwind classes not applying

**Solution:**
- Ensure Tailwind is installed: `npm list tailwindcss`
- Check `tailwind.config.js` content paths
- Verify `@tailwind` directives in `index.css`
- Restart dev server

#### 6. Docker Build Fails

**Problem:** Docker build errors

**Solution:**
```bash
# Clean Docker cache
docker system prune -a

# Rebuild without cache
docker-compose build --no-cache

# Check Docker logs
docker-compose logs backend
```

### Debug Mode

#### Enable Backend Debug Logging

```python
# In app/main.py
import logging

logging.basicConfig(level=logging.DEBUG)
```

#### Enable Frontend Debug

```typescript
// In services/api.ts
api.interceptors.request.use(request => {
    console.log('Request:', request);
    return request;
});
```

## 📝 Best Practices

### Backend

1. **Error Handling**
   - Always validate input
   - Return meaningful error messages
   - Use appropriate HTTP status codes

2. **API Design**
   - Keep endpoints RESTful
   - Version your API (`/api/v1/`)
   - Document all endpoints

3. **Security**
   - Validate all inputs
   - Use environment variables for secrets
   - Implement rate limiting for production

### Frontend

1. **Component Structure**
   - Keep components small and focused
   - Separate business logic from UI
   - Use custom hooks for reusable logic

2. **State Management**
   - Use local state when possible
   - Consider Context API for global state
   - Avoid prop drilling

3. **Performance**
   - Use React.memo for expensive components
   - Implement debouncing for API calls
   - Lazy load routes and components

## 📊 Performance Optimization

### Backend

```python
# Use async/await for I/O operations
@router.post("/calculate")
async def calculate(request: CalculationRequest):
    result = await perform_async_calculation(request)
    return result
```

### Frontend

```typescript
// Debounce API calls
import { debounce } from 'lodash';

const debouncedCalculate = useCallback(
    debounce(async (value) => {
        const result = await calculatorAPI.add(value);
        setResult(result);
    }, 300),
    []
);
```

## 🚀 Deployment to Production

### Backend Deployment (Example: Heroku)

```bash
# Install Heroku CLI
# Create Procfile
echo "web: uvicorn app.main:app --host 0.0.0.0 --port $PORT" > Procfile

# Deploy
heroku create your-app-name
git push heroku main
```

### Frontend Deployment (Example: Vercel)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd frontend/my-react-app
vercel --prod
```

## 📚 Additional Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Docker Documentation](https://docs.docker.com/)

## 📧 Support

For questions or issues:
- Open an issue on GitHub
- Check existing issues and discussions
- Contact: your-email@example.com

## 📄 License

This project is licensed under the BSD 2-Clause License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **KumarGN** - *Initial work*

## 🙏 Acknowledgments

- FastAPI team for the excellent framework
- React team for the powerful UI library
- Tailwind CSS for the utility-first CSS framework
- All contributors and users of this project

---

**Happy Calculating! 🧮**