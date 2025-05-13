# Financial Planning Application

## Getting Started

### Quick Start

1. Make the script executable (only needed once):
   ```bash
   chmod +x start-app.sh
   ```

2. Start the application:
   ```bash
   ./start-app.sh
   ```

3. Access the application at http://localhost:3000

The script will start both the backend server (port 20201) and frontend server (port 3000).

### Prerequisites
- Node.js (v14 or higher)
- npm
- MongoDB

## Tech Stack

### Frontend
- React with React Router and React Bootstrap
- Chart.js for data visualization
- Formik + Yup for form handling

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication

## Features

### User Management
- User registration & login
- JWT-based authentication

### Financial Calculators
1. **Interest and Savings Calculator**
   - Simple & compound interest
   - Recurring vs one-time deposits

2. **Net Worth Calculator**
   - Input assets and liabilities
   - Auto-categorization (e.g., real estate, investments, loans)

3. **Pension Contribution Simulator**
   - Set contribution percentage and salary growth
   - Include employer matching & inflation

4. **Retirement Planning Calculator**
   - Estimate required savings based on age, lifestyle, inflation
   - Model retirement drawdown

5. **Loan Repayment Calculator**
   - Mortgage, car, personal loan payoff schedules
   - Amortization table

6. **Emergency Fund Estimator**
   - Based on monthly expenses & desired months of coverage

### Data Persistence
- Save calculations to user account
- View saved calculations in dashboard

## Project Structure

### Frontend (React)
- `/client` - React application
  - `/components` - UI components
  - `/pages` - Page components
  - `/services` - API services
  - `/utils` - Financial calculator functions

### Backend (Node.js/Express)
- `/server` - Express application
  - `/models` - MongoDB models
  - `/routes` - API routes
  - `/middleware` - Authentication middleware

## API Endpoints

### Authentication
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user

### Calculations
- `GET /api/calculations` - Get all calculations for logged-in user
- `POST /api/calculations` - Create a new calculation
- `DELETE /api/calculations/:id` - Delete a calculation

## GitHub Workflow

### Issue & Pull Request Management
- Always use GitHub MCP (Managed Code Profiles) for interacting with the GitHub repository
- Use GitHub MCP for fetching issues, creating pull requests, commenting, and any other GitHub operations
- Auth tokens are already associated with the GitHub MCP functions - do not use separate auth tokens
- Never use curl commands for GitHub API operations
- For operations like fetching issues, commit changes, or creating pull requests, rely exclusively on the GitHub MCP tools