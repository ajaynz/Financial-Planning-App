# Financial Planning Application

A comprehensive web application for financial planning and calculation. This tool helps users track savings, calculate interest, plan for retirement, and more.

## Features

- **User Management**: Registration, login, and profile management with JWT authentication
- **Financial Calculators**:
  - Interest and Savings Calculator
  - Net Worth Calculator
  - Pension Contribution Simulator
  - Retirement Planning Calculator
  - Loan Repayment Calculator
  - Emergency Fund Estimator
- **Data Persistence**: Save and retrieve financial calculations
- **Interactive Dashboard**: Visualize your financial data

## Tech Stack

### Frontend
- React with React Router and React Bootstrap
- Chart.js for data visualization
- Formik + Yup for form handling

### Backend
- Node.js with Express
- MongoDB with Mongoose (optional)
- JWT for authentication

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm
- MongoDB (optional for full functionality)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/financial-planning-app.git
   cd financial-planning-app
   ```

2. Install dependencies for backend and frontend
   ```bash
   # Install backend dependencies
   cd server
   npm install
   cd ..
   
   # Install frontend dependencies
   cd client
   npm install
   cd ..
   ```

3. Make the start script executable
   ```bash
   chmod +x start-app.sh
   ```

### Configuration

Create a `.env` file in the server directory with the following variables:

```
PORT=20201
MONGO_URI=mongodb://localhost:27017/financial-planner
JWT_SECRET=your_jwt_secret_key
```

## Running the Application

1. Start the application with the provided script:
   ```bash
   ./start-app.sh
   ```

2. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:20201

## API Endpoints

### Authentication
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user

### Calculations
- `GET /api/calculations` - Get all calculations for logged-in user
- `POST /api/calculations` - Create a new calculation
- `DELETE /api/calculations/:id` - Delete a calculation

## Development

### Running without MongoDB

The application can run with limited functionality without MongoDB. The backend will operate in development mode without database persistence.

### Running Backend and Frontend Separately

**Backend:**
```bash
cd server
npm start
```

**Frontend:**
```bash
cd client
npm start
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with React and Node.js
- Financial calculation libraries
- Chart.js for visualization