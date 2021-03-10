import React from "react";

import Physics from '../Physics/Physics';


const ctx = React.createContext();

export function Data(props)
{
  const [context, setContext] = React.useState({});

  React.useEffect(() => {
    function fixedUpdateLoop()
    {
      for (const i in context)
      {
        if (context[i].tag != 'player')
        {
          continue;
        }

        const objA = document.getElementById(i).getBoundingClientRect();

        for (const j in context)
        {
          if (i === j || context[j].tag != 'obstacle')
          {
            continue;
          }

          const objB = document.getElementById(j).getBoundingClientRect();

          if (Physics.AxisAlignedBoundingBox(objA, objB))
          {
            let isColliding = new CustomEvent('isColliding', {
              detail: {
                items: [i, j],
              }
            });

            document.dispatchEvent(isColliding);
          }
        }
      }

      requestAnimationFrame(fixedUpdateLoop);
    }

    requestAnimationFrame(fixedUpdateLoop);
  }, []);

  return (
    <ctx.Provider value={[context, setContext]}>
      {props?.children}
    </ctx.Provider>
  );
}

export default ctx;
