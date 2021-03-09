import Physics from './Physics';


test('Physics.ts - constructor()', () => {
  let sut = new Physics(-10, 1);
  expect(sut.getVelocity()).toBe(0);
});

describe('test collision', () => {
  class DummyDomRect implements DOMRect
  {
    height: number;
    width: number;
    x: number;
    y: number;
    bottom: number;
    left: number;
    right: number;
    top: number;
    toJSON() {
      throw new Error('Method not implemented.');
    }
  };

  test('Physics.ts - AxisAlignedBoundingBox()', () => {
    let objA = new DummyDomRect();
    objA.x = 0;
    objA.y = 0;
    objA.width = 1;
    objA.height = 1;

    let objB = new DummyDomRect();
    objB.x = 0;
    objB.y = 0;
    objB.width = 1;
    objB.height = 1;

    expect(Physics.AxisAlignedBoundingBox(objA, objA)).toBe(true);
    expect(Physics.AxisAlignedBoundingBox(objB, objB)).toBe(true);
    expect(Physics.AxisAlignedBoundingBox(objA, objB)).toBe(true);
    expect(Physics.AxisAlignedBoundingBox(objB, objA)).toBe(true);
    
    objA.x = 2;
    objA.y = 2;
    expect(Physics.AxisAlignedBoundingBox(objA, objB)).toBe(false);
    
    objB.x = 2;
    objB.y = 2;
    expect(Physics.AxisAlignedBoundingBox(objA, objB)).toBe(true);

    objA.width = 0;
    objA.height = 0;
    expect(Physics.AxisAlignedBoundingBox(objA, objB)).toBe(false);

    objA.width = 1;
    objA.height = 0;
    expect(Physics.AxisAlignedBoundingBox(objA, objB)).toBe(false);

    objA.width = 0;
    objA.height = 1;
    expect(Physics.AxisAlignedBoundingBox(objA, objB)).toBe(false);

    objA.width = 1;
    objA.height = 1;
    expect(Physics.AxisAlignedBoundingBox(objA, objB)).toBe(true);
  });
});
