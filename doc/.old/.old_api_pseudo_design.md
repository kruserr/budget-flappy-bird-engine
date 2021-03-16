# Event
    private name
    private lambda

    Event(lambda)
    Event(name, lambda)

    bool check()
    {
        return lambda()
    }

# EventList
    private static Array<Event> events

    EventList()
    {
        // Populate all engine default events
        events.push(...)
    }

    Event getEvent(name)

# Action
    private Event event
    private lambda

    Action(Event event, lambda)

    run(Object object)
    {
        if (event.check())
            lambda(object)
    }

# BoxCollider
    x
    y
    width
    height

    collideCheck(BoxCollider other)

# Object
    health
    BoxCollider boxCollider
    private Array<Action> actions

    Object()
    Object(Array<Action> actions)

    run()
    {
        for (item : actions)
            item.run(this);

        this.render();
    }

    render()

    addAction(Action action)

# Engine
    private Array<Object> objects

    Engine()
    Engine(Array<Object> objects)

    tick()
    {
        for (item : objects)
            item.run();

        sync();
    }

    sync()

    addObject(object)

# Game Demo
    player = Object();

    spacePressed = false;
    window.addEventListener('keydown', (e, spacePressed) => {
        if (e.key === " ")
            spacePressed = true
    });
    window.addEventListener('keyup', (e, spacePressed) => {
        if (e.key === " ")
            spacePressed = false
    });
    player.addAction(
        Action(Event(() => { return spacePressed; }), (object) => {
            object.y += 10;
        })
    );

    player.addAction(
        Action(EventList.getEvent('tick'), (object) => {
            object.y -= 5;
        })
    );

    engine = Engine({player});

    while(true)
    {
        engine.tick();
    }
