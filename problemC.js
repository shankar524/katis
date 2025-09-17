const readline = require('readline');

function captureInput() {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false
    });
    
    let n = null;
    const inputLines = [];
    
    rl.on('line', (line) => {
      const trimmed = line.trim();
      if (trimmed === '') return;
      
      if (n === null) {
        n = parseInt(trimmed, 10);
        inputLines.push(trimmed);
        if (isNaN(n) || n < 0) {
          rl.close();
        }
      } else {
        inputLines.push(trimmed);
        if (inputLines.length === n + 1) { // n houses + 1 line for count
          rl.close();
        }
      }
    });
    
    rl.on('close', () => {
      resolve(inputLines);
    });
  });
}

function parseInput(lines) {
  const n = parseInt(lines[0], 10);
  const houses = [];

  for (let i = 1; i <= n; i++) {
    const [parent, demand, capacity] = lines[i].split(/\s+/).map(Number);
    houses.push({
      id: i,
      parent: parent,
      demand: demand,
      capacity: capacity
    });
  }

  return { n, houses };
}

function buildTree(n, houses) {
  const children = {};

  for (let i = 0; i <= n; i++) {
    children[i] = [];
  }


  houses.forEach(house => {
    children[house.parent].push(house);
  });

  return { children };
}

/**
 * @param {number} n - Number of houses
 * @param {Array} houses - Array of house objects
 * @param {Object} tree - Tree structure
 * @returns {number} Maximum number of houses that can be powered
 */
function solvePowerDistribution(n, houses, tree) {
  const { children } = tree;

  /**
   * DFS function that returns the maximum houses that can be satisfied
   * in the subtree rooted at 'node', respecting the capacity constraint
   * of the incoming edge to this node.
   * @param {number} node - Current node (0 = generator, 1..n = houses)
   * @param {number} incomingCapacity - Capacity of edge leading to this node
   * @returns {Object} {maxHouses: number, totalDemand: number}
   */
  function dfs(node, incomingCapacity) {
    // Base case: leaf node
    if (children[node].length === 0) {
      if (node === 0) {
        // Generator leaf (no houses)
        return { maxHouses: 0, totalDemand: 0 };
      } else {
        // House leaf - check if we can satisfy it within capacity
        const house = houses[node - 1];
        if (house.demand <= incomingCapacity) {
          return { maxHouses: 1, totalDemand: house.demand };
        } else {
          return { maxHouses: 0, totalDemand: 0 };
        }
      }
    }

    // Recursively get results from all children
    const childResults = [];
    for (const child of children[node]) {
      const result = dfs(child.id, child.capacity);
      childResults.push(result);
    }

    // Sum up all children results
    let totalHousesFromChildren = 0;
    let totalDemandFromChildren = 0;

    for (const result of childResults) {
      totalHousesFromChildren += result.maxHouses;
      totalDemandFromChildren += result.totalDemand;
    }

    // If this is the generator, just return children results
    if (node === 0) {
      return {
        maxHouses: totalHousesFromChildren,
        totalDemand: totalDemandFromChildren
      };
    }

    // If this is a house, we have two options:
    const house = houses[node - 1];

    // Option 1: Don't power this house, just pass through children
    const option1 = {
      maxHouses: totalHousesFromChildren,
      totalDemand: totalDemandFromChildren
    };

    // Option 2: Power this house + children
    const option2 = {
      maxHouses: totalHousesFromChildren + 1,
      totalDemand: totalDemandFromChildren + house.demand
    };

    // Check which options fit within the incoming capacity
    const validOptions = [];

    if (option1.totalDemand <= incomingCapacity) {
      validOptions.push(option1);
    }

    if (option2.totalDemand <= incomingCapacity) {
      validOptions.push(option2);
    }

    // If no valid options, return 0
    if (validOptions.length === 0) {
      return { maxHouses: 0, totalDemand: 0 };
    }

    // Choose the option with maximum houses
    return validOptions.reduce((best, current) =>
      current.maxHouses > best.maxHouses ? current : best
    );
  }

  // Start DFS from generator with infinite capacity
  const result = dfs(0, Number.MAX_SAFE_INTEGER);
  return result.maxHouses;
}


async function main() {
  try {
    const inputLines = await captureInput();
    const { n, houses } = parseInput(inputLines);
    const tree = buildTree(n, houses);
    const result = solvePowerDistribution(n, houses, tree);
    console.log(result);
  } catch (error) {
    console.error('Error:', error);
  }
}

module.exports = {
  captureInput,
  parseInput,
  buildTree,
  solvePowerDistribution
};

if (require.main === module) {
  main();
}
