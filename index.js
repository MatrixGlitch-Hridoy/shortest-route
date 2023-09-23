function createGraph() {
  const nodes = new Set();
  const edges = {};

  function addNode(node) {
    nodes.add(node);
    edges[node] = {};
  }

  function addEdge(node1, node2, weight) {
    edges[node1][node2] = weight;
    edges[node2][node1] = weight; // Assuming bidirectional roads
  }

  function shortestRoute(startNode, endNode) {
    const distances = {};
    const previousNodes = {};
    const priorityQueue = createPriorityQueue();

    for (const node of nodes) {
      distances[node] = node === startNode ? 0 : Infinity;
      priorityQueue.enqueue(node, distances[node]);
    }

    while (!priorityQueue.isEmpty()) {
      const currentNode = priorityQueue.dequeue();

      if (currentNode === endNode) {
        const path = reconstructPath(previousNodes, endNode);
        const shortestDistance = distances[endNode];
        return { path, shortestDistance };
      }

      for (const neighbor in edges[currentNode]) {
        const weight = edges[currentNode][neighbor];
        const tentativeDistance = distances[currentNode] + weight;

        if (tentativeDistance < distances[neighbor]) {
          distances[neighbor] = tentativeDistance;
          previousNodes[neighbor] = currentNode;
          priorityQueue.enqueue(neighbor, tentativeDistance);
        }
      }
    }

    return null; // No path found
  }

  function reconstructPath(previousNodes, endNode) {
    const path = [endNode];
    let currentNode = endNode;

    while (previousNodes[currentNode]) {
      currentNode = previousNodes[currentNode];
      path.unshift(currentNode);
    }

    return path;
  }

  return { addNode, addEdge, shortestRoute };
}

function createPriorityQueue() {
  const values = [];

  function enqueue(val, priority) {
    values.push({ val, priority });
    sort();
  }

  function dequeue() {
    return values.shift().val;
  }

  function isEmpty() {
    return values.length === 0;
  }

  function sort() {
    values.sort((a, b) => a.priority - b.priority);
  }

  return { enqueue, dequeue, isEmpty };
}

// Create a graph
const roadNetwork = createGraph();

// Add nodes (locations)
roadNetwork.addNode("Gulshan");
roadNetwork.addNode("Uttara");
roadNetwork.addNode("Mirpur");
roadNetwork.addNode("Farmgate");
roadNetwork.addNode("Dhanmondi");

// Add edges (roads) with weights (distances)
roadNetwork.addEdge("Gulshan", "Uttara", 10);
roadNetwork.addEdge("Gulshan", "Mirpur", 15);
roadNetwork.addEdge("Uttara", "Farmgate", 12);
roadNetwork.addEdge("Mirpur", "Farmgate", 8);
roadNetwork.addEdge("Farmgate", "Dhanmondi", 5);

// Find the shortest route and distance
const { path, shortestDistance } = roadNetwork.shortestRoute(
  "Gulshan",
  "Dhanmondi"
);

console.log(`Shortest Route: ${path.join(" -> ")}`);
console.log(`Shortest Distance: ${shortestDistance} km`);
