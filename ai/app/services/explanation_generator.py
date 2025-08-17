import pandas as pd


def generate_explanation(question: str, results) -> str:
    if not isinstance(results, pd.DataFrame) or results.empty:
        return ""

    explanations = []

    if len(results) == 1:
        row = results.iloc[0]
        _check_and_explain_top_best_query(question, results, explanations, row)
        _analyze_location(results, explanations, row)

    elif len(results) > 1:
        explanations.append(f"Your query returned {len(results)} results.")
        _analyze_ratings(results, explanations)

    return " ".join(explanations) if explanations else ""


def _check_and_explain_top_best_query(question, results, explanations, row):
    if any(word in question.lower() for word in ["top", "best", "highest", "maximum"]):
        if "average_rating" in results.columns:
            rating = row.get("average_rating", "N/A")
            review_count = row.get("review_count", "N/A")
            name = row.get("name", "this item")
            explanations.append(
                f"Based on your query, {name} appears to be the top result with an average rating of {rating} from {review_count} review(s)."
            )


def _analyze_location(results, explanations, row):
    if "city_name" in results.columns and "country_name" in results.columns:
        city = row.get("city_name", "")
        country = row.get("country_name", "")
        if city and country:
            explanations.append(f"This location is situated in {city}, {country}.")


def _analyze_ratings(results, explanations):
    if "average_rating" in results.columns:
        avg_rating = results["average_rating"].mean()
        explanations.append(
            f"The average rating across all results is {avg_rating:.2f}."
        )
