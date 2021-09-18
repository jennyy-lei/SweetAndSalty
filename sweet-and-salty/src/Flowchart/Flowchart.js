import React from "react";
import "./Flowchart.css";
import ReactFlow, { MiniMap, ReactFlowProvider } from 'react-flow-renderer';
import { nodeTypes } from "./Item/Item";

export class Flowchart extends React.Component {
  constructor(props) {
    super(props);

    this.selectedIngredients = [];
    this.nextIngredients = ["Tomato", "Potato"];
    this.id = 0;
    this.wrapper = React.createRef();
    this.state = { elements: [], height: 0 }
  }

  componentDidMount() {
    let h = this.wrapper.current.clientHeight;
    this.setState({
      height: h,
      elements: this.makeNodes(this.selectedIngredients, this.nextIngredients)
    })
  }

  makeNodes(values, futureValues) {
    let w = this.wrapper.current?.clientWidth || 0;
    let h = this.wrapper.current?.clientHeight || 0;
    let itemSize = 200, spacing = 100, padding = 100;
    let n = [];

    if (values.length === 0) {
      n.push({
        id: this.id++,
        data: { text: "Keep selecting ingredients on the right while we narrow down the recipes for you!" },
        type: "text",
        position: { x: w - itemSize - padding - spacing, y: h/2 - 20 }
      });
    } else {
      for (let i in values) {
        let iint = parseInt(i);
        n = n.concat([{
          id: this.id,
          data: { id: iint + 1, text: values[iint] },
          type: "node",
          position: { x: w - (values.length - iint + 1)*(itemSize + spacing), y: h/2 - 20 },
          draggable: false,
          connectable: false
        }, {
          id: `e${this.id}-${this.id+1}`,
          source: this.id,
          target: this.id+1
        }]);
        ++this.id;
      }

      n.pop();
    }

    n.push({
      id: this.id++,
      data: { id: values.length + 1, options: futureValues, onSelect: this.onSelect.bind(this) },
      type: "list",
      position: {x: w - itemSize - padding, y: h/2 - this.calcListHeight(futureValues.length)/2},
      draggable: false,
      connectable: false
    });

    this.els = n;
    
    return n;
  }

  onSelect(option) {
    this.selectedIngredients.push(option);

    this.setState({
      elements: this.makeNodes(this.selectedIngredients, this.nextIngredients)
    })
  }

  calcListHeight(n) {
    return n*40 + (n-1)*40;
  }

  calcExtent() {
    let n = this.selectedIngredients.length;
    let w = this.wrapper.current?.clientWidth || 0;
    let calcw = ((n+1)*200 + (n+2)*100);
    if (w - calcw < 0) return w - calcw;
    else return 0;
  }

  render() {
    return (
      <div className="flowWrapper" ref={this.wrapper}>
        <ReactFlowProvider>
          <ReactFlow
            elements={this.state.elements}
            nodeTypes={nodeTypes}
            panOnScroll="true"
            panOnScrollMode="horizontal"
            panOnScrollSpeed="1.25"
            zoomOnScroll="false"
            translateExtent={[[this.calcExtent(), -Infinity], [this.wrapper.current?.clientWidth || 0, Infinity]]} >
            <MiniMap
              className="miniMap"
              nodeBorderRadius={15}
              nodeStrokeColor={(node) => {
                switch (node.type) {
                  case 'text': return 'transparent';
                  default: return 'gray';
                }
              }}
              nodeColor={(node) => {
                switch (node.type) {
                  case 'text':
                    return 'transparent';
                  case 'default':
                    return '#00ff00';
                  case 'output':
                    return 'rgb(0,0,255)';
                  default:
                    return '#eee';
                }
              }}
              nodeStrokeWidth={3}
            />
          </ReactFlow>
        </ReactFlowProvider>      
      </div>
    );
  }
}