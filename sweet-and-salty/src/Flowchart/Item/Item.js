import React from 'react';
import { Handle } from 'react-flow-renderer';
import './Item.css';

let k = 0;

const CustomTextComponent = ({ data }) => {
  return (
    <div key={k++} className="rfr-text-item">
      {data.text}
    </div>
  )
}

const CustomNodeComponent = ({ data }) => {
  return (
    <div key={k++} className="rfr-item">
      <Handle className="rfr-handle" type="target" position="left" isConnectable={false} />
      <div className="rfr-item-id">{data.id}</div>
      <div className="rfr-item-text">{data.text}</div>
      <Handle className="rfr-handle" type="source" position="right" isConnectable={false} />
    </div>
  );
};

const CustomListComponent = ({ data }) => {
  return (
    <div className="rfr-list">
      {data.options.length === 0 ? <div className="empty">No more possible ingredient combinations!</div> : data.options.map(item => (
        <div key={k++} onClick={ () => { data.onSelect(item) } } className="rfr-item rfr-list-item">
          <div className="rfr-item-text">{item}</div>
        </div>
      ))}

      <button className="refresh" onClick={() => data.refresh()}>Refresh</button>
    </div>
  )
}

export const nodeTypes = {
  text: CustomTextComponent,
  node: CustomNodeComponent,
  list: CustomListComponent
};
