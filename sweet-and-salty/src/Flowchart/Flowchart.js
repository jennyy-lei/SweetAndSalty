import React, { useEffect, useRef, useState } from "react";
import "./Flowchart.css";
import ReactFlow, { ReactFlowProvider, useStoreState } from 'react-flow-renderer';
import { nodeTypes } from "./Item/Item";
import { httpGet, httpPut } from "../Endpoints/endpoints";

export function Flowchart({newRecommendedRecipes}) {
  // let height = this.wrapper.current?.clientHeight;
  // let width = this.wrapper.current?.clientHeight;
  const [scroll, setScroll] = useState(0);

  let calculatedWidth = 0;
  function setCalculatedWidth(calcW, screenW) {
    if (calculatedWidth !== calcW) listener(calcW, screenW);
    calculatedWidth = calcW;
  }
  let listener = (x, y) => {}
  function addListener(x) { listener = x }

  return (
    <div style={{height: "100%", position: "relative"}}>
      <div className="bg" style={{right: 40 - scroll}}></div>
      <ReactFlowProvider>
        <Flow setCalculatedWidth={setCalculatedWidth} newRecommendedRecipes={newRecommendedRecipes}/>
        <Scroll addListener={addListener} setScroll={setScroll} />
      </ReactFlowProvider>
    </div>
  );
}

function Scroll(props) {
  const bar = useRef(null);
  const transform = useStoreState((store) => store.transform);

  const [barWidth, setBarWidth] = useState(100);
  const [barRight, setBarRight] = useState(0);
  const [width, setWidth] = useState({cw: 0, w: 0});

  useEffect(() => {
    props.setScroll(transform[0]);
    if (width.cw - width.w > 0) setBarRight(transform[0] / (width.cw - width.w) * (100 - barWidth));
    else setBarRight(0);
  }, [transform[0]]);


  props.addListener(function (calcW, screenW) {
    setWidth({cw: calcW, w: screenW})
    setBarWidth(screenW / calcW * 100);
  })

  return (
    <div className="scroll-wrapper">
      <div ref={bar} className="scroll-bar" style={{width: barWidth + "%", right: barRight + "%", opacity: barWidth === 100 ? 0 : 1}}></div>
    </div>
  )
}

class Flow extends React.Component {
  constructor(props) {
    super(props);

    this.calcW = 0;
    this.selectedIngredients = [];
    this.nextIngredients = ["Tomato", "Potato", "Play Doh", "Sago", "Avocado"];
    this.id = 0;
    this.wrapper = React.createRef();
    this.state = { elements: [] }
  }

  componentDidMount() {
    let h = this.wrapper.current?.clientHeight || 0;
    this.setState({
      height: h,
      elements: this.makeNodes(this.selectedIngredients, this.nextIngredients)
    })

    window.addEventListener("resize", this.resize.bind(this));
  }

  componentDidUpdate() {
    this.props.setCalculatedWidth(this.calcW, this.wrapper.current?.clientWidth || 0);
  }

  resize() {
      this.makeNodes(this.selectedIngredients, this.nextIngredients);
  }

  makeNodes(values, futureValues) {
    let w = this.wrapper.current?.clientWidth || 0;
    let h = this.wrapper.current?.clientHeight || 0;
    let itemSize = 200, spacing = 75, padding = 100;
    let n = [];

    if (values.length === 0) {
      n.push({
        id: this.id++,
        data: { text: "Keep selecting ingredients on the right while we find recipes!" },
        type: "text",
        position: { x: w - itemSize - padding - spacing, y: h/2 - 20 },
        draggable: false,
        connectable: false
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

    console.log("future values", futureValues);
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
    httpPut("/ingre", { ingre : option });
    // let nextIngredientOptions =
    httpGet("/ingre").then(((data) => {
      console.log("flowchart ingredients", data.data.data);
      this.nextIngredients = data.data.data;
      this.setState({
        elements: this.makeNodes(this.selectedIngredients, this.nextIngredients)
      })
    }).bind(this));
    httpGet("/recipe").then(((data) => {
      console.log("flowchart recipes", data.data.data);
      this.props.newRecommendedRecipes(data.data.data);
    }).bind(this));
    // this.props.newRecommendedRecipes(recommendedRecipes);
    // if (Array.isArray(nextIngredientOptions)) this.nextIngredients = nextIngredientOptions;
  }

  calcListHeight(n) {
    return n*40 + (n-1)*40;
  }

  calcExtent() {
    let n = this.selectedIngredients.length;
    let w = this.wrapper.current?.clientWidth || 0;
    this.calcW = ((n+1)*200 + (n)*75 + 2*100);
    if (w - this.calcW < 0) {
      return w - this.calcW;
    } else {
      this.calcW = w;
      return 0;
    }
  }

  render() {
    return (
      <div className="flowWrapper" ref={this.wrapper}>
        <ReactFlow
          elements={this.state.elements}
          nodeTypes={nodeTypes}
          panOnScroll="true"
          panOnScrollMode="horizontal"
          panOnScrollSpeed="1.25"
          zoomOnScroll="false"
          zoomOnPinch="false"
          zoomOnDoubleClick="false"
          translateExtent={[[this.calcExtent(), -Infinity], [this.wrapper.current?.clientWidth || 0, Infinity]]} >
        </ReactFlow>
      </div>
    );
  }
}