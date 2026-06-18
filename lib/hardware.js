// Hardware unit costs
// Prices updated June 2026 from Home Depot listings
const PRICES = {
  deckScrewsPerLb:   5.50,   // DECKMATE 5lb box ~$27 → $5.50/lb; 1lb covers ~25 sq ft
  joistHanger:       1.77,   // Simpson Strong-Tie LUS26 @ HD ($1.77 ea, bulk $1.59)
  postBase:         14.98,   // Simpson Strong-Tie ABA44Z 4x4 post base @ HD
  ledgerBoltPer16in: 2.75,   // carriage bolt every 16" along ledger
  beamHanger:        6.00,   // per beam-to-post connector
  hurricaneTie:      0.98,   // Simpson H2.5AZ ZMAX @ HD ($0.98 ea); 2 per joist
};

function calcHardware(sqFt, joistCount, postCount, ledgerLf) {
  const screwLbs      = Math.ceil(sqFt / 25);
  const joistHangers  = joistCount * 2;
  const postBases     = postCount;
  const ledgerBolts   = Math.ceil((ledgerLf * 12) / 16);
  const beamHangers   = postCount;
  const hurricaneTies = joistCount * 2; // one each end of every joist

  const cost =
    screwLbs      * PRICES.deckScrewsPerLb +
    joistHangers  * PRICES.joistHanger +
    postBases     * PRICES.postBase +
    ledgerBolts   * PRICES.ledgerBoltPer16in +
    beamHangers   * PRICES.beamHanger +
    hurricaneTies * PRICES.hurricaneTie;

  return { screwLbs, joistHangers, postBases, ledgerBolts, beamHangers, hurricaneTies, cost };
}

module.exports = { calcHardware };
