// Labor estimation for a deck build
// Tasks: layout/footings, framing, decking, trim/finishing
//
// TODO: Implement calcLabor() below.
//
// Parameters:
//   sqFt        - total deck square footage
//   footingCount - number of concrete footings to dig & pour
//   joistCount  - number of joists (affects framing time)
//   hourlyRate  - labor cost per hour (dollars)
//
// Return an object with:
//   tasks   - array of { name, hours, cost }
//   totalHours
//   totalCost
//
// Design choice: should hours for "footings" scale by footingCount
// (e.g. 1.5 hrs each), and "framing" scale by joistCount (e.g. 0.25 hrs each),
// while "decking" and "finishing" scale by sqFt?
// Or keep everything sqFt-based for simplicity?
// Industry rule of thumb: ~0.15–0.20 labor hrs per sq ft for decking install,
// ~0.10 hrs/sqFt for framing, 1.5 hrs per footing, 1 hr flat for layout.

function calcLabor(sqFt, footingCount, joistCount, hourlyRate) {
  const tasks = [
    { name: 'Layout & site prep',  hours: 1 + footingCount * 0.5  },
    { name: 'Footings (dig+pour)', hours: footingCount * 1.5       },
    { name: 'Framing',             hours: joistCount * 0.25 + 2    },
    { name: 'Decking install',     hours: sqFt * 0.17              },
    { name: 'Trim & finishing',    hours: sqFt * 0.04              },
  ].map(t => ({ ...t, cost: t.hours * hourlyRate }));

  const totalHours = tasks.reduce((s, t) => s + t.hours, 0);
  const totalCost  = totalHours * hourlyRate;
  return { tasks, totalHours, totalCost };
}

module.exports = { calcLabor };
