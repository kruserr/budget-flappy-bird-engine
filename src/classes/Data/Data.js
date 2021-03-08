import React from "react";


const ctx = React.createContext();

export function Data(props)
{
  const [context, setContext] = React.useState({});

  React.useEffect(() => {
    for (const i in context)
    {
      if (context[i].tag != 'player') {
        continue;
      }
      for (const j in context)
      {
        if (context[i].collider === context[j].collider || context[j].tag != 'obstacle')
          continue;

        if (context[i].collider.x < context[j].collider.x + context[j].collider.width &&
          context[i].collider.x + context[i].collider.width > context[j].collider.x &&
          context[i].collider.y < context[j].collider.y + context[j].collider.height &&
          context[i].collider.y + context[i].collider.height > context[j].collider.y)
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
