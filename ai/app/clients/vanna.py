from vanna.chromadb import ChromaDB_VectorStore
from vanna.google import GoogleGeminiChat
import yaml
import os
from app.config import (
    GEMINI_API_KEY,
    PG_HOST,
    PG_DATABASE,
    PG_USER,
    PG_PASSWORD,
    PG_PORT,
)


class VannaClient(ChromaDB_VectorStore, GoogleGeminiChat):
    def __init__(self, config_dict=None):
        chroma_path = self._get_chroma_path()
        chroma_config = {"path": chroma_path}
        gemini_config = {
            "api_key": GEMINI_API_KEY,
            "model_name": "gemini-1.5-flash",
        }
        ChromaDB_VectorStore.__init__(self, config=chroma_config)
        GoogleGeminiChat.__init__(self, config=gemini_config)
        self.is_trained = (
            self._check_if_trained()
        )  # da se zna jel strenirano vec ili jos ne
        self._connect_to_database()

    def _check_if_trained(self):
        try:
            chroma_path = self._get_chroma_path()
            sqlite_file = os.path.join(chroma_path, "chroma.sqlite3")
            if os.path.exists(sqlite_file):
                file_size = os.path.getsize(sqlite_file)
                if file_size > 8192:  # ChromaDB creates ~8KB minimum file
                    return True
            print("No existing trained data found or file empty!")
            return False
        except Exception as e:
            print(f"Error checking trained model: {e}")
            return False

    def _get_chroma_path(self):
        # Get current file location: ai/app/clients/
        clients_dir = os.path.dirname(os.path.abspath(__file__))
        # Go up one level to app directory: ai/app/
        app_dir = os.path.dirname(clients_dir)
        # Navigate to training_data folder: ai/app/training_data/
        training_data_dir = os.path.join(app_dir, "training_data")
        # Final path for ChromaDB storage: ai/app/training_data/chroma_data/
        chroma_path = os.path.join(training_data_dir, "chroma_data")
        os.makedirs(chroma_path, exist_ok=True)
        return chroma_path

    def _connect_to_database(self):
        try:
            self.connect_to_postgres(
                host=PG_HOST,
                dbname=PG_DATABASE or "",
                user=PG_USER or "",
                password=PG_PASSWORD or "",
                port=(
                    int(PG_PORT)
                    if "PG_PORT" in globals() and PG_PORT is not None
                    else 5432
                ),
            )
        except Exception as e:
            print(f"Database connection failed: {e}")

    def train_from_files(self):
        print("Starting training pipeline...")
        self._train_on_dll()
        self._train_on_documentation()
        self._train_on_qa()
        self.is_trained = True
        print("Training pipeline completed!")

    def _train_on_dll(self):
        ddl_file_path = "app/training_sources/ddl.sql"  # gleda se s pozicije otkud se poziva komanda za treniranje
        if os.path.exists(ddl_file_path):
            print("Training on DDL...")
            with open(ddl_file_path, "r") as f:
                ddl_content = f.read()
            self.train(ddl=ddl_content)
        else:
            print(f"DDL file not found: {ddl_file_path}")

    def _train_on_documentation(self):
        docs_file_path = "app/training_sources/docs.txt"
        if os.path.exists(docs_file_path):
            print("Training on documentation...")
            with open(docs_file_path, "r") as f:
                docs_content = f.read()
            self.train(documentation=docs_content)
        else:
            print(f"Documentation file not found: {docs_file_path}")

    def _train_on_qa(self):
        qa_file_path = "app/training_sources/qa.yaml"
        if os.path.exists(qa_file_path):
            print("Training on Q&A pairs...")
            with open(qa_file_path, "r") as f:
                qa_data = yaml.safe_load(f)
            question_num = 0
            for item in qa_data.get("qa_pairs", []):
                question = item.get("question")
                sql = item.get("sql")
                if question and sql:
                    question_num += 1
                    self.train(question=question, sql=sql)
                    print(f"Q{question_num}: {question}")
        else:
            print(f"Q&A file not found: {qa_file_path}")

    def ask_question(self, question: str) -> dict:
        if not self.is_trained:
            return {
                "question": question,
                "error": "Model not trained yet. Run training pipeline first.",
                "success": False,
            }
        try:
            sql = self.generate_sql(question)
            results = None
            if hasattr(self, "run_sql"):
                try:
                    results = self.run_sql(sql)
                    print("results", results.to_string())
                except Exception as e:
                    results = f"SQL execution error: {str(e)}"

            return {
                "question": question,
                "sql": sql,
                "results": (
                    results
                    if results is not None
                    else "Database not connected - SQL generated only"
                ),
                "success": True,
            }
        except Exception as e:
            return {"question": question, "error": str(e), "success": False}


_vanna_client_instance = None


def get_vanna_client():
    global _vanna_client_instance
    if _vanna_client_instance is None:
        _vanna_client_instance = VannaClient()
    return _vanna_client_instance
