from openai import OpenAI
from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn
from dotenv import load_dotenv
import os

load_dotenv()
#print("KEY IS:", os.getenv("OPENAI_API_KEY"))

app = FastAPI()

client = OpenAI(api_key = os.getenv("OPENAI_API_KEY"))
#os.getenv("OPENAI_API_KEY")

class Query(BaseModel):
  text: str

@app.post("/ask")
def ask_ai_post(query: Query):
  response = client.chat.completions.create(
    model = "gpt-4o-mini",
    messages = [
      {"role": "system", "content": "You are a waec, nce, gce and jamb teaching AI."},
      {"role": "system", "content": "If user asks a question not in any waec, jamb, gce,nce or school curriculum, remind them of your purpose"},
      {"role": "system", "content": "The users first message would be the language preferece, use that language as the default language for your response"},
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
  #uvicorn openai_api:app --reload

