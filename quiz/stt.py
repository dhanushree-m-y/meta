import pyttsx3
from vosk import Model, KaldiRecognizer
import pyaudio
import json

# 🔊 Initialize Text-to-Speech (TTS)
engine = pyttsx3.init()

def text_to_speech(text):
    """Convert text to speech."""
    engine.say(text)
    engine.runAndWait()

# 🎤 Initialize Vosk Speech Recognition Model
VOSK_MODEL_PATH = "vosk-model-small-en-us-0.15"  # Change this to your model path
model = Model(VOSK_MODEL_PATH)

# 🎙️ Initialize Microphone
p = pyaudio.PyAudio()
stream = p.open(format=pyaudio.paInt16, channels=1, rate=16000, input=True, frames_per_buffer=8000)
stream.start_stream()

rec = KaldiRecognizer(model, 16000)

print("\n🎤 Speak now... (Press Ctrl+C to exit)\n")

try:
    while True:
        data = stream.read(4000, exception_on_overflow=False)
        if rec.AcceptWaveform(data):
            result = json.loads(rec.Result())
            recognized_text = result.get("text", "")
            
            if recognized_text:
                print("📝 Recognized:", recognized_text)
                text_to_speech(recognized_text)  # Convert recognized speech to voice

except KeyboardInterrupt:
    print("\n❌ Stopping...")
    stream.stop_stream()
    stream.close()
    p.terminate()
