export interface IBoxCollider
{
  x: number;
  y: number;
  width: number;
  height: number;
}

export default class BoxCollider
{
  private x: number;
  private y: number;
  private width: number;
  private height: number;

  private xOpen = true;
  private yOpen = true;
  
  constructor();
  constructor(obj: IBoxCollider);
  constructor(obj?: any)
  {
    this.x = obj && obj.x || 0;
    this.y = obj && obj.y || 0;
    this.width = obj && obj.width || 0;
    this.height = obj && obj.height || 0;
  }

  setX(x: number)
  {
    if (this.xOpen)
    {
      this.xOpen = false;
      
      this.x += x;

      this.xOpen = true;
    }
  }
  getX() { return this.x; }

  setY(y: number)
  {
    if (this.yOpen)
    { 
      this.yOpen = false;
      
      this.y += y;

      this.yOpen = true;
    }
  }
  getY() { return this.y; }
  
  setWidth(width: number) { this.width = width; }
  getWidth() { return this.width; }
  
  setHeight(height: number) { this.height = height; }
  getHeight() { return this.height; }

  collideCheck(other: BoxCollider)
  {
    return false;
  }
}
