import { fireEvent } from '@testing-library/react';
import Engine from '../Engine/Engine';


test('Input.js - playerInput pointerdown', () => {
  const handler = jest.fn();

  Engine.getEvent().listen('playerInput', handler);

  fireEvent.pointerDown(document);

  expect(handler).toBeCalledTimes(1);
});

test('Input.js - playerInput keydown', () => {
  const handler = jest.fn();

  Engine.getEvent().listen('playerInput', handler);

  fireEvent.keyDown(document, {key: ' '});
  fireEvent.keyDown(document, {key: ' '});
  fireEvent.keyDown(document, {key: ''});
  
  expect(handler).toBeCalledTimes(1);
  
  fireEvent.keyUp(document, {key: ' '});
  fireEvent.keyUp(document, {key: ''});

  fireEvent.keyDown(document, {key: ' '});
  fireEvent.keyDown(document, {key: ' '});

  expect(handler).toBeCalledTimes(2);
});
