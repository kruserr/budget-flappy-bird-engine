import AudioSystem, { IAudio } from './AudioSystem';


test('AudioSystem.ts - constructor', () => {
  const sut = new AudioSystem('');
  const sut2 = new AudioSystem('', 10);
});

describe('Functions', () => {
  class MockAudio implements IAudio
  {
    constructor(fileName: string) { }
    play(): void { }
    pause(): void { }
    stop(): void { }
    setFilename(fileName: string): void { }
  }

  test('AudioSystem.ts - play', () => {
    const sut = new MockAudio('');
    sut.play();
  });

  test('AudioSystem.ts - pause', () => {
    const sut = new MockAudio('');
    sut.pause();
  });

  test('AudioSystem.ts - stop', () => {
    const sut = new MockAudio('');
    sut.stop();
  });

  test('AudioSystem.ts - setFilename', () => {
    const sut = new MockAudio('');
    sut.setFilename('');
  });
});
