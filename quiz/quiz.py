import json 
import os
import sys
import time
import pyaudio
import pyttsx3
import vosk
import asyncio
from thefuzz import fuzz
from googletrans import Translator

# ✅ Initialize Translator and Text-to-Speech
translator = Translator()
tts = pyttsx3.init()

# ✅ Function to Speak (Fix for 'run loop already started' error)
def speak(text):
    """Convert text to speech with a fresh engine."""
    new_tts = pyttsx3.init()
    new_tts.say(text)
    new_tts.runAndWait()
    new_tts.stop()

# ✅ Load Vosk Speech Model
MODEL_PATH = "vosk-model-small-en-us-0.15"
if not os.path.exists(MODEL_PATH):
    print("❌ Error: Vosk model not found.")
    sys.exit()

model = vosk.Model(MODEL_PATH)
recognizer = vosk.KaldiRecognizer(model, 16000)

# ✅ Function to Recognize Speech with Timeout & Retry
def recognize_speech(timeout=5, retries=2):
    """Capture speech input with retries if no input is detected."""
    for attempt in range(retries):
        print("🎤 Listening...")
        speak("Listening...")

        p = pyaudio.PyAudio()
        stream = p.open(format=pyaudio.paInt16, channels=1, rate=16000, input=True, frames_per_buffer=8192)
        stream.start_stream()

        start_time = time.time()
        recognized_text = "no_input"

        while time.time() - start_time < timeout:
            data = stream.read(4096, exception_on_overflow=False)
            if recognizer.AcceptWaveform(data):
                result = json.loads(recognizer.Result())
                recognized_text = result.get("text", "").strip().lower()
                if recognized_text:
                    break

        stream.stop_stream()
        stream.close()
        p.terminate()

        if recognized_text and recognized_text != "no_input":
            return recognized_text

        print("❌ No input detected. Retrying...")
        speak("No input detected. Please try again.")

    return "no_input"

# ✅ Function to Translate Text
async def translate_async(text, dest_lang):
    """Perform asynchronous translation."""
    translation = await translator.translate(text, dest=dest_lang)
    return translation.text

def translate_text(text):
    """Translate text into multiple languages synchronously."""
    languages = {
        "Kannada": "kn", "Hindi": "hi", "Tamil": "ta",
        "Telugu": "te", "Bengali": "bn", "Marathi": "mr"
    }
    translations = {}

    loop = asyncio.get_event_loop()

    for lang, code in languages.items():
        try:
            translations[lang] = loop.run_until_complete(translate_async(text, code))
            print(f"🌍 {lang}: {translations[lang]}")
            speak(f"{lang}: {translations[lang]}")
        except Exception as e:
            print(f"⚠️ Translation failed for {lang}: {str(e)}")
            speak(f"Translation failed for {lang}")

    return translations

# ✅ Braille Unicode Dictionary
BRAILLE_MAP = {
    "a": "⠁", "b": "⠃", "c": "⠉", "d": "⠙", "e": "⠑", "f": "⠋", "g": "⠛", "h": "⠓",
    "i": "⠊", "j": "⠚", "k": "⠅", "l": "⠇", "m": "⠍", "n": "⠝", "o": "⠕", "p": "⠏",
    "q": "⠟", "r": "⠗", "s": "⠎", "t": "⠞", "u": "⠥", "v": "⠧", "w": "⠺", "x": "⠭",
    "y": "⠽", "z": "⠵",
    "1": "⠼⠁", "2": "⠼⠃", "3": "⠼⠉", "4": "⠼⠙", "5": "⠼⠑",
    "6": "⠼⠋", "7": "⠼⠛", "8": "⠼⠓", "9": "⠼⠊", "0": "⠼⠚",
    " ": " ", ".": "⠲", ",": "⠂", "?": "⠦", "!": "⠖"
}

def convert_to_braille(text):
    """Convert text to Unicode Braille."""
    text = text.lower()
    braille_text = "".join(BRAILLE_MAP.get(char, char) for char in text)
    print(f"♿ Braille: {braille_text}")
    speak("Braille translation completed.")
    return braille_text

# ✅ Function to Ask Questions
def ask_question(question, correct_answer, hints):
    """Ask a question and allow user to answer or request hints, translation, or Braille."""
    attempts = 0
    score = 1  # Full score if answered correctly without hints

    print(f"\n🔹 Question: {question}")
    speak(question)

    while True:
        choice = input("\nEnter your answer, or type 'hint', 'translate', 'braille', 'answer', or 'voice': ").strip().lower()

        if choice == "hint":
            if attempts < len(hints):
                print(f"💡 Hint: {hints[attempts]}")
                speak(hints[attempts])
                attempts += 1
                score -= 0.2
            else:
                print("❌ No more hints available.")
                speak("No more hints available.")

        elif choice == "translate":
            translate_text(question)

        elif choice == "braille":
            braille_output = convert_to_braille(question)
            print(f"♿ Braille Output: {braille_output}")
            speak("Braille output generated.")

        elif choice == "voice":
            recognized_answer = recognize_speech()
            print(f"🗣 Recognized: {recognized_answer}")
            choice = recognized_answer

        elif choice == "answer":
            print(f"✅ Correct Answer: {correct_answer}")
            speak(f"The correct answer is {correct_answer}.")
            return max(score, 0)

        else:
            if fuzz.ratio(choice, correct_answer.lower()) > 70:
                print("✅ Correct!")
                speak("Correct answer!")
                return max(score, 0)
            else:
                print("❌ Incorrect. Try again or ask for a hint!")
                speak("Incorrect. Try again or ask for a hint.")

# ✅ Load Questions from JSON
def load_questions(subject):
    """Load questions from a JSON file based on subject."""
    file_path = os.path.join(os.path.dirname(__file__), f"{subject}.json")

    if not os.path.exists(file_path):
        print(f"❌ Error: {file_path} not found!")
        sys.exit()

    with open(file_path, "r") as f:
        return json.load(f)

# ✅ Start Quiz
print("\n🎉 Welcome to the AI-Powered Offline Quiz!")
speak("Welcome to the AI-Powered Offline Quiz!")

subject_input = input("\n📚 Choose subject (Math, Food, Social): ").strip().lower()
questions = load_questions(subject_input)
total_score = sum(ask_question(q["question"], q["answer"], q["hints"]) for q in questions)

print(f"\n🎯 Quiz Completed! Your final score: {total_score}/{len(questions)}")
speak(f"Quiz completed! Your final score is {total_score} out of {len(questions)}.")
