import React, { useEffect, useRef, useState } from "react";
import "./Flowchart.css";
import ReactFlow, { ReactFlowProvider, useStoreState } from 'react-flow-renderer';
import { nodeTypes } from "./Item/Item";
import { httpGet, httpPut } from "../Endpoints/endpoints";

export function Flowchart({newRecommendedRecipes}) {

  // let height = this.wrapper.current?.clientHeight;
  // let width = this.wrapper.current?.clientHeight;

  let calculatedWidth = 0;
  function setCalculatedWidth(calcW, screenW) {
    console.log("Wrapper", calculatedWidth, calcW);
    if (calculatedWidth !== calcW) listener(calcW, screenW);
    calculatedWidth = calcW;
  }
  let listener = (x, y) => {}
  function addListener(x) { listener = x }

  return (
    <div style={{height: "100%", position: "relative"}}>
      <ReactFlowProvider>
        <Flow setCalculatedWidth={setCalculatedWidth} newRecommendedRecipes={newRecommendedRecipes}/>
        <Scroll addListener={addListener} />
      </ReactFlowProvider>
    </div>
  );
}

function Scroll(props) {
  const bar = useRef(null);
  const transform = useStoreState((store) => store.transform);
  // const { setCenter } = useZoomPanHelper();

  const [barWidth, setBarWidth] = useState(100);
  const [barRight, setBarRight] = useState(0);
  const [width, setWidth] = useState({cw: 0, w: 0});

  // let mouseDown = false;
  // let startPos;

  useEffect(() => {
    if (width.cw - width.w > 0) setBarRight(transform[0] / (width.cw - width.w) * (100 - barWidth));
    else setBarRight(0);
  }, [transform[0]]);

  // setCenter(x, y, 1);

  props.addListener(function (calcW, screenW) {
    setWidth({cw: calcW, w: screenW})
    setBarWidth(screenW / calcW * 100);
  })

  // bar.current?.addEventListener("mousedown", (ev) => {
  //   if (!mouseDown) startPos = ev.screenX;
  //   mouseDown = true
  // })
  // bar.current?.addEventListener("mouseup", () => { mouseDown = false })
  // bar.current?.addEventListener("mousemove", (ev) => {
  //   if (mouseDown) {
  //     let leftDist = (100 - barRight - barWidth) / 100 * width.w;
  //     let rightDist = barRight / 100 * width.w;
  //     let dx = ev.screenX - startPos;
  //     if (dx < 0 && -dx < leftDist) {
  //       setBarRight((rightDist - dx) / width.w * 100);
  //     }
  //   }
  // })

  return (
    <div className="scroll-wrapper">
      <div ref={bar} className="scroll-bar" style={{width: barWidth + "%", right: barRight + "%", opacity: barWidth == 100 ? 0 : 1}}></div>
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
    console.log("Flow", this.calcW, this.wrapper.current?.clientWidth || 0);
    this.props.setCalculatedWidth(this.calcW, this.wrapper.current?.clientWidth || 0);
  }

  resize() {
      console.log("jgkjg");
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
    console.log(option);
    httpPut("/ingre", { ingre : option });
    let nextIngredientOptions = Object.values(httpGet("/ingre"));
    let recommendedRecipes = httpGet("/recipe");
    this.props.newRecommendedRecipes(recommendedRecipes);
    if (Array.isArray(nextIngredientOptions)) this.nextIngredients = nextIngredientOptions;

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
        <div className="bg"></div>
        <ReactFlow
          elements={this.state.elements}
          nodeTypes={nodeTypes}
          panOnScroll="true"
          panOnScrollMode="horizontal"
          panOnScrollSpeed="1.25"
          zoomOnScroll="false"
          translateExtent={[[this.calcExtent(), -Infinity], [this.wrapper.current?.clientWidth || 0, Infinity]]} >
        </ReactFlow>
      </div>
    );
  }
}