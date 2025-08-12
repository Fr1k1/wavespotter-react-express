from pydantic import BaseModel

class ChatRequest(BaseModel):
    messages: list[dict] 

class ChatResponse(BaseModel):
    answer: str