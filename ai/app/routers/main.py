from fastapi import APIRouter
from app.routers.health import router as health_router
from app.routers.chat import router as chat_router

router = APIRouter(prefix="/api/v1")

router.include_router(health_router, prefix="/health", tags=["health"])
router.include_router(chat_router, prefix="/chat", tags=["chat"])
