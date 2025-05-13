#!/bin/bash

# Start MongoDB (if you have it installed locally)
# If you're using MongoDB Atlas or another setup, you can remove this line
# mongod --fork --logpath /tmp/mongodb.log

# Start the backend server
echo "Starting the backend server..."
cd server
npm install
node server.js &
BACKEND_PID=$!

# Wait for backend to initialize
sleep 5

# Start the frontend development server
echo "Starting the frontend development server..."
cd ../client
npm install
npm start &
FRONTEND_PID=$!

echo "\n=============================================="
echo "Financial Planning App is starting up!"
echo "=============================================="
echo "Backend running on: http://localhost:20201"
echo "Frontend running on: http://localhost:3000"
echo "=============================================="
echo "Press Ctrl+C to stop both servers"

# Wait for user to press Ctrl+C
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait