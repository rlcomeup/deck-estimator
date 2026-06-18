// Drives the estimator programmatically, bypassing readline
'use strict';

const { DECKING_SPECIES, calcDecking, calcFraming } = require('./lib/lumber');
const { calcConcrete } = require('./lib/concrete');
const { calcHardware } = require('./lib/hardware');
const { calcLabor } = require('./lib/labor');
const { printReport } = require('./lib/report');

const scenarios = [
  { label: 'Small deck  (16×12, PT Pine,  4 posts, $65/hr)',  length: 16, width: 12, joistSpacing: 16, postCount: 4,  speciesIdx: 0, waste: 10, footingDiam: 12, footingDepth: 42, hourlyRate: 65  },
  { label: 'Medium deck (20×14, Cedar,    6 posts, $75/hr)',  length: 20, width: 14, joistSpacing: 16, postCount: 6,  speciesIdx: 1, waste: 10, footingDiam: 12, footingDepth: 42, hourlyRate: 75  },
  { label: 'Large deck  (24×16, Composite,8 posts, $85/hr)',  length: 24, width: 16, joistSpacing: 12, postCount: 8,  speciesIdx: 3, waste: 12, footingDiam: 16, footingDepth: 48, hourlyRate: 85  },
];

for (const s of scenarios) {
  console.log('\n' + '▓'.repeat(52));
  console.log(`  ${s.label}`);

  const species  = DECKING_SPECIES[s.speciesIdx];
  const decking  = calcDecking(s.length, s.width, s.waste, species);
  const framing  = calcFraming(s.length, s.width, s.joistSpacing, s.postCount);
  const concrete = calcConcrete(s.postCount, s.footingDiam, s.footingDepth);
  const hardware = calcHardware(decking.sqFt, framing.joistCount, s.postCount, s.width);
  const labor    = calcLabor(decking.sqFt, s.postCount, framing.joistCount, s.hourlyRate);
  const inputs   = { length: s.length, width: s.width, joistSpacing: s.joistSpacing, postCount: s.postCount, species, hourlyRate: s.hourlyRate };

  printReport(inputs, decking, framing, concrete, hardware, labor);
}
