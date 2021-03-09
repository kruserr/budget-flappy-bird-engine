export interface IPos
{
  x: number;
  y: number;
}

export default class Pos
{
  x: number;
  y: number;

  constructor();
  constructor(obj: IPos);
  constructor(obj?: any)
  {
    this.x = obj && obj.x || 0;
    this.y = obj && obj.y || 0;
  }
}
