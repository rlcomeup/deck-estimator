function usd(n) { return `$${n.toFixed(2)}`; }
function line(label, val, width = 38) {
  return `  ${label.padEnd(width)} ${val}`;
}

function printReport(inputs, decking, framing, concrete, hardware, labor) {
  const divider = '─'.repeat(52);
  console.log('\n' + '═'.repeat(52));
  console.log('  DECK BUILD ESTIMATE');
  console.log('═'.repeat(52));
  console.log(`\n  Deck size: ${inputs.length}' × ${inputs.width}'  (${decking.sqFt} sq ft)`);
  console.log(`  Joist spacing: ${inputs.joistSpacing}" OC   Posts: ${inputs.postCount}`);
  console.log(`  Decking: ${inputs.species.label}\n`);

  // --- MATERIALS ---
  console.log('  MATERIALS');
  console.log('  ' + divider);
  console.log(line('Decking boards', `${decking.boardCount} boards / ${decking.lfNeeded} lf`));
  console.log(line('  → material cost', usd(decking.cost)));
  console.log(line('Framing lumber', `${framing.totalLf} lf total`));
  console.log(line('  Rim joists', `${Math.ceil(framing.rimLf)} lf`));
  console.log(line('  Joists', `${framing.joistCount} joists × ${inputs.width}' = ${Math.ceil(framing.joistLf)} lf`));
  console.log(line('  Beam (doubled)', `${Math.ceil(framing.beamLf)} lf`));
  console.log(line('  Posts (4×4, 8\')', `${Math.ceil(framing.postLf)} lf`));
  console.log(line('  → material cost', usd(framing.cost)));
  console.log(line('Concrete footings', `${concrete.bagCount} bags (${concrete.totalCf} cu ft)`));
  console.log(line('  → material cost', usd(concrete.cost)));
  console.log(line('Hardware', ''));
  console.log(line('  Decking screws', `${hardware.screwLbs} lb`));
  console.log(line('  Joist hangers', `${hardware.joistHangers}`));
  console.log(line('  Post bases', `${hardware.postBases}`));
  console.log(line('  Ledger bolts', `${hardware.ledgerBolts}`));
  console.log(line('  Beam hangers', `${hardware.beamHangers}`));
  console.log(line('  Hurricane ties (H2.5AZ)', `${hardware.hurricaneTies}`));
  console.log(line('  → hardware cost', usd(hardware.cost)));

  const materialTotal = decking.cost + framing.cost + concrete.cost + hardware.cost;
  console.log('\n  ' + divider);
  console.log(line('MATERIALS SUBTOTAL', usd(materialTotal)));

  // --- LABOR ---
  if (labor) {
    console.log('\n  LABOR');
    console.log('  ' + divider);
    labor.tasks.forEach(t => {
      console.log(line(`  ${t.name}`, `${t.hours.toFixed(1)} hrs  ${usd(t.cost)}`));
    });
    console.log('\n  ' + divider);
    console.log(line(`LABOR SUBTOTAL  (${labor.totalHours.toFixed(1)} hrs @ $${inputs.hourlyRate}/hr)`, usd(labor.totalCost)));

    // --- GRAND TOTAL ---
    const grand = materialTotal + labor.totalCost;
    console.log('\n' + '═'.repeat(52));
    console.log(line('GRAND TOTAL', usd(grand)));
    console.log('═'.repeat(52) + '\n');
  } else {
    console.log('\n  [Labor calculation not yet implemented — see lib/labor.js]\n');
  }
}

module.exports = { printReport };
