import http.server
import socketserver
import json
import signal
import subprocess
from flask import Flask, request, send_file
from flask_cors import CORS
import os
from dotenv import load_dotenv
from convex import ConvexClient
import requests

MODELS = {
    'petergriffen': {
        'modelPath': 'Peter_Griffin.pth',
        'index_path': 'logs/Peter_Griffin.index',
    },
    'madara': {
        'modelPath': 'Madara.pth',
        'index_path': 'logs/Madara.index',
    },
    'ben10': {
        'modelPath': 'ben10.pth',
        'index_path': 'logs/ben10.index',
    },
    'timon': {
        'modelPath': 'timon.pth',
        'index_path': 'logs/',
    },
    'eld7ee7': {
        'modelPath': 'da7ee7.pth',
        'index_path': 'logs/da7ee7.index',
    },
    'luigi': {
        'modelPath': 'Luigi.pth',
        'index_path': 'logs/Luigi.index',
    },
    'miraculous': {
        'modelPath': 'MarinetteDupainCheng.pth',
        'index_path': 'logs/MarinetteDupainCheng.index',
    },
    'batman': {
        'modelPath': 'batman150.pth',
        'index_path': 'logs/batman_v2.index',
        'characterpath':'Videos/Characters/batnak.blend'
    },
    'omniman': {
        'modelPath': 'omniman.pth',
        'index_path': 'logs/omniman.index',
        'characterpath':'Videos/Characters/omniman.blend'
    }
}
 
def audiodata(gm, vc):
    # Define the path to the Python interpreter and the script to run
    python_executable = 'jou\python.exe'
    script_file = 'chatbot_modfied.py'

    # Define the command to run the script
    command = [
        python_executable,
        script_file,
        str(MODELS[str(vc)]['modelPath']),
        str(MODELS[str(vc)]['index_path']),
        str(gm)
    ]

    # Run the script using the specified Python interpreter
    subprocess.run(command, shell=True)


app = Flask(__name__)
CORS(app)  # Apply CORS globally to all routes

# ... (your audio generation logic using the received parameters)

@app.route('/api', methods=['POST'])
def generate_audio():
    # Get JSON parameters from the request body
    try:
        data = request.get_json()
        gm = data.get('giminiresponse')
        vc = data.get('voiceactor')
        # Split the string into lines
        lines = gm.splitlines()
        # Filter out empty lines
        filtered_lines = [line for line in lines if line.strip()]
        # Concatenate the lines back into a single string
        concatenated_string = ' '.join(filtered_lines)
        # if not param1 or not param2:
        #     return "Missing required parameters: param1 and param2", 400
        # Logic to generate audio data based on param1 and param2
        print(vc)
        audiodata(concatenated_string, vc)  # Replace with your audio generation function

        # Save audio data to a file (optional)
        # with open('name.wav', 'wb') as f:
        #     f.write(audio_data)

        return send_file('my_project/Videos/OutputAudio/name.wav', mimetype='audio/wav')  # Adjust path and mimetype if needed

    except Exception as e:
        print(f"Error processing request: {e}")
        return "Internal server error", 500


# @app.route('/download_file')




if __name__ == '__main__':
    app.run(host='localhost', port=8001)

