import importlib.util
import sys
import os

puzzle_input_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'puzzle_input/puzzle_input.py'))
spec = importlib.util.spec_from_file_location("puzzle_input", puzzle_input_path)
puzzle_input = importlib.util.module_from_spec(spec)
sys.modules["puzzle_input"] = puzzle_input
spec.loader.exec_module(puzzle_input)


input = puzzle_input.fetch_input(11)

digits = list(map(int, input.split()))
print(digits)
solution = 0
part2 = 0 

from functools import lru_cache

@lru_cache(maxsize=None)
def blink(num):
    if num == 0:
        return [1]
    elif len(f"{num}") % 2 == 0:
        num = f"{num}"
        num1 = num[:len(num)//2] 
        num2 = num[len(num)//2:]
        return [int(num1),int(num2)]
    return [2024 * num]
    
row = digits[:]
for _ in range(75):
    print(f"iteration {_}")
    row = [x for num in row for x in blink(num)]
    if(_ == 24):
        solution = len(row)
        print('solution', solution)
    if(_ == 74):
        part2 = len(row)


print('solution', solution, 'part2', part2)