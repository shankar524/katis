const { calculateLagTime } = require('./problemB');

describe('calculateLagTime', () => {
  it('returns 0 for perfect stream (no lag)', () => {
    const packets = [
      { arrival: 1, index: 1 },
      { arrival: 2, index: 2 },
      { arrival: 3, index: 3 }
    ];
    expect(calculateLagTime(packets)).toBe(0);
  });

  it('returns correct lag for sample input 1', () => {
    // Sample input from problem description
    const packets = [
      { arrival: 1, index: 1 },
      { arrival: 3, index: 2 },
      { arrival: 4, index: 5 },
      { arrival: 4, index: 3 },
      { arrival: 5, index: 4 }
    ];
    expect(calculateLagTime(packets)).toBe(1);
  });

  it('handles all packets arriving late', () => {
    const packets = [
      { arrival: 5, index: 1 },
      { arrival: 6, index: 2 },
      { arrival: 7, index: 3 }
    ];
    expect(calculateLagTime(packets)).toBe(4);
  });

  it('handles packets arriving out of order', () => {
    const packets2 = [
      { arrival: 1, index: 1 },
      { arrival: 3, index: 2 },
      { arrival: 4, index: 5 },
      { arrival: 4, index: 3 },
      { arrival: 5, index: 4 }
    ];
    expect(calculateLagTime(packets2)).toBe(1);

    const packets3 = [
      { arrival: 1, index: 1 },
      { arrival: 3, index: 3 },
      { arrival: 4, index: 2 },
      { arrival: 8, index: 4 }
    ];
    expect(calculateLagTime(packets3)).toBe(4);
  });

  it('handles single packet', () => {
    const packets = [
      { arrival: 10, index: 1 }
    ];
    expect(calculateLagTime(packets)).toBe(9);
  });
});
