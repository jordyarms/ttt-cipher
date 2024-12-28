import numpy as np
from itertools import permutations

def generate_permutations(x, k):
    n = x**2
    initial_grid = [1] * k + [0] * (n - k)
    return set(permutations(initial_grid))

def generate_rotations(grid, x):
    grid = np.array(grid).reshape(x, x)
    rotations = set()
    for _ in range(4):
        rotations.add(tuple(grid.flatten()))
        grid = np.rot90(grid)
    return rotations

def find_unique_patterns(permutations, x):
    unique_patterns = set()
    for perm in permutations:
        rotations = generate_rotations(perm, x)
        unique_patterns.add(min(rotations))
    return unique_patterns

def main(x, k):
    print(f"Generating all permutations for a {x}x{x} grid with {k} type 1 items...")
    all_permutations = generate_permutations(x, k)
    print(f"Total permutations: {len(all_permutations)}")

    print("Finding unique patterns...")
    unique_patterns = find_unique_patterns(all_permutations, x)
    print(f"Unique patterns count: {len(unique_patterns)}")
    print(f"{unique_patterns}")

    return unique_patterns

# Example Usage
if __name__ == "__main__":
    x = 3  # Grid size (3x3)
    k = 5  # Number of type 1 items
    unique_patterns = main(x, k)