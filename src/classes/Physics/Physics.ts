import Pos from "../Pos/Pos";

import Engine from '../Engine/Engine';


export default class Physics
{
  private gravity: number;
  private jumpSpeed: number;
  private velocity: number;
  
  constructor (jumpSpeed: number, gravity: number)
  {
    this.jumpSpeed = jumpSpeed;
    this.gravity = gravity;
    this.velocity = 0;
  }

  applyGravity(collider: Pos)
  {
    if (collider.y < 100)
    {
      this.velocity += this.gravity;
      collider.y += (this.velocity) * Engine.getTime().getTimeScale();
    }
  }

  applyJump(collider: Pos)
  {
    if (collider.y > -12)
    {
      this.velocity = this.jumpSpeed;
      collider.y += (this.velocity) * Engine.getTime().getTimeScale();
    }
  }

  getVelocity()
  {
    return this.velocity;
  }

  // https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
  static AxisAlignedBoundingBox(a: DOMRect, b: DOMRect)
  {
    if (a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y)
    {
      return true;
    }

    return false;
  }
}
