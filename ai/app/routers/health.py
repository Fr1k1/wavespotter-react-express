from fastapi import APIRouter
from app.models.health_check import HealthCheck

router = APIRouter()


@router.get("/", tags=["healthcheck"], summary="Perform a healthcheck")
async def health_check():
    return HealthCheck(status="OK")
