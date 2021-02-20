export interface IEvent
{
  name : string;
  lambda : () => boolean;
}

export default class Event
{
  private name : string;
  private lambda : () => boolean;

  constructor();
  constructor(obj: IEvent);
  constructor(obj?: any)
  {
    this.name = obj && obj.name || null;
    this.lambda = obj && obj.lambda || null;
  }

  getName() : string
  {
    return this.name;
  }

  check() : boolean
  {
    return this.lambda();
  }
}
