"""
Training script for Vanna AI
Run with: python app/training_data/training_pipeline.py
"""

import sys
import os
import logging


logger = logging.getLogger(__name__)


project_root = os.path.dirname(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
)
sys.path.insert(0, project_root)

from app.clients.vanna import VannaClient


def main():
    logger.info(f"Wavespotter - Vanna AI Training Pipeline")
    client = VannaClient()
    client.train_from_files()


if __name__ == "__main__":
    main()
