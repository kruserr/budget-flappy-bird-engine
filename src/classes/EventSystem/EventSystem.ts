export interface IEvent
{
  dispatch(event: Event): boolean;
  listen(id: string, lambda: () => void): void;
  remove(id: string, lambda: () => void): void;
}

export default class EventSystem implements IEvent
{
  dispatch(event: Event)
  {
    return document.dispatchEvent(event);
  }

  listen(id: string, lambda: () => void)
  {
    return document.addEventListener(id, lambda);
  }

  remove(id: string, lambda: () => void)
  {
    return document.removeEventListener(id, lambda);
  }
}
