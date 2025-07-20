from fastapi import APIRouter
from app.routers.health import router as health_router
from app.routers.gemini import router as gemini_router

router = APIRouter(prefix="/api/v1")

router.include_router(health_router, prefix="/health", tags=["health"])
router.include_router(gemini_router, prefix="/gemini", tags=["gemini"])
