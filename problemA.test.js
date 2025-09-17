const { parseInput, printTotalMiles } = require('./problemA');

// Mock console.log to capture output
function captureConsoleLog(fn) {
  const output = [];
  const originalLog = console.log;
  console.log = (...args) => output.push(args.join(' '));
  try {
    fn();
  } finally {
    console.log = originalLog;
  }
  return output;
}

describe('parseInput', () => {
  it('parses a single data set correctly', () => {
    const input = [
      '3',
      '20 2',
      '30 6',
      '10 7',
      '-1'
    ];
    const result = parseInput(input);
    expect(result).toEqual([
      [
        { speed: 20, time: 2 },
        { speed: 30, time: 6 },
        { speed: 10, time: 7 }
      ]
    ]);
  });

  it('parses multiple data sets', () => {
    const input = [
      '2',
      '60 1',
      '30 5',
      '1',
      '10 2',
      '-1'
    ];
    const result = parseInput(input);
    expect(result).toEqual([
      [
        { speed: 60, time: 1 },
        { speed: 30, time: 5 }
      ],
      [
        { speed: 10, time: 2 }
      ]
    ]);
  });
});

describe('printTotalMiles', () => {
  it('prints correct miles for a single data set', () => {
    const dataSets = [
      [
        { speed: 20, time: 2 },
        { speed: 30, time: 6 },
        { speed: 10, time: 7 }
      ]
    ];
    const output = captureConsoleLog(() => printTotalMiles(dataSets));
    expect(output).toEqual(['170 miles']);
  });

  it('prints correct miles for multiple data sets', () => {
    const dataSets = [
      [
        { speed: 60, time: 1 },
        { speed: 30, time: 5 }
      ],
      [
        { speed: 10, time: 2 }
      ]
    ];
    const output = captureConsoleLog(() => printTotalMiles(dataSets));
    expect(output).toEqual(['180 miles', '20 miles']);
  });
});
