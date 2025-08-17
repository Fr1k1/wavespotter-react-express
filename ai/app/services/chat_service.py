import asyncio
from app.utils.logger import get_logger
from google.genai import types
from app.clients.gemini import client
from app.clients.vanna import get_vanna_client
from app.models.chat import ChatRequest
from app.services.response_formatter import format_vanna_response

logger = get_logger(__name__)


async def process_chat(req: ChatRequest) -> str:
    latest_message = (
        req.messages[-1]["content"] if req.messages else ""
    )  # [-1] je posljednji element u listi
    logger.info(f"User prompt: {latest_message}")

    vanna_client = get_vanna_client()
    loop = asyncio.get_event_loop()
    vanna_response = await loop.run_in_executor(
        None, lambda: vanna_client.ask_question(latest_message)
    )

    logger.info(f"Vanna response: {vanna_response}")

    if not vanna_response.get("success", False):
        return await _fallback_to_gemini(req)

    response_content = format_vanna_response(vanna_response)
    logger.info(f"Response content: {response_content}")
    return response_content


async def _fallback_to_gemini(req: ChatRequest) -> str:
    logger.info("Fallback to Gemini.")
    instructions = types.Content(
        role="model",
        parts=[
            types.Part(
                text="You are a helpful assistant that can answer questions about data specialized in river and sea beaches."
            )
        ],
    )
    contents = [
        instructions,
        *[
            types.Content(role=m["role"], parts=[types.Part(text=m["content"])])
            for m in req.messages
        ],
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
    return response.text or ""
