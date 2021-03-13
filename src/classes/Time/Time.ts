export interface ITime
{
  start: () => void;
  stop: () => void;
  setTimeScale: (timeScale: number) => void;
  getTimeScale: () => number;
}

export default class Time implements ITime
{
  private timeScale = 1;

  start()
  {
    this.timeScale = 1;
  }

  stop()
  {
    this.timeScale = 0;
  }
  
  setTimeScale(timeScale: number)
  {
    this.timeScale = timeScale;
  }

  getTimeScale()
  {
    return this.timeScale;
  }
}
