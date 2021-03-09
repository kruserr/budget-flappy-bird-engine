import React from "react";

import Physics from '../Physics/Physics';


const ctx = React.createContext();

export function Data(props)
{
  const [context, setContext] = React.useState({});

  React.useEffect(() => {
    for (const i in context)
    {
      if (context[i].tag != 'player')
      {
        continue;
      }

      for (const j in context)
      {
        if (context[i].collider === context[j].collider || context[j].tag != 'obstacle')
        {
          continue;
        }

        if (Physics.AxisAlignedBoundingBox(context[i].collider, context[j].collider))
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
  }, [context]);

  return (
    <ctx.Provider value={[context, setContext]}>
      {props?.children}
    </ctx.Provider>
  );
}

export default ctx;
