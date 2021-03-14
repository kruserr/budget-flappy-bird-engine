import React from "react";

import Physics from '../Physics/Physics';
import Engine from '../Engine/Engine';


const ctx = React.createContext();

export function Data(props)
{
  const [context, setContext] = React.useState({});

  React.useEffect(() => {
    function collision()
    {
      for (const i in context)
      {
        if (context[i].tag !== 'player')
        {
          continue;
        }

        const objA = document.getElementById(i).getBoundingClientRect();

        for (const j in context)
        {
          if (i === j || !context[j].tag in ['obstacle', 'score'])
          {
            continue;
          }

          const objB = document.getElementById(j).getBoundingClientRect();

          if (Physics.AxisAlignedBoundingBox(objA, objB))
          {
            let isColliding = new CustomEvent('isColliding', {
              detail: {
                items: [{'id': i, 'tag': context[i].tag}, {'id': j, 'tag': context[j].tag}],
              }
            });

            Engine.getEvent().dispatch(isColliding);
          }
        }
      }

      Engine.fixedUpdate(collision);
    }

    Engine.fixedUpdate(collision);
  }, []);

  return (
    <ctx.Provider value={[context, setContext]}>
      {props?.children}
    </ctx.Provider>
  );
}

export default ctx;
