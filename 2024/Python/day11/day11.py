import time
start = time.time()

# import importlib.util
# import sys
# import os

# puzzle_input_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'puzzle_input/puzzle_input.py'))
# spec = importlib.util.spec_from_file_location("puzzle_input", puzzle_input_path)
# puzzle_input = importlib.util.module_from_spec(spec)
# sys.modules["puzzle_input"] = puzzle_input
# spec.loader.exec_module(puzzle_input)


# input = puzzle_input.fetch_input(11)

input = '5 89749 6061 43 867 1965860 0 206250'

digits = list(map(int, input.split()))
print(digits)
solution = 0
part2 = 0 

from functools import lru_cache

@lru_cache(maxsize=None)
def split(num):
    num = f"{num}"
    num1 = num[:len(num)//2] 
    num2 = num[len(num)//2:]
    return (int(num1), int(num2))

@lru_cache(maxsize=None)
def blink(stone, n):
    ret = 0
    if n == 1:
        if len(f"{stone}") % 2 == 0:
            ret = 2
        else:
            ret = 1
    elif stone == 0:
        ret = blink(1, n - 1)
    elif len(f"{stone}") % 2 == 0:
        num1, num2 = split(stone)
        ret = blink(int(num1), n - 1) + blink(int(num2), n - 1)
    else:
        ret = blink(2024 * stone, n - 1)
    return ret
    
for i in digits:
    solution += blink(i, 25)
    part2 += blink(i, 75)


print('solution', solution, 'part2', part2)
end = time.time()
print(end - start)