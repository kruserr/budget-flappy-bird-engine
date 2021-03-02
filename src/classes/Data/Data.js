import React from "react";


const ctx = React.createContext();

export function Data(props)
{
  const [context, setContext] = React.useState({});

  React.useEffect(() => {
    for (const i in context)
    {
      for (const j in context)
      {
        if (context[i] === context[j])
          continue;

        if (context[i].x < context[j].x + context[j].width &&
          context[i].x + context[i].width > context[j].x &&
          context[i].y < context[j].y + context[j].height &&
          context[i].y + context[i].height > context[j].y)
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
