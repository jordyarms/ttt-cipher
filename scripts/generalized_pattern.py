import numpy as np
from itertools import permutations

def generate_permutations(x, k):
    """
    Generate all permutations of an x^2 grid with k items of type 1 and (x^2 - k) items of type 0.
    
    Parameters:
        x (int): Dimension of the grid (e.g., 3 for 3x3).
        k (int): Number of type 1 items.
    
    Returns:
        set: All unique permutations of the grid as tuples.
    """
    n = x**2
    initial_grid = [1] * k + [0] * (n - k)
    return set(permutations(initial_grid))

def generate_rotations(grid, x):
    """
    Generate all rotational transformations of an x^2 grid.
    
    Parameters:
        grid (tuple): The grid as a flat tuple.
        x (int): Dimension of the grid.
    
    Returns:
        set: All rotational variants of the grid.
    """
    grid = np.array(grid).reshape(x, x)
    rotations = set()
    for _ in range(4):  # Four rotations (0, 90, 180, 270 degrees)
        rotations.add(tuple(grid.flatten()))  # Flatten grid to a tuple for hashing
        grid = np.rot90(grid)  # Rotate 90 degrees
    return rotations

def find_unique_patterns(permutations, x):
    """
    Find unique patterns by selecting the canonical rotation for each grid.
    
    Parameters:
        permutations (set): All grid permutations.
        x (int): Dimension of the grid.
    
    Returns:
        set: Unique patterns as tuples.
    """
    unique_patterns = set()
    for perm in permutations:
        rotations = generate_rotations(perm, x)
        unique_patterns.add(min(rotations))  # Choose lexicographically smallest rotation
    return unique_patterns

def main(x, k):
    """
    Main function to generate unique patterns for an x^2 grid and k type 1 items.
    
    Parameters:
        x (int): Dimension of the grid.
        k (int): Number of type 1 items.
    
    Returns:
        None
    """
    print(f"Generating all permutations for a {x}x{x} grid with {k} type 1 items...")
    all_permutations = generate_permutations(x, k)
    print(f"Total permutations: {len(all_permutations)}")

    print("Finding unique patterns...")
    unique_patterns = find_unique_patterns(all_permutations, x)
    print(f"Unique patterns count: {len(unique_patterns)}")

    return unique_patterns

# Example Usage
if __name__ == "__main__":
    x = 3  # Grid size (3x3)
    k = 5  # Number of type 1 items
    unique_patterns = main(x, k)