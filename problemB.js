const readline = require('readline');

/**
 * Captures user input lines from stdin and returns a Promise that resolves to the parsed packet info.
 * @returns {Promise<{packets: Array<{arrival: number, index: number}>}>}
 */

function captureInput() {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false
    });
    let n = null;
    const packets = [];
    rl.on('line', (line) => {
      const trimmed = line.trim();
      if (trimmed === '') return;
      if (n === null) {
        n = parseInt(trimmed, 10);
        if (isNaN(n) || n <= 0) {
          rl.close();
        }
      } else {
        const [arrival, idx] = trimmed.split(/\s+/).map(Number);
        packets.push({ arrival, index: idx });
        if (packets.length === n) {
          rl.close();
        }
      }
    });
    rl.on('close', () => {
      resolve({ packets });
    });
  });
}

/**
 * Calculates the total lag time given the packet arrival info.
 * @param {Array<{arrival: number, index: number}>} packets - Packet arrival info
 * @returns {number} Total lag time
 */
function calculateLagTime(packets) {
  // Map packet index to arrival time
  const n = packets.length;
  const arrivalTime = Array(n + 1);
  for (const { arrival, index } of packets) {
    arrivalTime[index] = arrival;
  }
  let currentTime = 1;
  let totalLag = 0;
  for (let i = 1; i <= n; i++) {
    if (arrivalTime[i] > currentTime) {
      totalLag += arrivalTime[i] - currentTime;
      currentTime = arrivalTime[i] + 1;
    } else {
      currentTime += 1;
    }
  }
  return totalLag;
}

async function main() {
  const { packets } = await captureInput();
  const lag = calculateLagTime(packets);
  console.log(lag);
}

if (require.main === module) {
  main();
}

module.exports = { captureInput, calculateLagTime };
