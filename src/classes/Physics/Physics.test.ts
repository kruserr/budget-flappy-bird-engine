import Physics from './Physics';


test('Physics.ts - constructor()', () => {
  let sut = new Physics(-10, 1);
  expect(sut.getVelocity).toBe(0);
});

test('Physics.ts - AxisAlignedBoundingBox()', () => {
  let objA = new Pos({
    x: 0,
    y: 0,
  });
  let objB = new Pos({
    x: 0,
    y: 0,
  });
  expect(objA.collideCheck(objB)).toBe(true);
  
  objA.x = 2;
  objA.y = 2;
  expect(objA.collideCheck(objB)).toBe(false);
  
  objB.x = 2;
  objB.y = 2;
  expect(objA.collideCheck(objB)).toBe(true);

  objA.width = 0;
  objA.height = 0;
  expect(objA.collideCheck(objB)).toBe(false);

  objA.width = 1;
  objA.height = 0;
  expect(objA.collideCheck(objB)).toBe(false);

  objA.width = 0;
  objA.height = 1;
  expect(objA.collideCheck(objB)).toBe(false);

  objA.width = 1;
  objA.height = 1;
  expect(objA.collideCheck(objB)).toBe(true);
});
