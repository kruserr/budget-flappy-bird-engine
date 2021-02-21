import Event from '../Event/Event';


export default class EventList
{
  private static events: Array<Event>;

  constructor()
  {
    EventList.events = new Array<Event>();

    EventList.events.push(
      new Event({
        name: 'true',
        lambda: () => { return true; }
      })
    );

    EventList.events.push(
      new Event({
        name: 'false',
        lambda: () => { return false; }
      })
    );
  }

  getEvent(name: string)
  {
    return EventList.events.find(event => event.getName() === name);
  }
}
