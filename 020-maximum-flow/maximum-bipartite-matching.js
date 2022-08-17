// Maximum Bipartite Matching Problem

// Bipartite graph - Graph in which the vertex set can be partitioned into V = L U  R, where L and R are disjoint and all the edges in E
// go between L and R

// A matching in a Bipartite Graph is a set of the edges chosen in such a way that no two edges share an endpoint.
// A maximum matching is a matching of maximum size (maximum number of edges).
// In a maximum matching, if any edge is added to it, it is no longer a matching.
// There can be more than one maximum matchings for a given Bipartite Graph.

// Maximum Bipartite Matching (MBP) problem can be solved by converting it into a flow network
// There must be a source and sink in a flow network. So we add a source and add edges from source to all applicants.
// Similarly, add edges from all jobs to sink. The capacity of every edge is marked as 1 unit.
// G` = (V`, E`) => V` = V U { s, t } and E` = {(s,u) : u ⍷ L} U {(u,v) : (u,v) ⍷ E} U {(v,t): v ⍷ R}
// Use Ford-Fulkerson method to compute flow of network which will be maximum matching of bipartite graph

// Complexity - O(VE)
// To complete costruction, we assign unit capacity to each edge in E`. Since each vertex in V has at least one incident edge, |E| >= |V|/2.
// Thus, |E| <= |E`| = |E| + |V| <= 3|E|, and so |E`| = O(E)