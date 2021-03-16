import EventSystem from './EventSystem';


test('EventSystem.js - test events', () => {
  const sut = new EventSystem();
  const handler = jest.fn();

  sut.listen('temp', handler);
  sut.dispatch(new CustomEvent('temp'));
  expect(handler).toBeCalledTimes(1);

  sut.remove('temp', handler);
});
