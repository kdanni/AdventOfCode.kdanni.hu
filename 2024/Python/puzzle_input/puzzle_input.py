import requests
import os
import datetime
from dotenv import load_dotenv

def fetch_data(url, headers=None):
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()  # Raise an exception for HTTP errors
        return response.text
    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")
        return None

def fetch_input(day):
    current_dir = os.path.dirname(os.path.abspath(__file__))
    dotenv_path = os.path.join(current_dir, '.env')
    load_dotenv(dotenv_path)

    url = f'https://adventofcode.com/2024/day/{day}/input'
    headers = {
        'Cookie': f"session={os.getenv('TOKEN')};"
    }
    return fetch_data(url, headers)



if __name__ == "__main__":
    # # Get the current file's directory
    # current_dir = os.path.dirname(os.path.abspath(__file__))
    # # Construct the path to the .env file
    # dotenv_path = os.path.join(current_dir, '.env')
    # # Load the .env file
    # load_dotenv(dotenv_path)

    day = datetime.datetime.now().day  # Get the current day of the month
    data = fetch_input(day)
    if data:
        print(data)