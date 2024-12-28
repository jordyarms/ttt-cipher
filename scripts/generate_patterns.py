import numpy as np
from itertools import permutations
import json

# Step 1: Generate all permutations of the 3x3 grid with 5 1's and 4 2's
def generate_permutations():
    initial_grid = [0, 0, 0, 0, 0, 1, 1, 1, 1]
    return set(permutations(initial_grid))

# Step 2: Generate all rotational transformations of a grid
def generate_rotations(grid):
    grid = np.array(grid).reshape(3, 3)
    rotations = set()
    for _ in range(4):  # Four rotations (0, 90, 180, 270 degrees)
        rotations.add(tuple(grid.flatten()))  # Flatten grid to a tuple for hashing
        grid = np.rot90(grid)  # Rotate 90 degrees
    return rotations

# Step 3: Find unique patterns by selecting the canonical rotation
def find_unique_patterns(permutations):
    unique_patterns = set()
    for perm in permutations:
        rotations = generate_rotations(perm)
        unique_patterns.add(min(rotations))  # Choose lexicographically smallest rotation
    return unique_patterns

# Step 4: Save patterns to JSON with metadata
def save_patterns_to_json(unique_patterns, output_file="patterns.json"):
    patterns_list = []
    for i, pattern in enumerate(unique_patterns):
        # Reshape the pattern back to 3x3 grid
        pattern_grid = [[int(value) for value in pattern[j:j+3]] for j in range(0, 9, 3)]

        patterns_list.append({
            "id": f"{i+1:03}",
            "pattern": pattern_grid,
        })

    with open(output_file, "w") as f:
        json.dump(patterns_list, f, indent=4)

    print(f"Patterns saved to {output_file}")

# Main function to generate and save patterns
def main():
    print("Generating all permutations...")
    all_permutations = generate_permutations()

    print(f"Total permutations: {len(all_permutations)}")

    print("Finding unique patterns...")
    unique_patterns = find_unique_patterns(all_permutations)

    print(f"Unique patterns count: {len(unique_patterns)}")

    print("Saving patterns to JSON...")
    save_patterns_to_json(unique_patterns, "scripts/generated_patterns.json")

if __name__ == "__main__":
    main()
