// 60-lb bag yields ~0.45 cubic feet of mixed concrete
const BAG_YIELD_CF = 0.45;
const BAG_PRICE = 5.98; // Quikrete 60lb @ HD ~$5.98 (June 2026)

function calcConcrete(footingCount, diameterIn, depthIn) {
  const radiusFt = (diameterIn / 2) / 12;
  const depthFt = depthIn / 12;
  const cfPerFooting = Math.PI * radiusFt * radiusFt * depthFt;
  const totalCf = cfPerFooting * footingCount;
  const bagCount = Math.ceil(totalCf / BAG_YIELD_CF);
  const cost = bagCount * BAG_PRICE;
  return { cfPerFooting: cfPerFooting.toFixed(3), totalCf: totalCf.toFixed(2), bagCount, cost };
}

module.exports = { calcConcrete };
