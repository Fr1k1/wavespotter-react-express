import os
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise RuntimeError("GEMINI_API_KEY is not set. Set it in .env file.")

DATABASE_URL = os.environ.get("DATABASE_URL")
PG_HOST = os.environ.get("PG_HOST", "localhost")
PG_PORT = os.environ.get("PG_PORT", "5432")
PG_DATABASE = os.environ.get("PG_DATABASE")
PG_USER = os.environ.get("PG_USER")
PG_PASSWORD = os.environ.get("PG_PASSWORD")

TRAINING_DATA_DIR = "training_data"
DDL_FILE = f"{TRAINING_DATA_DIR}/ddl.sql"
DOCS_FILE = f"{TRAINING_DATA_DIR}/docs.txt"
QA_FILE = f"{TRAINING_DATA_DIR}/qa.yaml"
