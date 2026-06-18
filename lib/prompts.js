const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function ask(question) {
  return new Promise(resolve => rl.question(question, answer => resolve(answer.trim())));
}

async function askNumber(label, defaultVal) {
  const raw = await ask(`  ${label} [${defaultVal}]: `);
  const n = parseFloat(raw);
  return isNaN(n) ? defaultVal : n;
}

async function askChoice(label, choices) {
  choices.forEach((c, i) => console.log(`    ${i + 1}. ${c.label}  ($${c.price.toFixed(2)}${c.unit})`));
  const raw = await ask(`  ${label} [1]: `);
  const idx = parseInt(raw) - 1;
  return choices[idx] ?? choices[0];
}

function close() { rl.close(); }

module.exports = { ask, askNumber, askChoice, close };
