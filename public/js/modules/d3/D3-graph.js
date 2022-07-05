/* eslint-disable no-undef */
const width = window.innerWidth
const height = window.innerHeight
const header = document.querySelector('header')
const headerHeight = header.getBoundingClientRect().height
const svgHeight = height - headerHeight
const margin = { width: (0.1 * width), height: (0.1 * svgHeight) }

const div = d3.select('body').append('div')
  .attr('class', 'tooltip')

const gethtml = (id, links) => {
  return `<div>node: ${id}</div> <div>link: ${links}</div> <div class = "itemSharers">Items shared: <span> ${links}</span></div><div class = "connectionPersons">Connection with persons : <span>${links}</span></div><div class = "itemPersons">Item linked wih persons: <span>${links}</span></div>`
}

const svg = d3.select('#graph').append('svg')
  .attr('width', width)
  .attr('height', svgHeight)
  // .call(d3.zoom().on('zoom', function () {
  //   svg.attr('transform', d3.zoomTransform(this))
  // }))

// Scale
const xScale = d3.scaleLinear().range([0 + margin.width, width - margin.width])
const yScale = d3.scaleLinear().range([0 + margin.height, svgHeight - margin.height - 65])

const updateGraph = async (data) => {
  // Create the svg in the body

  const nodes = data.nodes

  xScale.domain([d3.min(nodes, (d) => d.x), d3.max(nodes, (d) => d.x)])
  yScale.domain([d3.min(nodes, (d) => d.y), d3.max(nodes, (d) => d.y)])

  const circle = svg
    .selectAll('rect')
    .data(nodes)
    .join(
      (enter) => {
        enter = enter.append('rect')
        return enter
      },
      (update) => update,
      (exit) => exit.remove()
    )

  circle
    .attr('opacity', '0.2')
    .attr('class', (nodes) => nodes.label)
    // .attr('fill', '#2781e7b2')
    .attr('class', (nodes) => nodes.label)
    .attr('x', (nodes) => xScale(nodes.x))
    .attr('y', (nodes) => yScale(nodes.y))
    .attr('width', (nodes) => {
      if (nodes.label === 'person') {
        return 30
      } else {
        return 10
      }
    })
    .attr('height', (nodes) => {
      if (nodes.label === 'person') {
        return 30
      } else {
        return 10
      }
    })
    .attr('id', (nodes) => {
      return 'node' + nodes.id
    })

    .on('mouseover', function (event, d, i) {
      d3.select(this).transition()
        .duration('50')
      div.transition()
        .duration(50)
        .style('opacity', 1)
        .style('z-index', '1')
      div.html(gethtml(d.id, d.label))
        .style('left', (event.pageX + 10) + 'px')
        .style('top', (event.pageY - 15) + 'px')
      d3.select('tick').transition()
        .duration('50')
        .attr('stroke-opacity', '0.6')
    })

    .on('mouseout', function (d, i) {
      d3.select(this).transition()
        .duration('50')
      div.transition()
        .duration('50')
        .style('opacity', 0)
        .style('z-index', '-1')
      d3.select().transition()
        .duration('50')

      const boxes = document.querySelectorAll('line')

      boxes.forEach(box => {
        box.remove()
      })

      const svg = document.querySelector('#graph svg')
      const itemChildren = svg.children

      // Make alle items opacity 0.1
      for (let items = 0; items < itemChildren.length; items++) {
        itemChildren[items].classList.remove('opacity')
      }
    })

    .on('click', (event, d, i) => {
      d3.select(event.target)
        .attr('opacity', '1')

      d3.select(this).transition()
        .duration('50')
      div.transition()
        .duration(50)
        .style('opacity', 0)
      div.html(gethtml(d.id, d.label))
        .style('left', (event.pageX + 10) + 'px')
        .style('top', (event.pageY - 15) + 'px')
      d3.select('tick').transition()
        .duration('50')
        .attr('stroke-opacity', '0.6')
    })
}

export default updateGraph
