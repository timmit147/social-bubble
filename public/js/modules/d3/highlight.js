// Wait 1 second to wait for svg circles loaded
function delay (time) {
  return new Promise(resolve => setTimeout(resolve, time))
}

// Add hover highlight of curent item you hovert and connected items
export const highlight = async (data) => {
  // Wait 1 second till the svg is loaded
  await delay(1000)

  // Select svg items
  const svg = document.querySelector('#graph svg')
  for (let items = 0; items < svg.children.length; items++) {
    // Add addEventListener to all items in svg
    svg.children[items].addEventListener('mouseenter', () => {
      // Remove item info
      const nodes = svg.children
      for (let items = 0; items < nodes.length; items++) {
        nodes[items].classList.remove('opacity')
      }

      const node = svg.children[items]
      const svgNodes = svg.children
      node.classList.add('opacity')

      // Make alle items opacity 0.1
      for (let items = 0; items < svgNodes.length; items++) {
        svgNodes[items].classList.add('opacityDim')
      }

      // Check alle items that are connected with hovert item
      const currentNode = node.id.replace('node', '')
      let friends = 0
      let itemlinks = 0
      let infolinks = 0

      function countItems (item) {
        if (item.label == 'friend') {
          friends++
        }
        if (item.label == 'itemlink') {
          itemlinks++
        }
        if (item.label == 'infolink') {
          infolinks++
        }
      }

      function drawLine (source, target) {
        const targetX = document.querySelector(`#node${target}`)
        const targetY = document.querySelector(`#node${target}`)
        const sourceX = document.querySelector(`#node${source}`)
        const sourceY = document.querySelector(`#node${source}`)
        const newLine = document.createElementNS('http://www.w3.org/2000/svg', 'line')
        if (sourceX.className.baseVal === 'person opacityDim opacity') {
          newLine.setAttribute('x2', sourceX.x.baseVal.value + 15)
          newLine.setAttribute('y2', sourceY.y.baseVal.value + 15)
          newLine.setAttribute('stroke-width', '2')
          newLine.setAttribute('stroke', 'purple')
        } else {
          newLine.setAttribute('x2', sourceX.x.baseVal.value + 5)
          newLine.setAttribute('y2', sourceY.y.baseVal.value + 5)
          newLine.setAttribute('stroke-width', '1')
          newLine.setAttribute('stroke', 'var(--primary-color')
        }
        newLine.setAttribute('x1', targetX.x.baseVal.value + 15)
        newLine.setAttribute('y1', targetY.y.baseVal.value + 15)
        svg.append(newLine)
      }

      // const data = await getOpenedSessionData(window.location.hash.slice(1))

      // Count all difrent items friend, itemlink, infolink that are from target
      for (const item of data.links) {
        if (item.source == currentNode) {
          document.querySelector(`#node${item.target}`).classList.add('opacity')
          countItems(item)
          drawLine(item.target, currentNode)
        }
        // Count all difrent items friend, itemlink, infolink that are from source
        if (item.target == currentNode) {
          document.querySelector(`#node${item.source}`).classList.add('opacity')
          countItems(item)
          drawLine(item.source, currentNode)
        }
      }

      // // Place item info inside a label
      document.querySelector('.connectionPersons span').innerHTML = friends
      document.querySelector('.itemPersons span').innerHTML = itemlinks
      document.querySelector('.itemSharers span').innerHTML = infolinks
    })
  }
}
