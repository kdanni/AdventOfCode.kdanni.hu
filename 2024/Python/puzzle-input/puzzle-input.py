#!/usr/bin/env python3

import requests
from dotenv import load_dotenv
import os

load_dotenv()

cookie = os.getenv('PUZZLE_INPUT_COOKIE')

def get_puzzle_input(day):
    headers = {'Cookie': f'session={os.getenv("TOKEN")};'}
    response = requests.get(f'https://adventofcode.com/2024/day/{day}/input', headers=headers)
    if response.status_code == 200:
        return response.text
    else:
        response.raise_for_status()

def main():
    print(get_puzzle_input(1))

if __name__ == "__main__":
    main()