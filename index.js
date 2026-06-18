#!/usr/bin/env node
'use strict';

const { ask, askNumber, askChoice, close } = require('./lib/prompts');
const { DECKING_SPECIES, calcDecking, calcFraming } = require('./lib/lumber');
const { calcConcrete } = require('./lib/concrete');
const { calcHardware } = require('./lib/hardware');
const { calcLabor } = require('./lib/labor');
const { printReport } = require('./lib/report');

async function main() {
  console.log('\n╔══════════════════════════════════╗');
  console.log('║     DECK BUILD ESTIMATOR  v1.0  ║');
  console.log('╚══════════════════════════════════╝\n');

  // ── Deck dimensions ──────────────────────────────
  console.log('── Deck Dimensions ─────────────────────────\n');
  const length      = await askNumber('Deck length (ft)', 16);
  const width       = await askNumber('Deck width (ft)', 12);
  const joistSpacing = await askNumber('Joist spacing in inches (12/16/24)', 16);
  const postCount   = await askNumber('Number of support posts', 4);

  // ── Decking species ───────────────────────────────
  console.log('\n── Decking Material ────────────────────────\n');
  const species = await askChoice('Select decking species', DECKING_SPECIES);

  // ── Waste factor ──────────────────────────────────
  const wasteFactor = await askNumber('Board waste factor % (5–15 recommended)', 10);

  // ── Footings ──────────────────────────────────────
  console.log('\n── Concrete Footings ───────────────────────\n');
  const footingCount  = await askNumber('Number of footings', postCount);
  const footingDiam   = await askNumber('Footing diameter (inches)', 12);
  const footingDepth  = await askNumber('Footing depth (inches)', 42);

  // ── Labor ─────────────────────────────────────────
  console.log('\n── Labor ───────────────────────────────────\n');
  const hourlyRate = await askNumber('Labor hourly rate ($/hr)', 65);

  close();

  // ── Calculations ──────────────────────────────────
  const decking  = calcDecking(length, width, wasteFactor, species);
  const framing  = calcFraming(length, width, joistSpacing, postCount);
  const concrete = calcConcrete(footingCount, footingDiam, footingDepth);
  const hardware = calcHardware(decking.sqFt, framing.joistCount, postCount, width);

  const joistCount = framing.joistCount;
  let labor = null;
  if (typeof calcLabor === 'function') {
    try {
      labor = calcLabor(decking.sqFt, footingCount, joistCount, hourlyRate);
    } catch {
      // calcLabor not yet implemented
    }
  }

  // ── Report ────────────────────────────────────────
  const inputs = { length, width, joistSpacing, postCount, species, hourlyRate };
  printReport(inputs, decking, framing, concrete, hardware, labor);
}

main().catch(err => {
  console.error('\nError:', err.message);
  process.exit(1);
});
