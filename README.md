# 2048-SolverJS

An implementation of various strategies to solve 2048 game.
Algorithms used:
- Greedy
- Expectimax with iterative deepening
- MonteCarlo Tree Search
- Q Learning

Heuristics Used:
- Monotonicity of the grid (Higher the better)
- Number of empty cells (Lower the better)
- Max tile value (Higher the better)
- Smoothness: Pairwise difference between the tiles. (Lower the better)
