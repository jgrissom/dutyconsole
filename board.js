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
  // Haldane keeps UTC, which plenty of Antarctic stations do — down there every
  // meridian is a few hundred meters away, so a local time zone is a choice
  // rather than a fact. It is hours off from anyone reading this, and quietly
  // says so. (The duty console program keeps the same clock: DateTime.UtcNow.)
  var OFFSET_HOURS = 0;

  var el = document.getElementById('clock');
  if (!el) return;

  function pad(n) { return n < 10 ? '0' + n : String(n); }

  // The colons are their own spans so CSS can blink them at 1Hz — that is what
  // reads as "running" from the back of a room. Only generated digits go in
  // here, never anything from the page or the URL.
  var SEP = '<span class="sep">:</span>';

  function tick() {
    var t = new Date(Date.now() + OFFSET_HOURS * 3600000);
    el.innerHTML =
      pad(t.getUTCHours()) + SEP + pad(t.getUTCMinutes()) + SEP + pad(t.getUTCSeconds());
  }

  tick();
  setInterval(tick, 1000);
})();
