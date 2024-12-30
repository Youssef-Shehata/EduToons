import subprocess
from flask import Flask, make_response, request, jsonify, send_file
from flask_cors import CORS
from dotenv import load_dotenv
from convex import ConvexClient
import json
import requests
import os
from moviepy.editor import VideoFileClip
from moviepy.editor import AudioFileClip
import shutil
from moviepy.editor import VideoFileClip, AudioFileClip
from moviepy.audio.fx.all import audio_loop

load_dotenv(".env.local")
load_dotenv()
client = ConvexClient("https://youthful-tern-150.convex.cloud")

app = Flask(__name__)
CORS(app)  # Apply CORS globally to all routes

global filename
global userId
global title
global description



MODELS = {
    'petergriffen': {
        'modelPath': 'Peter_Griffin.pth',
        'index_path': 'logs/Peter_Griffin.index',
        'characterpath':''
    },
    'madara': {
        'modelPath': 'Madara.pth',
        'index_path': 'logs/Madara.index',
        'characterpath':'Videos/Characters/madara.blend'
    },
    'ben10': {
        'modelPath': 'ben10.pth',
        'index_path': 'logs/ben10.index',
        'characterpath':'Videos/Characters/ben10.blend'
    },
    'timon': {
        'modelPath': 'timon.pth',
        'index_path': 'logs/timon.index',
        'characterpath':'Videos/Characters/timon.blend'
    },
    'eld7ee7': {
        'modelPath': 'da7ee7.pth',
        'index_path': 'logs/da7ee7.index',
        'characterpath':''
    },
    'luigi': {
        'modelPath': 'Luigi.pth',
        'index_path': 'logs/Luigi.index',
        'characterpath':'Videos/Characters/luigi.blend'
    },
    'miraculous': {
        'modelPath': 'MarinetteDupainCheng.pth',
        'index_path': 'logs/MarinetteDupainCheng.index',
        'characterpath':'Videos/Characters/miraculous.blend'
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




UPLOAD_FOLDER = 'Videos/InputVideo'  # Define the folder where you want to save the uploaded videos
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def run_test_RVC(input_wav_path, model_path, index_path):
    # Define the path to the Python interpreter and the script to run
    print(input_wav_path)
    # print(input_wav_path)
    python_executable = 'runtime\\python.exe'
    script_file = 'test_RVC.py'
    # os.chdir(r"..")
    # Define the command to run the script
    command = [
        python_executable,
        script_file,
        str(input_wav_path),
        "rmvpe",
        str(model_path),
        str(index_path)
    ]

    # Run the script using the specified Python interpreter
    subprocess.run(command, shell=True)

def video_to_wav(video_path, output_folder):
    # Create output folder if it doesn't exist
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    # Extract filename without extension
    video_name = os.path.splitext(os.path.basename(video_path))[0]

    # Load video clip
    video_clip = VideoFileClip(video_path)

    # Set output wav file path
    wav_output_path = os.path.join(output_folder, f"{video_name}.wav")

    # Write audio from video clip to wav file
    video_clip.audio.write_audiofile(wav_output_path)

    print(f"Video converted to WAV successfully: {wav_output_path}")

    return wav_output_path

def get_video():
    with open(r"C:\Users\mhmdm\Desktop\voice test models\RVC-beta0717\my_project\Videos\InputVideo\now.txt", 'r') as f:
        content = f.read()
        path = os.path.join(r"C:\Users\mhmdm\Desktop\voice test models\RVC-beta0717\my_project\Videos\InputVideo", content)
    # os.remove(r"C:\Users\mhmdm\Desktop\voice test models\RVC-beta0717\my_project\Videos\InputVideo\now.txt")
    return path


def video_generation(character):
  
    blender_path = r"C:\Program Files\Blender Foundation\Blender 4.1\blender.exe"
    script_file = r"C:\Users\mhmdm\Desktop\voice test models\RVC-beta0717\my_project\detect.py"
    # os.chdir(r"..")
    command = [
        blender_path,
        os.path.join(r"C:\Users\mhmdm\Desktop\voice test models\RVC-beta0717\my_project",MODELS[character]["characterpath"]),
        "-P",
        script_file,
    ]
    subprocess.run(command,shell=True, check=True)


def upload_video(audio_path,video_path,character):
    # current_dir = os.getcwd()
    # print(current_dir)
    # os.chdir(r"\my_project")
    video = VideoFileClip(video_path)
    audio = AudioFileClip(audio_path)
    if audio.duration > video.duration:
        audio = audio.subclip(0, video.duration)
    else:
        audio = audio_loop(audio, duration=video.duration)
    # Set the audio of the video file
    video = video.set_audio(audio)
    output_path = "my_project/Videos/OutputVideos/output.mp4"
    video.write_videofile(output_path, codec="libx264", audio_codec="aac")
    #### In case with localdb
    destination_dir = r'C:\Users\mhmdm\Desktop\gp_final_project\repo\EduToons\public\videos'
    file_name, file_extension = os.path.splitext(filename)
    new_path = file_name + '_' + character + file_extension
    destination = os.path.join(destination_dir, new_path)
    shutil.copy(video_path, destination)
    def replace_backslashes(path):
        return path.replace('\\', '/')
    final_destination = replace_backslashes(destination)
    URL = "http://localhost:3000/api/db/videos"
    BODY = {'url': final_destination,
              'status': "student",
              'teacherid': userId,
              'character': character,
              'title': title,
              'description': description
              }
    response = requests.post(url=URL, json=BODY)
    data = response.json()
    print(data)




    #### In case with internet
    # with open(output_path, 'rb') as f:
    #     video_data = f.read()
    # os.chdir(r"./my_project")
    # URL = client.mutation("videos:generateUploadUrl")
    # headers = {'Content-Type': 'video/mp4'}
    # response = requests.post(URL, headers=headers, data=video_data)
    # # Assuming the response contains the storageId
    # storage_id = response.json()['storageId']
    # client.mutation("videos:createVideo",args={
    #     "storageId": storage_id,
    #     "userId": userId,
    #     "title": title,
    #     "description": description,
    #     "character": character
    # })

def process(path,character):
    run_test_RVC(path, MODELS[character]["modelPath"], MODELS[character]["index_path"])
    video_generation(character)
    upload_video("my_project/Videos/OutputAudio/name.wav","my_project/Videos/OutputVideos/output.mp4",character)

@app.route('/api', methods=['POST'])
def handle_video():
    global filename
    global userId
    global title
    global description
    file = request.files.get('video')
    video_data = request.form.get('videoData')
    video_data_dict = json.loads(video_data)
    userId = video_data_dict['userId']
    title = video_data_dict['title']
    description = video_data_dict['description']
    filename = video_data_dict['fileName']
    with open("my_project/Videos/InputVideo/now.txt", 'w') as f:
        f.write(filename)
    file_directory = "my_project/" + app.config['UPLOAD_FOLDER']
    # print(file_directory)
    file_save = os.path.join(file_directory, filename)
    file.save(file_save)
    path = video_to_wav(os.path.join(file_directory, filename),"my_project/Videos/InputAudio")
    process(path,"madara")
    # process(path,"eld7ee7")
    # process(path,"miraculous")
    # process(path,"luigi")
    # process(path,"batman")
    # process(path,"ben10")




    # run_test_RVC(os.path.join("my_project/", path),MODELS["luigi"]["modelPath"],MODELS["luigi"]["index_path"])
    # video_generation("luigi")
    # upload_video("Videos/OutputAudio/name.wav","Videos/OutputVideos/output.mp4")


    # run_test_RVC(os.path.join("my_project/", path),MODELS["timon"]["modelPath"],MODELS["timon"]["index_path"])
    # video_generation("timon")
    # upload_video("Videos/OutputAudio/name.wav","Videos/OutputVideos/output.mp4")
    return jsonify({'result': 'Video uploaded successfully'}), 200



if __name__ == '__main__':
    

    app.run(host='localhost', port=8000)