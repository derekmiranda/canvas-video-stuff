const sum = (...nums) => nums.reduce((sum, num) => sum + num)
const avg = (...nums) => sum(...nums) / nums.length

import { createSphereMappingFunc } from './math-lib'

export function desaturate(imgData) {
  const len = imgData.data.length

  for (let i = 0; i < len; i += 4) {
    const avgVal = avg(imgData.data[i], imgData.data[i + 1], imgData.data[i + 2])
    imgData.data[i] = avgVal
    imgData.data[i + 1] = avgVal
    imgData.data[i + 2] = avgVal
  }

  return imgData
}

function inInnerCircle(pixelIdx, width, height) {
  const x = pixelIdx % width
  const y = Math.floor(pixelIdx / height)

  const originX = width / 2
  const originY = height / 2
  const radius = height / 2
  const xNorm = x - originX
  const yNorm = y - originY

  return Math.pow(xNorm, 2) + Math.pow(yNorm, 2) <= Math.pow(radius, 2)
}

export function mcEscherBall(imgData, canvas) {
  const len = imgData.data.length
  const { width, height } = imgData
  const radius = Math.floor(height / 2)
  const midX = Math.floor(width / 2)
  
  // iterate by row
  for (let j = 0; j < height; j += 1) {
    // iterate by cell w/in row
    for (let i = 0; i < width; i += 1) {
      // get angles to represent point on sphere
      const mapIToTheta = createSphereMappingFunc({
        lenMin: 0,
        lenMax: width - 1,
        angleMin: -Math.PI / 2,
        angleMax: Math.PI / 2,
      })
      const mapJToPhi = createSphereMappingFunc({
        lenMin: 0,
        lenMax: height - 1,
        angleMin: -Math.PI / 2,
        angleMax: Math.PI / 2,
      })
      const theta = mapIToTheta(i)
      const phi = mapJToPhi(j)

      // ??? Forgot x, y equation
      /* const x = radius *  */
    }
  }
}