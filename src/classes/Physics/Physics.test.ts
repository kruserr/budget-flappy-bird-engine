import Physics from './Physics';
import Pos from '../Pos/Pos';


test('Physics.ts - constructor()', () => {
  let sut = new Physics(-10, 1);
  expect(sut.getVelocity()).toBe(0);
});

describe('Movement', () => {
  test('Physics.ts - applyGravity()', () => {
    const gravity = 1;
    let sut = new Physics(-10, gravity);
    let collider = new Pos();

    sut.applyGravity(collider);
    expect(sut.getVelocity()).toBe(gravity);
    expect(collider.y).toBe(gravity);
    
    sut.applyGravity(collider);
    expect(sut.getVelocity()).toBe(gravity*2);
    expect(collider.y).toBe(gravity*3);

    collider.y = window.innerHeight;
    sut.applyGravity(collider);
    expect(sut.getVelocity()).toBe(gravity*2);
    expect(collider.y).toBe(window.innerHeight);
  });

  test('Physics.ts - applyJump()', () => {
    const jumpSpeed = -10;
    let sut = new Physics(jumpSpeed, 1);
    let collider = new Pos();

    sut.applyJump(collider);
    expect(sut.getVelocity()).toBe(jumpSpeed);
    expect(collider.y).toBe(jumpSpeed);

    sut.applyJump(collider);
    expect(sut.getVelocity()).toBe(jumpSpeed);
    expect(collider.y).toBe(jumpSpeed*2);
    
    collider.y = -50;
    sut.applyJump(collider);
    expect(sut.getVelocity()).toBe(jumpSpeed);
    expect(collider.y).toBe(collider.y);
  });
});

describe('Collision', () => {
  class MockDomRect implements DOMRect
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
    let objA = new MockDomRect();
    objA.x = 0;
    objA.y = 0;
    objA.width = 1;
    objA.height = 1;

    let objB = new MockDomRect();
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
