# Wavespotter AI server

This folder contains the backend AI server for Wavespotter.

## How to start

### Server

1. Navigate to the `ai` directory:

```
cd ai
```

2. Activate the Python virtual environment:

```
source venv/bin/activate
```

3. Install dependencies:

```
pip install -r requirements.txt
```

4. Start the FastAPI server with auto-reload:

```
uvicorn app.main:app --reload
```

### Training pipeline

1. Navigate to the `ai` directory:

```
cd ai
```

2. Run the training pipeline script:

```
python app/training_data/training_pipeline.py
```
