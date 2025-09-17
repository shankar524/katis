const readline = require('readline');

/**
 * Parses the input lines into structured data sets.
 * @param {string[]} lines - The input lines from stdin.
 * @returns {Array<Array<{speed: number, time: number}>>} - Array of data sets.
 */
function parseInput(lines) {
  const dataSets = [];
  let idx = 0;
  while (idx < lines.length) {
    const n = parseInt(lines[idx++], 10);
    if (n === -1) break;
    const entries = [];
    for (let i = 0; i < n; i++) {
      const [speed, time] = lines[idx++].split(/\s+/).map(Number);
      entries.push({ speed, time });
    }
    dataSets.push(entries);
  }
  return dataSets;
}

function printTotalMiles(dataSets) {
  dataSets.forEach((entries) => {
    let totalDistance = 0;
    let prevTime = 0;
    for (const { speed, time } of entries) {
      totalDistance += speed * (time - prevTime);
      prevTime = time;
    }
    console.log(`${totalDistance} miles`);
  });
}


function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });

  const inputLines = [];

  rl.on('line', (line) => {
    const trimmed = line.trim();
    if (trimmed) inputLines.push(trimmed);
    if (trimmed === '-1') {
      rl.close();
    }
  });

  rl.on('close', () => {
    const dataSets = parseInput(inputLines);
    printTotalMiles(dataSets);
  });
}
module.exports = { parseInput, printTotalMiles };

if (require.main === module) {
  main();
}