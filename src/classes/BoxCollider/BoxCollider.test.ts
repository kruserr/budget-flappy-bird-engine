import BoxCollider from './BoxCollider';


test('BoxCollider.ts - constructor()', () => {
  let sut = new BoxCollider();
  expect(sut.x).toBe(0);
  expect(sut.y).toBe(0);
  expect(sut.width).toBe(0);
  expect(sut.height).toBe(0);

  sut = new BoxCollider({
    x: 1,
    y: 1,
    width: 1,
    height: 1
  });
  expect(sut.x).toBe(1);
  expect(sut.y).toBe(1);
  expect(sut.width).toBe(1);
  expect(sut.height).toBe(1);
});

test('BoxCollider.ts - collideCheck()', () => {
  let sut = new BoxCollider({
    x: 0,
    y: 0,
    width: 1,
    height: 1
  });
  let sutOther = new BoxCollider({
    x: 0,
    y: 0,
    width: 1,
    height: 1
  });
  expect(sut.collideCheck(sutOther)).toBe(true);
  
  sut.x = 2;
  sut.y = 2;
  expect(sut.collideCheck(sutOther)).toBe(false);
  
  sutOther.x = 2;
  sutOther.y = 2;
  expect(sut.collideCheck(sutOther)).toBe(true);

  sut.width = 0;
  sut.height = 0;
  expect(sut.collideCheck(sutOther)).toBe(false);

  sut.width = 1;
  sut.height = 0;
  expect(sut.collideCheck(sutOther)).toBe(false);

  sut.width = 0;
  sut.height = 1;
  expect(sut.collideCheck(sutOther)).toBe(false);

  sut.width = 1;
  sut.height = 1;
  expect(sut.collideCheck(sutOther)).toBe(true);
});
