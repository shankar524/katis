const {
  parseInput,
  buildTree,
  solvePowerDistribution,
} = require('./problemC');

/**
 * Test the sample input from the problem description
 */
function testSampleInput() {
  const inputLines = [
    '3',
    '0 3 2',
    '0 100 100',
    '1 1 1'
  ];
  
  console.log('Testing sample input:');
  console.log(inputLines.join('\n'));
  console.log();
  
  const { n, houses } = parseInput(inputLines);
  console.log('Parsed houses:', houses);
  console.log();
  
  const tree = buildTree(n, houses);
  console.log('Tree structure (children):', tree.children);
  console.log();
  
  const result = solvePowerDistribution(n, houses, tree);
  console.log('Result:', result);
  console.log('Expected: 2');
  console.log('Match:', result === 2 ? '✓' : '✗');
}

/**
 * Test edge cases
 */
function testEdgeCases() {
  console.log('\n--- Testing Edge Cases ---');
  
  // Test single house
  const singleHouseInput = [
    '1',
    '0 5 10'
  ];
  
  const { n: n1, houses: houses1 } = parseInput(singleHouseInput);
  const tree1 = buildTree(n1, houses1);
  const result1 = solvePowerDistribution(n1, houses1, tree1);
  console.log('Single house test:', result1, '(expected: 1)');
  
  // Test house with demand > capacity
  const impossibleInput = [
    '1',
    '0 10 5'
  ];
  
  const { n: n2, houses: houses2 } = parseInput(impossibleInput);
  const tree2 = buildTree(n2, houses2);
  const result2 = solvePowerDistribution(n2, houses2, tree2);
  console.log('Impossible house test:', result2, '(expected: 0)');
}

// Run all tests
testSampleInput();
testEdgeCases();
