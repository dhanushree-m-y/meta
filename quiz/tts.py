import pyttsx3

engine = pyttsx3.init()

def text_to_speech(text):
    engine.say(text)
    engine.runAndWait()

if __name__ == "__main__":
    while True:
        text = input("Enter text to speak (or type 'exit' to quit): ").strip()
        if text.lower() == "exit":
            break
        text_to_speech(text)
