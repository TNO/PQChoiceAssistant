import argparse
import json
import os
import sys

import pandas as pd

# Constants
DEFAULT_XLSX_FILE = "Scoring_Questions new.xlsx"  # Default source of the scores
JS_FILE = "questions.js"
DEFAULT_OUTPUT_DIR = "."  # Current directory

# NOTE: End row and algorithm columns are hardcoded but should align with the Excel structure.
END_ROW = 100
START_ALGORITHMS = {"kem": 5, "dss": 11}  # Adjusted based on observed columns
END_ALGORITHMS = {"kem": 11, "dss": 15}  # Adjusted based on observed columns


def choose_option(text, mode):
    if not isinstance(text, str) or not text:
        return "ntb"
    text = text.split()
    for idx, word in enumerate(text):
        if "/" in word:
            pos = word.index("/")
            if mode == "kem":
                text[idx] = word[:pos]
            elif mode == "dss":
                text[idx] = word[pos + 1 :]
    return " ".join(text)


def conversion(mode, xlsx_file, output_dir):
    # Read the "Scoring" sheet
    try:
        df = pd.read_excel(xlsx_file, sheet_name="Scoring", engine="openpyxl")
    except FileNotFoundError:
        print(f"Error: The file '{xlsx_file}' was not found.")
        sys.exit(1)
    except Exception as e:
        print(f"Error reading Excel file: {e}")
        sys.exit(1)

    df = df.iloc[:END_ROW]
    categories = []
    questions = []
    current_category = None
    current_question = None

    for _, row in df.iterrows():
        if not pd.isna(row["Question description"]):  # Check for question description

            if current_question:
                questions.append(current_question)

            # Extract question details
            question_text_en = choose_option(row.get("Unnamed: 4", ""), mode)
            question_text_nl = choose_option(row.get("Vraag (NL)", ""), mode)
            description_text_en = choose_option(
                row.get("Question description", ""), mode
            )
            description_text_nl = choose_option(row.get("Beschrijving (NL)", ""), mode)
            current_question = {
                "question": {"NL": question_text_nl, "EN": question_text_en},
                "expert_level": row.get("Expert question") == "Yes",
                "custom_scoring": (
                    row.get("Custom scoring")
                    if not pd.isna(row["Custom scoring"])
                    else None
                ),
                "description": {"NL": description_text_nl, "EN": description_text_en},
                "max_selectable_answers": (
                    int(row["Selectable answers"])
                    if not pd.isna(row.get("Selectable answers"))
                    else 1
                ),
                "scoring_question": row.get("Scoring question") != "No",
                "answers": [],
            }

            # Skip DSS-specific questions in KEM mode
            if (
                mode == "kem"
                and isinstance(row.get("Notes"), str)
                and "DSS only" in row["Notes"]
            ):
                current_question = None

            # Detect new category
            if not pd.isna(row.get("Unnamed: 0")):
                if questions:
                    categories.append(
                        {"category": current_category, "content": questions}
                    )
                current_category = {
                    "EN": row["Unnamed: 0"].split(" - ")[-1],
                    "NL": row.get("Categorie (NL)", ""),
                }
                questions = []

        else:
            # Parse answers for the current question
            if current_question:
                scores = {
                    col: row[col]
                    for col in df.columns[START_ALGORITHMS[mode] : END_ALGORITHMS[mode]]
                    if not pd.isna(row[col])
                }

                current_question["answers"].append(
                    {
                        "text": {
                            "NL": row.get("Vraag (NL)", ""),
                            "EN": row.get("Unnamed: 4", ""),
                        },
                        "scores": scores,
                        "error_message": {
                            "NL": (
                                row.get(f"Foutmelding {mode.upper()} (NL)")
                                if not pd.isna(row[f"Foutmelding {mode.upper()} (NL)"])
                                else None
                            ),
                            "EN": (
                                row.get(f"Error message {mode.upper()}")
                                if not pd.isna(row[f"Error message {mode.upper()}"])
                                else None
                            ),
                        },
                    }
                )

    # Add remaining questions and categories
    if current_question:
        questions.append(current_question)
    if questions:
        categories.append({"category": current_category, "content": questions})

    # Generate JSON and write to file
    json_data = json.dumps(categories, indent=4, ensure_ascii=False)
    js_data = f"export const questions = {json_data};"

    output_file = os.path.join(output_dir, f"{mode}-{JS_FILE}")
    try:
        with open(output_file, "w", encoding="utf-8") as file:
            file.write(js_data)
        print(f"Successfully wrote to {output_file}")
    except Exception as e:
        print(f"Error writing to file '{output_file}': {e}")
        sys.exit(1)


def main():
    parser = argparse.ArgumentParser(
        description="Convert Excel scoring questions to JavaScript format."
    )
    parser.add_argument(
        "xlsx_file",
        nargs="?",
        default=DEFAULT_XLSX_FILE,
        help=f"Path to the Excel file (default: '{DEFAULT_XLSX_FILE}')",
    )
    args = parser.parse_args()

    xlsx_file = args.xlsx_file

    # Determine if a custom file path was provided
    is_custom = os.path.abspath(xlsx_file) != os.path.abspath(DEFAULT_XLSX_FILE)

    # Set output directory
    if is_custom:
        # Derive base filename without extension
        base_filename = os.path.splitext(os.path.basename(xlsx_file))[0]
        output_dir = os.path.join(".", "src", "js", "json")

        # Create the output directory if it doesn't exist
        os.makedirs(output_dir, exist_ok=True)
        print(f"Using custom Excel file: {xlsx_file}")
        print(f"Output directory set to: {output_dir}")
    else:
        output_dir = DEFAULT_OUTPUT_DIR
        print(f"Using default Excel file: {xlsx_file}")
        print(f"Output directory set to: {output_dir}")

    # Run conversion for both modes
    conversion("kem", xlsx_file, output_dir)
    conversion("dss", xlsx_file, output_dir)
    print("Done")


if __name__ == "__main__":
    main()
