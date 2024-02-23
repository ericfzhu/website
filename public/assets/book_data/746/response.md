A problem where the number of elements in the problem space gets halved each time will most likely be a O(log N) runtime.

# Recursive runtimes
When you have a recursive function that makes multiple calls, the runtime will often look like O(branches^depth)

# Walking Through a Problem


# Optimisation #1: Look for BUD
Bottlenecks: look for areas of the code with high complexity
Unnecessary work
Duplicated work

hash table
hash table
hash table
hash table

# Optimisation #2: DIY
Try working it through intuitively on a real example.
Example: Given a smaller string s and a bigger string b, design an algorithm to find all permutations of the shorter string within the longer one.
s: abbc
b: cbabadcbbabbcbabaabccbabc
By writing down a sufficiently long example like this, we can see that a sliding window approach is a good starting point before any optimisations

# Optimisation #3: Simplify and Generalise
Try simplifying or relaxing some of the constraints of the problem, and solving the easier problem first. You can then build on top of the solution for the simple problem to adapt it for the actual problem at hand.

# Optimisation #4: Base Case and Build
Solve the problem for a base case (e.g. n = 1), and then build up from there. This can often lead to solutions using recursion.

# Optimisation #5: Data Structure Brainstorm
Try running through a list of all the data structures and apply each one. Pretty hacky though


