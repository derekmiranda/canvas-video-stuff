import { createEmptyImgData } from './src/functions';
import { mapPlaneToSphere, createSphereMappingFunc } from './src/math-lib';

const WIDTH = 100;
const HEIGHT = 100;

describe('Mapping function', () => {
  function testPoint(i, j) {
    const { x, y } = mapPlaneToSphere({
      i,
      j,
      width: WIDTH,
      height: HEIGHT
    });

    it(`should keep these points (${i}, ${j}) the same`, () => {
      expect(x).toBe(i);
      expect(y).toBe(j);
    });
  }

  testPoint(0, 0);
  testPoint(WIDTH / 2, HEIGHT / 2);
  testPoint(WIDTH - 1, HEIGHT - 1);
  testPoint(WIDTH / 2, 0);
  testPoint(WIDTH - 1, HEIGHT / 2);

  it('maps plane coordinates to angles', () => {
    const mapIToAngle = createSphereMappingFunc({
      lenMin: 0,
      lenMax: 100,
      angleMin: -Math.PI / 2,
      angleMax: Math.PI / 2
    });
    expect(mapIToAngle(0)).toBe(-Math.PI / 2);
    expect(mapIToAngle(50)).toBe(0);
    expect(mapIToAngle(100)).toBe(Math.PI / 2);
  });
});
