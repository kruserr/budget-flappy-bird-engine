import React from 'react';
import { render, screen } from '@testing-library/react';

import ctx, { Data } from './Data';


function TestChild(props)
{
  const element = React.useRef(null);
  const [context, setContext] = React.useContext(ctx);

  React.useEffect(() => {
    context[props?.id] = element?.current?.getBoundingClientRect();
    setContext({...context});
  }, []);

  return(
    <span ref={element} id={props?.id} style={{top: `100px`}}>
      {context?.text}
    </span>
  );
}

function TestGroup()
{
  return (
    <Data>
      <TestChild id={'TestChild1'} />
      <TestChild id={'TestChild2'} />
    </Data>
  );
}

test('Data - render', () => {
  const { debug } = render(<TestGroup />);
  debug();
});
