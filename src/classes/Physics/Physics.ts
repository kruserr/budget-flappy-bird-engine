import BoxCollider from "../BoxCollider/BoxCollider";


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

  applyGravity(collider: BoxCollider)
  {
    if (collider.getY() < window.innerHeight)
    {
      this.velocity += this.gravity;
      collider.setY(this.velocity);
    }
  }

  applyJump(collider: BoxCollider)
  {
    if (collider.getY() > -50)
    {
      this.velocity = this.jumpSpeed;
      collider.setY(this.velocity);
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
