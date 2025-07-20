from fastapi import APIRouter
from google.genai import types
from app.clients.gemini import client

router = APIRouter()


@router.get("/")
async def test():
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents="Explain how AI works in a few words",
        config=types.GenerateContentConfig(
            thinking_config=types.ThinkingConfig(thinking_budget=0)
        ),  # Disables thinking
    )
    return {"answer": response.text}
