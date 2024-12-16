from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_pymongo import PyMongo
from flask_socketio import SocketIO, emit 
from gevent import monkey 
from gevent.pywsgi import WSGIServer
from geventwebsocket.handler import WebSocketHandler
import os
monkey.patch_all()
app=Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/Robots"
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})
socketio = SocketIO(app, cors_allowed_origins="http://localhost:5173")
mongo = PyMongo(app)




@app.route("/robo")

def robo():
    
    result = [] 
    page = request.args.get('page', default=1, type=int)
    items_per_page = 10 
    start = (page - 1) * items_per_page 
    robots = mongo.db.robo.find().skip(start).limit(items_per_page) 
    for robot in robots: 
        result.append({ 
            
      'Robotname': robot.get('Robot ID'),
       'Online': robot.get('Online/Offline'),
        'Battery': robot.get('Battery Percentage'), 
        'CPU': robot.get('CPU Usage'), 
        'RAM': robot.get('RAM Consumption'), 
        'LastUpdated': robot.get('Last Updated'), 
        'Location': robot.get('Location Coordinates')
        
        
        
         }) 
        
    return jsonify(result)


@socketio.on('connect') 
def connected(): 
    print(f"Client connected: {request.sid}")  
    
@socketio.on('request_data') 
def handle_request_data(): 
    send_robot_data()
def send_robot_data(): 
    result = [] 
    robots = mongo.db.robo.find()
    for robot in robots: 
        result.append({ 
            'Robotname': robot.get('Robot ID'),
            'Online': robot.get('Online/Offline'),
            'Battery': robot.get('Battery Percentage'),
            'CPU': robot.get('CPU Usage'),
            'RAM': robot.get('RAM Consumption'),
            'LastUpdated': robot.get('Last Updated'),
            'Location': robot.get('Location Coordinates') })
    emit('json_data', result)


@socketio.on('filter_data') 
def handle_frequest_data(data):
    
   query = {} 
   if 'online' in data:
    query['Online/Offline'] = data['online'] == 'true'
    if 'battery_min' in data:
        if data['battery_min'] == "low":
         query['Battery Percentage'] = {"$lt": 20}
         
        elif data['battery_min'] == "enough":
         query['Battery Percentage'] = {"$gte": 20} 
         
    result = [] 
    robots = mongo.db.robo.find(query)
    for robot in robots: 
        result.append({ 
            'Robotname': robot.get('Robot ID'),
            'Online': robot.get('Online/Offline'),
            'Battery': robot.get('Battery Percentage'),
            'CPU': robot.get('CPU Usage'),
            'RAM': robot.get('RAM Consumption'),
            'LastUpdated': robot.get('Last Updated'),
            'Location': robot.get('Location Coordinates') })
    emit('json_data', result)




if __name__== "__main__":
    http_server = WSGIServer(('0.0.0.0', 5000), app, handler_class=WebSocketHandler) 
    http_server.serve_forever()