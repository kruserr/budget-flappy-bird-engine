import Pos from './Pos';


test('Pos.ts - constructor()', () => {
  let sut = new Pos();
  expect(sut.x).toBe(0);
  expect(sut.y).toBe(0);

  sut = new Pos({
    x: 1,
    y: 1,
  });
  expect(sut.x).toBe(1);
  expect(sut.y).toBe(1);
});
