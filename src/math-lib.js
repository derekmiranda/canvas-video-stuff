// map point from flat img onto sphere
export const createSphereMappingFunc = ({
  lenMin,
  lenMax,
  angleMin,
  angleMax
}) => point => {
  return ((point - lenMin) / (lenMax - lenMin)) * (angleMax - angleMin) + angleMin;
}

export function mapPlaneToSphere({ i, j, width, height }) {
  const radius = Math.floor(height / 2)
  const midPt = Math.floor(width / 2)

  // get angles to represent point on sphere
  const mapIToPhi = createSphereMappingFunc({
    lenMin: 0,
    lenMax: width - 1,
    angleMin: -Math.PI / 2,
    angleMax: Math.PI / 2,
  })
  const mapJToTheta = createSphereMappingFunc({
    lenMin: 0,
    lenMax: height - 1,
    angleMin: -Math.PI / 2,
    angleMax: Math.PI / 2,
  })
  const phi = mapIToPhi(i)
  const theta = mapJToTheta(j)

  const x = Math.floor(radius * Math.sin(phi) * Math.cos(theta))
  const y = Math.floor(radius * Math.cos(phi) * Math.sin(theta))

  const xCorr = x + midPt
  const yCorr = y + midPt

  return { x: xCorr, y: yCorr, theta, phi }
}