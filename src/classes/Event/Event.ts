import GameObject from '../../components/GameObject/GameObject';


export interface IEvent
{
  name: string;
  lambda: () => boolean;
}

export default class Event
{
  private name: string;
  private lambda: (obj: GameObject) => boolean;

  constructor();
  constructor(obj: IEvent);
  constructor(obj?: any)
  {
    this.name = obj && obj.name || null;
    this.lambda = obj && obj.lambda || null;
  }

  getName()
  {
    return this.name;
  }

  check(obj: GameObject)
  {
    return this.lambda(obj);
  }
}
