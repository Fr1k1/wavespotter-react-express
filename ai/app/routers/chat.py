from fastapi import APIRouter, HTTPException
from app.models.chat import ChatRequest, ChatResponse
from app.services.chat_service import process_chat

router = APIRouter()


@router.post("/", response_model=ChatResponse)
async def chat(req: ChatRequest):
    try:
        response_content = await process_chat(req)
        return ChatResponse(content=response_content)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
