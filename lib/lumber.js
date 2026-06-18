// Board species options — price per linear foot for 5/4x6 decking
// Prices updated June 2026 from Home Depot / market data
const DECKING_SPECIES = [
  { label: 'Pressure-Treated Pine',  price: 1.45, unit: '/lf' }, // HD WeatherShield ~$1.25–1.65/lf
  { label: 'Cedar',                  price: 3.75, unit: '/lf' }, // HD Premium Cedar ~$3.50–4.50/lf
  { label: 'Redwood',                price: 5.50, unit: '/lf' }, // regional; verify locally
  { label: 'Composite (Trex-style)', price: 4.99, unit: '/lf' }, // Trex Enhance Naturals 16ft board
];

const FRAMING_PRICE_PER_LF = 1.55; // 2x8 PT lumber ~$1.30–1.75/lf (HD/market avg)

// 5/4x6 actual width = 5.5 inches = 0.458 ft
const BOARD_ACTUAL_WIDTH_FT = 5.5 / 12;

function calcDecking(lengthFt, widthFt, wasteFactor, species) {
  const sqFt = lengthFt * widthFt;
  const coveragePerLf = BOARD_ACTUAL_WIDTH_FT;
  const lfNeeded = (sqFt / coveragePerLf) * (1 + wasteFactor / 100);
  const boardCount = Math.ceil(lfNeeded / lengthFt); // buy boards = deck length
  const cost = lfNeeded * species.price;
  return { sqFt, lfNeeded: Math.ceil(lfNeeded), boardCount, cost };
}

function calcFraming(lengthFt, widthFt, joistSpacingIn, postCount) {
  // Rim joists: perimeter
  const rimLf = 2 * (lengthFt + widthFt);

  // Interior joists: how many fit at given OC spacing
  const spacingFt = joistSpacingIn / 12;
  const joistCount = Math.floor(lengthFt / spacingFt) + 1;
  const joistLf = joistCount * widthFt;

  // Beam: one main beam running the width, doubled
  const beamLf = widthFt * 2;

  // Posts: 4x4 at 8ft height
  const postLf = postCount * 8;

  const totalLf = rimLf + joistLf + beamLf + postLf;
  const cost = totalLf * FRAMING_PRICE_PER_LF;

  return { rimLf, joistCount, joistLf, beamLf, postLf, totalLf: Math.ceil(totalLf), cost };
}

module.exports = { DECKING_SPECIES, calcDecking, calcFraming };
