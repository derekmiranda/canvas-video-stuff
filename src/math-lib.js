// map point from flat img onto sphere
export const createSphereMappingFunc = ({
  lenMin,
  lenMax,
  angleMin,
  angleMax
}) => point => {
  return ((point - lenMin) / (lenMax - lenMin)) * (angleMax - angleMin) + angleMin;
}