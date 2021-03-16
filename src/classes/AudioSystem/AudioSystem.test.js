import AudioSystem from './AudioSystem';


test('AudioSystem.ts - play audio', () => {
  const sut = new AudioSystem('');

  window.HTMLMediaElement.prototype.load = () => { };
  window.HTMLMediaElement.prototype.play = () => { };
  window.HTMLMediaElement.prototype.pause = () => { };
  window.HTMLMediaElement.prototype.addTextTrack = () => { };

  sut.play();
  sut.stop();
});
