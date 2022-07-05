/* eslint-disable no-undef */
const width = window.innerWidth
const height = window.innerHeight

const svg = d3.select('figure').append('svg')
  .attr('width', width)
  .attr('height', height)

const createDragGraph = async (data) => {
  const links = data.links
  const nodes = data.nodes

  const div = d3.select('body').append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0)

  const gethtml = (id, links) => {
    return `<div>node: ${id}</div> <div>links: ${links}</div>`
  }

  const simulation = d3.forceSimulation(nodes)
    .force('link', d3.forceLink(links).id(d => d.id).distance(200))
    .force('charge', d3.forceManyBody())
    .force('center', d3.forceCenter(width / 2, height / 2))

  const link = svg
    .selectAll('line')
    .data(links)
    .join(
      enter => {
        enter = enter
          .append('line')
          .attr('stroke', (nodes) => {
            if (nodes.label === 'friend') {
              return '#2780e7'
            } else {
              return '#aa46a3'
            }
          })
        return enter
      },

      update => update,
      exit => exit.attr('stroke', '#999')
    )

  link
    // .attr('stroke', '#999')
    .attr('stroke-opacity', 0.6)
    .attr('stroke-width', 1)
    .attr('class', (nodes) => nodes.label)
    .on('mouseover', function (event, d, i) {

    })

  const circle = svg
    .selectAll('circle')
    .data(nodes)
    .join(
      enter => {
        enter = enter
          .append('circle')
          .attr('r', (nodes) => {
            if (nodes.label === 'person') {
              return 10
            } else {
              return 5
            }
          })
        return enter
      },
      update => update,
      exit => exit.append('circle')
    )

  circle
    .attr('stroke', '#fff')
    .attr('stroke-width', 1.5)
    .attr('class', (nodes) => nodes.label)
    .attr('fill', '#2781e7b2')

    .on('mouseover', function (event, d, i) {
      d3.select(this).transition()
        .duration('50')
        .attr('opacity', '.85')
      div.transition()
        .duration(50)
        .style('opacity', 1)
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
        .attr('opacity', '1')
      div.transition()
        .duration('50')
        .style('opacity', 0)
      d3.select().transition()
        .duration('50')
        .attr('stroke-opacity', '0')
    })
    .call(drag(simulation))

  circle.append('title')
    .text(d => d.id)

  simulation.on('tick', () => {
    link
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y)

    circle
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
  })

  // invalidation.then(() => simulation.stop())
}

const drag = (simulation) => {
  function dragstarted (event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart()
    d.fx = d.x
    d.fy = d.y
  }

  function dragged (event, d) {
    d.fx = event.x
    d.fy = event.y
  }

  // function dragended (event, d) {
  //   if (!event.active) simulation.alphaTarget(0)
  //   d.fx = null
  //   d.fy = null
  // }

  return d3.drag()
    .on('start', dragstarted)
    .on('drag', dragged)
    // .on('end', dragended)
}

export default createDragGraph
