import pandas as pd
import json
from app.services.explanation_generator import generate_explanation


def format_vanna_response(vanna_response: dict) -> str:
    question = vanna_response.get("question", "")
    sql = vanna_response.get("sql", "")
    results = vanna_response.get("results", "")
    error = vanna_response.get("error", "")

    if error:
        return f"Sorry, I encountered an error processing your question: {error}"

    response_parts = []

    if question:
        response_parts.append(f"**Question:** {question}")

    if sql:
        response_parts.append(f"**Generated SQL:**\n```sql\n{sql}\n```")

    if results is not None:
        if isinstance(results, pd.DataFrame):
            _handle_dataframe_result(results, response_parts)
        elif isinstance(results, str):
            _handle_string_result(results, response_parts)
        elif isinstance(results, list):
            _handle_list_result(results, response_parts)
        else:
            _handle_other_result_type(results, response_parts)

    _append_textual_explanation(question, results, response_parts)

    if not response_parts or len(response_parts) <= 2:
        response_parts.append(
            "I was able to process your question, but no results were returned."
        )

    return "\n\n".join(response_parts)


def _handle_dataframe_result(results, response_parts):
    if results.empty:
        response_parts.append("**Query Result:** No data found matching your criteria.")
    else:
        response_parts.append(f"**Query Results:** Found {len(results)} record(s)")

        if len(results) == 1:
            _display_single_as_bulletpoints(results, response_parts)
        else:
            _display_multi_as_table(results, response_parts)


def _handle_string_result(results, response_parts):
    if "error" in results.lower():
        response_parts.append(f"**Query Result:** {results}")
    else:
        response_parts.append(f"**Database Response:** {results}")


def _handle_list_result(results, response_parts):
    if len(results) == 0:
        response_parts.append("**Query Result:** No data found matching your criteria.")
    else:
        response_parts.append(f"**Query Results:** Found {len(results)} record(s)")
        response_parts.append(f"```json\n{json.dumps(results[:10], indent=2)}\n```")
        if len(results) > 10:
            response_parts.append(f"*(Showing first 10 of {len(results)} results)*")


def _handle_other_result_type(results, response_parts):
    response_parts.append(
        f"**Query Result:**\n```json\n{json.dumps(results, indent=2, default=str)}\n```"
    )


def _append_textual_explanation(question, results, response_parts):
    if results is not None and isinstance(results, pd.DataFrame) and not results.empty:
        explanation = generate_explanation(question, results)
        if explanation:
            response_parts.append(f"**Analysis:** {explanation}")


def _display_multi_as_table(results, response_parts):
    response_parts.append("**Results:**")
    table_str = results.to_string(index=False, max_cols=None)
    response_parts.append(f"```\n{table_str}\n```")
    if len(results) > 10:
        response_parts.append(f"*(Showing first 10 of {len(results)} results)*")


def _display_single_as_bulletpoints(results, response_parts):
    response_parts.append("**Record Details:**")
    for column, value in results.iloc[0].items():
        display_name = str(column).replace("_", " ").title()
        response_parts.append(f"• **{display_name}:** {value}")
