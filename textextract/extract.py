import pytesseract
from PIL import Image
import requests
from io import BytesIO

# ✅ Set the path to your Tesseract executable
# For Windows, you may need to set this (example):
# pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

# ✅ OCR Image Source (Replace with your image)
image_url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQADMFc8DxagTON8MM1VnGXiGTo0G7WwpatFQXA3TiEad2h1AfkiODzuR4J&s=10"

# ✅ Fetch Image from URL
response = requests.get(image_url)
img = Image.open(BytesIO(response.content))

# ✅ Use Tesseract to extract text from the image
extracted_text = pytesseract.image_to_string(img)

print("\n🔹 Raw Extracted Text from Image:\n", extracted_text)

# ✅ Extract Questions from OCR Text
questions = [line for line in extracted_text.split("\n") if "?" in line]

# 🔹 Handle Empty Question Case
if not questions:
    print("⚠️ No questions detected in the image.")
    exit()

questions_text = "\n".join(questions)
print("\n🔹 Extracted Questions:\n", questions_text)

# ✅ Generate Answers for Each Question Using OpenAI
final_output = {}
for question in questions:
    data_ai = {
        "messages": [
            {"role": "system", "content": "You are a knowledge assistant that provides correct answers to questions."},
            {"role": "user", "content": f"Answer this question correctly: {question}"}
        ],
        "max_tokens": 100
    }

    headers_ai = {
        "Content-Type": "application/json",
        "api-key": openai_api_key
    }

    # 🔹 Get Answer from OpenAI
    try:
        response_ai = requests.post(openai_endpoint, headers=headers_ai, json=data_ai)
        response_ai.raise_for_status()
        ai_result = response_ai.json()

        # ✅ Extract AI Answer
        answer = ai_result.get("choices", [{}])[0].get("message", {}).get("content", "").strip()
        final_output[question] = answer

    except requests.exceptions.RequestException as e:
        print(f"❌ OpenAI Error: {e}")
        exit()

# 🔹 Display and Read Out Questions & Answers
print("\n🔹 Final Questions & Answers:\n")
for q, a in final_output.items():
    print(f"❓ {q}\n✅ {a}\n")
    speak(f"Question: {q}. The answer is: {a}")

# ✅ Allow user to ask for repeat answers via voice
while True:
    print("\n🔹 Say 'repeat' to hear answers again, or 'exit' to quit.")
    speak("Say repeat to hear answers again, or exit to quit.")
    user_response = recognize_speech()
    
    if user_response == "repeat":
        for q, a in final_output.items():
            speak(f"Question: {q}. The answer is: {a}")
    elif user_response == "exit":
        speak("Exiting. Goodbye!")
        print("👋 Exiting. Goodbye!")
        break
    else:
        speak("Invalid command. Please say repeat or exit.")
