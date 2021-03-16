import Time from './Time';


test('Time.js - test', () => {
  const sut = new Time;

  expect(sut.getTimeScale()).toBe(1);
  
  sut.start()
  expect(sut.getTimeScale()).toBe(1);

  sut.stop()
  expect(sut.getTimeScale()).toBe(0);

  sut.setTimeScale(2)
  expect(sut.getTimeScale()).toBe(2);
});
