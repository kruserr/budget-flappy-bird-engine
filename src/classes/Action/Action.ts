import Event from '../Event/Event';
import GameObject from '../../components/GameObject/GameObject';


export interface IAction
{
  event : Event;
  lambda : (obj: GameObject) => void;
}

export default class Action
{
  private event: Event;
  private lambda: (obj: GameObject) => void;

  constructor();
  constructor(obj: IAction);
  constructor(obj?: any)
  {
    this.event = obj && obj.event || 0;
    this.lambda = obj && obj.lambda || 0;
  }

  run(obj: GameObject)
  {
    if (this.event.check())
    {
      this.lambda(obj);
    }
  }
}
