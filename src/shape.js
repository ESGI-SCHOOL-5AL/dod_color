export function zip(shapes) {
  return shapes.x.map((_, i) => {
    return {
      x: shapes.x[i],
      y: shapes.y[i],
      width: shapes.width[i],
      height: shapes.height[i],
      color: shapes.color[i],
      type: shapes.type[i],
    }
  })
}

export function calculateOccupiedSpace(zippedShapes) {
  return zippedShapes.reduce(
    (accumulator, currentValue) => {
      let width = currentValue.width
      let height = currentValue.height
      let radius = 0

      if (currentValue.type === "circle") {
        width /= 2
        height /= 2
        radius = width
      }

      if (currentValue.x + width > accumulator.maxX) {
        accumulator.maxX = currentValue.x + width
      }
      if (currentValue.x - radius < accumulator.minX) {
        accumulator.minX = currentValue.x - radius
      }
      if (currentValue.y + height > accumulator.maxY) {
        accumulator.maxY = currentValue.y + height
      }
      if (currentValue.y - radius < accumulator.minY) {
        accumulator.minY = currentValue.y - radius
      }
      if (!accumulator.colors.includes(currentValue.color)) {
        accumulator.colors.push(currentValue.color)
      }
      return accumulator
    },
    {
      minX: Infinity,
      maxX: 0,
      minY: Infinity,
      maxY: 0,
      colors: [],
    }
  )
}

export function getCircles(zippedShapes) {
  return zippedShapes.filter((s) => s.type === "circle")
}

export function getRectangles(zippedShapes) {
  return zippedShapes.filter((s) => s.type === "rect")
}

export function circlesToRectangles(zippedShapes) {
  getCircles(zippedShapes).forEach(mutateCircleToRectangle)
}

async function mutateCircleToRectangleAsync(circle) {
  return new Promise((resolve) => {
    setTimeout(() => {
      mutateCircleToRectangle(circle)
      resolve(circle)
    }, 0)
  })
}

export function circlesToRectanglesAsync(zippedShapes) {
  return Promise.all(getCircles(zippedShapes).map(mutateCircleToRectangleAsync))
}

export function mutateCircleToRectangle(c) {
  const radius = c.width / 2
  c.x -= radius
  c.y -= radius
  c.type = "rect"
}
