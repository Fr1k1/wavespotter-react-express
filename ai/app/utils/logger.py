import logging
import os
from pathlib import Path
from logging.handlers import TimedRotatingFileHandler
from datetime import datetime


def _setup_logging():
    level = os.getenv("LOG_LEVEL", "INFO").upper()
    if os.getenv("ENV") == "development":
        level = "DEBUG"

    Path("logs").mkdir(exist_ok=True)

    console_handler = logging.StreamHandler()

    today = datetime.now().strftime("%Y-%m-%d")
    log_filename = f"logs/app_{today}.log"

    file_handler = TimedRotatingFileHandler(
        filename=log_filename,
        when="midnight",
        interval=1,
        backupCount=30,
        encoding="utf-8",
    )

    formatter = logging.Formatter(
        "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
    )

    console_handler.setFormatter(formatter)
    file_handler.setFormatter(formatter)

    logging.basicConfig(
        level=getattr(logging, level),
        handlers=[console_handler, file_handler],
        force=True,
    )


_setup_logging()


def get_logger(name: str) -> logging.Logger:
    """Get a logger with the specified name"""
    return logging.getLogger(name)
