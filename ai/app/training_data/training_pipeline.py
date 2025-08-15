"""
Training script for Vanna AI
Run with: python app/training_data/training_pipeline.py
"""

import sys
import os

project_root = os.path.dirname(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
)
sys.path.insert(0, project_root)

from app.clients.vanna import VannaClient


def main():
    print("Wavespotter - Vanna AI Training Pipeline")
    print("=" * 50)

    client = VannaClient()
    client.train_from_files()


if __name__ == "__main__":
    main()
