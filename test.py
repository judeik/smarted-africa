from openai import OpenAI
client = OpenAI(api_key = "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"
)
def ai_chatbot():
  print("AI BOT: Hello! Type 'bye'  to quit.")
  while True:
      user_input = input("You: ")
      if user_input.lower() == "bye":
          print("AI Bot: Goodbye 👋")
          break

      chat_history = []

      chat_history.append({"role": "user", "content": user_input})

      response = client.chat.completions.create(
          model = "gpt-4o-mini",
          messages = chat_history
      )

      bot_reply = response.choices[0].message.content
      chat_history.append({"role": "assistant", "content": bot_reply})
      print("AI Bot: ", bot_reply)

ai_chatbot()



from openai import OpenAI
from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn
import os

app = FastAPI()

client = OpenAI(api_key = "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")

class Query(BaseModel):
  text: str

@app.post("/ask")
def ask_ai_post(query: Query):
  response = client.chat.completions.create(
    model = "gpt-4o-mini",
    messages = [
      {"role": "system", "content": "You are a waec, nce, gce and jamb teaching AI."},
      {"role": "system", "content": "If user asks a question not in any waec, jamb, gce,nce or school curriculum, remind them of your purpose"},
      {"role": "user", "content": query.text}
    ]
  )
  bot_reply = response.choices[0].message.content
  return {"answer": bot_reply}


@app.get("/")
def ask_ai_get(text: str):
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
          {"role": "system", "content": "You are a waec, nce, gce and jamb teaching AI."},
          {"role": "system", "content": "If user asks a question not in any waec, jamb, gce, nce or school curriculum, remind them of your purpose"},
          {"role": "system", "content": "The users first message would be the language preferece, use that language as the default language for your response"},
          {"role": "user", "content": text}
        ]
    )
    bot_reply = response.choices[0].message.content
    return {"answer": bot_reply}

if __name__ == "__main__":
  uvicorn.run(app, host = "0.0.0.0", port = 8000)
  #to run on terminal
  #uvicorn smarted-africa.openai_api:app --reload
api_key=os.getenv("OPENAI_API_KEY")