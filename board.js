/* Haldane Station duty console — the station clock.
 *
 * The ONLY live thing on the board, and deliberately so. Everything else is a
 * hand-logged reading: the status panel says outright that the board is updated
 * by hand at each watch change and that the instrument wins when they disagree.
 * A drifting temperature would contradict that — it would mean the board updates
 * itself. One ticking clock on a board of stale numbers is what a real duty
 * board looks like, and it is what makes the console read as *on* rather than
 * as a document.
 *
 * ⚠️ Do not add live data here. Fetching real weather was considered and
 * declined: it is the only thing that would point outside the fiction, and the
 * board's numbers have to keep matching what the demo types on screen.
 *
 * No API, no network, nothing that can fail. If the script does not run, the
 * clock span keeps its "--:--:--" placeholder and the board is otherwise whole.
 */

(function () {
  // Haldane keeps UTC+5, like the real plateau stations at this longitude —
  // which is hours off from anyone reading this, and quietly says so.
  var OFFSET_HOURS = 5;

  var el = document.getElementById('clock');
  if (!el) return;

  function pad(n) { return n < 10 ? '0' + n : String(n); }

  function tick() {
    var t = new Date(Date.now() + OFFSET_HOURS * 3600000);
    el.textContent =
      pad(t.getUTCHours()) + ':' + pad(t.getUTCMinutes()) + ':' + pad(t.getUTCSeconds());
  }

  tick();
  setInterval(tick, 1000);
})();
