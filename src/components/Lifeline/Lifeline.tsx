import React, { useEffect, useRef } from 'react';
import './lifeline.css';
import { getDistance } from 'geolib';
import { forceSimulation, forceCollide, forceX, forceY, SimulationNodeDatum} from 'd3-force';
import { scaleLinear } from 'd3-scale';
import { axisLeft } from 'd3-axis';
import { line } from 'd3-shape';
import { select } from 'd3-selection';

type LabelPlacement = "topLeft" | "topCenter" | "topRight";

interface LifepathEvent {
  id: number,
  coords: [number, number],
  name: string,
  year: number,
  relation_type: string,

}

interface LifepathEventD3 extends LifepathEvent {
  distance: number,
  x: number,
}

interface Node extends SimulationNodeDatum {
  targetX:number,
  targetY:number,
  data: LifepathEventD3
}


interface LifelineProps {
  /**
   * Should to earliest date be shown on top?
   */
  //earliestontop?: boolean;
  /**
   * Optional title lable  
   */
  titlelabel?: string;
  /**
  * Optional title label placement  
  */
  titlelabelplacement?: LabelPlacement;
  /**
   * What color to use for the lifeline path
   */
  lifelinecolor?: string;
  /**
   * What color to use for the lifeevents
   */
  lifeeventcolor?: string;
  /**
  * Opacity value lifeevents
  */
  lifeeventopacity?: number;
  /**
   * lifepath data
   */
  lifepath: LifepathEvent[];
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
const Lifeline: React.FunctionComponent<LifelineProps> = (props: LifelineProps) => {

  const d3Container = useRef(null);


  useEffect(() => {
    // Update the document title using the browser API
    if (props.lifepath && d3Container.current)
      createLifeline(props)
  });


  return (
    <div
      //  className={['storybook-button', `storybook-button--${size}`, mode].join(' ')}
      ref={d3Container} {...props}
    >   {(props.titlelabel && props.titlelabel.length > 0) &&
      <label className={props.titlelabelplacement}>{props.titlelabel}</label>}
      <svg style={{ width: "100%" }} className="svg-canvas"></svg>
    </div>
  );
}

export default Lifeline;


Lifeline.defaultProps = {
  lifelinecolor: "#18198c",
  lifeeventcolor: "#D4D4D8",
  lifeeventopacity: 0.5,
  lifepath: [],
  titlelabelplacement: "topCenter"
};

function createLifeline(props: LifelineProps) {

  const width = 250
  const height = 600
  const margin = 0
  const padding = 0
  const adj = 50;

  const b = props.lifepath.reduce<LifepathEventD3[]>((m, e, i, l) => {
    if (i === 0) {
      return m.concat({ ...e, distance: 0, x: 0 })
    } else {
      const distance = getDistance(
        {
          latitude: e.coords[0],
          longitude: e.coords[1]
        },
        {
          latitude: l[i - 1].coords[0],
          longitude: l[i - 1].coords[1]
        }
      )
      return m.concat({
        ...e,
        distance,
        x: m[i - 1].x + distance * (i % 2 === 0 ? 1 : -1)
      })
    }
  }, [])

  const xs = b.map(x => x.x)
  const years = b.map(x => x.year)

  const [minX, maxX] = [Math.min(...xs), Math.max(...xs)]
  const [minY, maxY] = [Math.min(...years), Math.max(...years)]

  const  yScale  = scaleLinear().domain([minY, maxY]).rangeRound([0, height]) 
  const xScale = scaleLinear().domain([minX, maxX]).rangeRound([0, width])

  const yAxis = axisLeft(yScale)
  
  //

  const l = line<LifepathEventD3>()
    .x(d  => xScale(d.x))
    .y(d => yScale(d.year))(b)

  const svg = select('.svg-canvas')
  svg.selectAll("*").remove()
  svg
    .attr('preserveAspectRatio', 'xMinYMin meet')
    .attr('viewBox', `-${adj} -${adj} ${width + adj * 3} ${height + adj * 3}`)
    .style('padding', padding)
    .style('margin', margin)
    .classed('svg-content', true)

  svg.append('g')
    .style('font', '16px Montserrat')
    .attr('class', 'axis')
    .call(yAxis)

  svg.append('g')
    .append('path')
   .attr('stroke', props.lifelinecolor || '')
    .attr('fill', 'none')
    .attr('stroke-width', '4px')
    .attr('d', () => l)

  function computeLabelPositions(labelSize:number, offset:number) {
    const labels = b.map((d) => ({
      targetX: xScale(d.x) + offset,
      targetY: yScale(d.year) - offset,
      data: d
    }) as Node)
    const force = forceSimulation()
      .nodes(labels)
      .force('collide', forceCollide(labelSize))
      .force('x', forceX((d:Node)  =>  d.targetX).strength(1))
      .force('y', forceY((d:Node) => d.targetY).strength(1))
      .stop();

    for (let i = 0; i < 300; i++) force.tick();
    return labels
  }

  const labels = computeLabelPositions(30, 30)

  svg.append('g')
    .selectAll('labels')
    .data(labels)
    .enter()
    .append('g')
    .attr('class', 'circle-label')
    .append('circle')
    .attr('cx', d => xScale(d.data.x))
    .attr('cy', d => yScale(d.data.year))
    .attr('apis:relid', d => d.data.id)
    .attr('r', 15)
    .style('fill', props.lifeeventcolor || '')
    .style('opacity', props.lifeeventopacity || 0)
    .style('stroke', 'white')
   /* .on('mouseover', (event, d) => {
      
    }).on('mouseout', (event, d) => {
      
    })*/
    .select( function()  { return this.parentNode })
    .append('g')
    .attr('class', 'label-text')
    .append('text')
    .attr('text-anchor', 'middle')
    .attr('x', d => d.x)
    .attr('y', d => d.y)
    .append('tspan')
    .text(d => d.data.year)
    .select(function () { return this.parentNode })
    .append('tspan')
    .attr('dy', '1.1em')
    .attr('x', d => d.x)
    .text(d => d.data.name)
    .select(function () { return this.parentNode })
    .select(function () { return this.parentNode })
    .call((e) => {

      const gs = e.nodes()
      gs.reduce((m, g) => {
        const r = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
        
        
        const bb = (g as SVGSVGElement).getBBox()
        r.setAttribute('x', bb.x.toString())
        r.setAttribute('y', bb.y.toString())
        r.setAttribute('width', bb.width.toString())
        r.setAttribute('height', bb.height.toString())
        r.style.fill = 'rgba(255,255,255,.9)'
        g.prepend(r)
        return m.concat(bb)
      }, [])
    })
}