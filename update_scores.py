import os
import shutil
import subprocess
import sys

# Define the name of the virtual environment directory
venv_dir = "py_scoring_venv"

# Placeholder for your script filename; replace with your actual script file
script_file = (
    "./scoring/scoring_to_json.py"  # Replace with the actual filename of your script
)


# Define a function to clean up the virtual environment
def clean_up_venv(directory):
    if os.path.exists(directory):
        shutil.rmtree(directory)
        print(f"Cleaned up virtual environment: {directory}")


# ANSI escape codes for colored output
GREEN = "\033[92m"
RED = "\033[91m"
RESET = "\033[0m"

success = True  # Assume success unless an error occurs

try:
    # Step 1: Create the virtual environment
    print("Creating virtual environment...")
    subprocess.run([sys.executable, "-m", "venv", venv_dir], check=True)

    # Step 2: Install pandas and openpyxl in the virtual environment
    if os.name == "nt":
        # Windows paths
        pip_executable = os.path.join(venv_dir, "Scripts", "pip")
        python_executable = os.path.join(venv_dir, "Scripts", "python")
    else:
        # Unix/Mac paths
        pip_executable = os.path.join(venv_dir, "bin", "pip")
        python_executable = os.path.join(venv_dir, "bin", "python")

    print("Installing required packages...")
    subprocess.run([pip_executable, "install", "pandas", "openpyxl"], check=True)

    # Step 3: Run your existing script using the virtual environment's Python interpreter
    if not os.path.exists(script_file):
        raise FileNotFoundError(f"The script file '{script_file}' does not exist.")

    print(f"Running script: {script_file}")
    subprocess.run(
        [python_executable, script_file, "./scoring/Scoring_Questions new.xlsx"],
        check=True,
    )

except FileNotFoundError as e:
    print(f"{RED}Error: {e}{RESET}")
    success = False
except subprocess.CalledProcessError as e:
    print(f"{RED}An error occurred while running a subprocess: {e}{RESET}")
    success = False
except Exception as e:
    print(f"{RED}An unexpected error occurred: {e}{RESET}")
    success = False
# finally:
#     # Step 4: Clean up by deleting the virtual environment directory
#     print("Cleaning up...")
#     clean_up_venv(venv_dir)

# Print final message
if success:
    print(f"{GREEN}All steps completed successfully!{RESET}")
else:
    print(f"{RED}There were issues during the execution.{RESET}")
