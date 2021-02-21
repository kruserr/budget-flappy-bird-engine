import React from 'react';


export default class Template extends React.Component
{
  render()
  {
    const styleRoot: React.CSSProperties = {
      background: `#333333`,
      color: `#FFFFFF`,
      textAlign: `center`,
      borderRadius: `10px`,
      paddingTop: `10px`,
      paddingBottom: `10px`,
    };

    return (
      <div style={styleRoot}>
        Template
      </div>
    );
  }
}
