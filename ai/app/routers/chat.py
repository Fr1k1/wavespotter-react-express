from fastapi import APIRouter, HTTPException
from google.genai import types
from app.clients.gemini import client
from app.models.chat import ChatRequest, ChatResponse
import asyncio

router = APIRouter()


@router.post("/", response_model=ChatResponse)
async def chat(req: ChatRequest):
    try:
        instructions = types.Content(
            role="model",
            parts=[
                types.Part(
                    text="You are a helpful assistant that finds perfect beach based on user's needs."
                )
            ],
        )

        contents = [
            instructions,
            *[
                types.Content(role=m["role"], parts=[types.Part(text=m["content"])])
                for m in req.messages
            ],  # kao [...item, array] u JS
        ]

        loop = asyncio.get_event_loop()
        response = await loop.run_in_executor(
            None,
            lambda: client.models.generate_content(
                model="gemini-2.5-flash",
                contents=contents,
                config=types.GenerateContentConfig(
                    thinking_config=types.ThinkingConfig(thinking_budget=0)
                ),  # Disables thinking
            ),
        )

        return ChatResponse(answer=response.text or "")

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
