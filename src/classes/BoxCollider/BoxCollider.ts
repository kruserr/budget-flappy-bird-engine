export interface IBoxCollider
{
  x: number;
  y: number;
  width: number;
  height: number;
}

export default class BoxCollider
{
  x: number
  y: number
  width: number
  height: number

  constructor();
  constructor(obj: IBoxCollider);
  constructor(obj?: any)
  {
    this.x = obj && obj.x || 0;
    this.y = obj && obj.y || 0;
    this.width = obj && obj.width || 0;
    this.height = obj && obj.height || 0;
  }

  collideCheck(other: BoxCollider)
  {
    return false;
  }
}
