import AudioSystem from './AudioSystem';


test('AudioSystem.ts - constructor', () => {
  const sut = new AudioSystem('');
  const sut2 = new AudioSystem('', 10);
});
