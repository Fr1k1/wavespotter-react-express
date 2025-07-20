from fastapi import FastAPI
from app.routers.main import router
import app.config

app = FastAPI()
app.include_router(router)
