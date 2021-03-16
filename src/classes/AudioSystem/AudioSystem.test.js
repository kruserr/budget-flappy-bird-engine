import AudioSystem from './AudioSystem';


test('AudioSystem.ts - play audio', () => {
  const sut = new AudioSystem('');

  window.HTMLMediaElement.prototype.load = () => { /* do nothing */ };
  window.HTMLMediaElement.prototype.play = () => { /* do nothing */ };
  window.HTMLMediaElement.prototype.pause = () => { /* do nothing */ };
  window.HTMLMediaElement.prototype.addTextTrack = () => { /* do nothing */ };

  sut.play();
  sut.stop();
});
