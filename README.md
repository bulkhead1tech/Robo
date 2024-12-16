# Flask WebSockets MongoDB Example

This repository contains an example of a Flask application using MongoDB as the database and Socket.IO for real-time communication. The application supports querying robot data and filtering it based on criteria like online status and battery percentage.

## Prerequisites

- Python 3.x
- MongoDB
- Virtual environment (venv)

**Clone the repository:**
   ```sh
   git clone https://github.com/your-username/flask-websockets-mongodb.git
   cd flask-websockets-mongodb

**CREATE A VIRTUAL ENVIRONMENT**
python -m venv venv

  **RUNNING THE PROJECT**
Start MongoDB: Ensure your MongoDB server is running.

**Run the Flask application:**
      python index.py
Open your web browser and navigate to http://localhost:5000

Get Robots Data
Endpoint: /robo

Method: GET

Query Parameters:

page (optional): Page number for pagination.

Description: Retrieves a list of robots with their details

FRONTEND SETUP
run>> cd frontend/robo
run>> npm i
run>> npm run dev
Access the frontend: Open your web browser and navigate to http://localhost:5173.      
