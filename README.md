# dutyconsole.com — Haldane Station's duty console

The in-fiction intranet for **Haldane Station**, the demonstration world of a college
.NET database course. Static site, GitHub Pages, no build step.

> **This is not course material.** Nothing is graded from it, no lab or homework links
> to it, and no grader or script resolves a path into this repo. It is flavour. The
> course itself lives in `dotnet-db-dev` (public) and `dotnet-db-dev-answer-keys`
> (private) — its authoring rules are in the latter's `CLAUDE.md`.

## What's here

```
index.html      router — picks the current week by date and redirects
about.html      the only page that steps outside the fiction
404.html        safety net — walks down to the last board that exists
board.css       shared styling for every board
board.js        the station clock
favicon.svg     amber H on the board's dark panel; PNG fallbacks beside it
week-01.html    the board as it stood in week 1
week-NN.html    … one per week, 01 through 16
CNAME           dutyconsole.com  ← DO NOT DELETE, see below
```

> ⚠️ **`CNAME` is not a DNS record, and it is load-bearing.** It is GitHub Pages' own
> convention for *"this site's domain is…"*, read on every build. **Delete it and the
> next build drops `dutyconsole.com`**, taking the certificate with it.
>
> It is unrelated to the `CNAME` **record type** in DNS — which cannot sit at a root
> domain, which is exactly why the apex here uses A records. Same word, different
> things, and the collision is GitHub's fault rather than yours.
>
> GitHub also **rewrites this file itself** whenever the custom domain is changed in
> Pages settings. That is where any surprising `Create CNAME` / `Delete CNAME` commits
> in the history come from — and why a `git pull` may be needed before your next push.

**Every board is a strict superset of the one before**, and that is the whole idea:
the console fills up as the students' program does. Week 1 is the six values week 1's
demo computes and nothing else. The generator arrives in week 2, the sign-out board
and the log in week 3 — the week the course meets `List<T>` and the station can have
things there are *many* of.

⚠️ **Never backfill a later panel into an earlier week**, and never restyle one week:
they differ by what they contain, not by how they look. It is the same console all term.

⚠️ **No generator panel on week 1**, deliberately. Week 1's demo break is `4300 / 800`
printing `5` instead of `5.375`, found in silence. A fuel countdown on the board as
students walk in hands them the answer.

### The board is in-fiction and never explains itself

It is the screens a duty officer looks at — status, sign-out board, log, standing
orders, crew. Not a wiki *about* the station. The world is conveyed by **seeding data,
never by narrating it**: three rows of a sign-out board teach more than a paragraph
would, and the paragraph would break the register.

Sign-out reasons come from a closed list of six — `MET RUN`, `DIG OUT`, `FUEL`,
`FIELD`, `COMMS`, `WALK` — defined in the course's `CLAUDE.md`. **Don't invent a
seventh here.** Searching for someone who hasn't returned is deliberately not on it.

### How the weekly boards work

`index.html` runs a few lines of JS: it works out the current week from the date and
`location.replace()`s to that week's file.

- **Terms are a list**, so the site survives being reused. Add one line per semester
  and **never edit a term that has already run** — its start date is what "week 5"
  meant to the people who were there.
- The anchor is each term's **Monday**. The class weekday is Mon/Tue/Wed and unsettled,
  so the board turns over at the earliest moment it could be needed. Early is safe.
- **`LATEST` is the highest board that actually exists.** Bump it in the same commit
  that adds one, or the router points at a file that was never written.
- **`short: true`** on a term marks a 15-week run: week 15 is the droppable flex week
  and week 16 must work as week 15, so calendar week 15 shows board 16.
- Before a term starts it clamps to `week-01.html`; after one ends it holds at the last
  board until the next term's Monday.
- **`?week=7` forces any board on any date**, ignoring `LATEST`. That is the supported
  way to rehearse ahead — *never move an anchor to preview a week.*

### Nothing missing is ever visible

`404.html` is the safety net for a forgotten `LATEST`. GitHub Pages serves it for any
unmatched path, and it **walks down** — a missing `week-07.html` tries 06, then 05, and
so on until it finds a board that exists. It terminates by construction, and it never
retries the page that just failed.

⚠️ **Its redirects are root-absolute on purpose.** A relative one resolves against the
failed path, so a 404 at `/some/nonsense` would send a visitor to
`/some/week-01.html` — which 404s in turn. That was a real bug, caught in testing.

**Each week's board is written when that week is built**, not live during term. A
weekly chore during a semester that is also being taught and graded is the kind of
cost that quietly gets dropped by week 6.

⭐ **`week-11.html` is the one exception — it is written *after* its session.** Week 11
is the shared-table night, when every terminal in the room writes to one duty log, and
that board is a **curated snapshot of what the class actually wrote**. Curated, because
it is student-typed text and nothing reaches this site unreviewed. A live API serving
the real log was considered and declined for exactly that reason, among others — see
`CLAUDE.md`, *The shared-table payoff*.

The archive is worth keeping: pulling up week 3's board in week 10 shows the same
station with a tenth of the data — the course's persistence arc, visible.

### about.html — the one page allowed to explain

Linked from every board's footer, and **the reason the boards themselves never have to
explain anything.** A student who doesn't get it needs a door; without one the only
options are a confused student or exposition on the console.

It covers: the station is invented, why a terminal is the setting rather than a
limitation, who the Haldanes were, why the board grows, and — stated plainly — that
**nothing here is graded, submitted, or a hint.**

⚠️ **It is written for students, not as a design document.** Students read this page.
Keep out anything that spends a moment the course hasn't spent yet: the deliberate
breaks, why a given panel arrives in the week it does, what the checks turn into, and
anything about the lab's world. If it would land better as a surprise in class, it does
not belong here.

No clock on it — the clock belongs to the console.

### The icon

An amber **H** on the board's dark panel, **drawn as plain rectangles rather than as
text in a font** — a `<text>` favicon renders differently on every machine and can fall
back to something unrecognisable. Rects are identical everywhere.

⚠️ **It was designed at 16px, which is the only size that matters.** A version with the
banner's `====` rules around the H looked much better at 64px and collapsed into an
unreadable blob in an actual tab. If you redraw it, judge it in a browser tab, not on a
canvas.

`favicon.svg` is the real one; `favicon-32.png` and `apple-touch-icon.png` are fallbacks
for older browsers and iOS, rendered from the same SVG.

## Hosting

**Static, because nothing here needs a server** — no input, no auth, no per-user
state, the same bytes for everyone. It is a document. Azure was considered and
declined: a subscription can lapse or want attention mid-semester and buys nothing
this page uses.

### DNS — GoDaddy

GoDaddy supports neither `ALIAS` nor `ANAME`, and a `CNAME` cannot sit at the root,
so the apex needs **A records**. This is GitHub's own documented setup, and with both
apex and `www` configured GitHub Pages creates the redirect between them automatically.

| Type | Name | Value |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `jgrissom.github.io` |

Optional IPv6, same `@` name: `2606:50c0:8000::153`, `2606:50c0:8001::153`,
`2606:50c0:8002::153`, `2606:50c0:8003::153`.

> ⚠️ **These IPs are GitHub's and have changed once historically** (the old
> `192.30.252.x` block). If the site ever stops resolving, re-read GitHub's current
> docs before assuming anything else is wrong — and never paste them from memory.

Then in the repo: **Settings → Pages → Custom domain → `dutyconsole.com`**, and tick
**Enforce HTTPS** once the certificate is issued (it can take a few minutes to an
hour). The `CNAME` file in this repo holds the same value.

## The header rules are 160 `=` on purpose

⚠️ **Don't "tidy" them back to something that looks right in the source.** `.rule` is
`white-space:pre; overflow:hidden`, so the run is meant to be **longer than the widest
header and get clipped** — that is what makes it span the row at every viewport instead
of stopping short on a desktop. At 860px wide and 12px monospace the header needs about
115 characters; 160 leaves ~45 of slack so a different monospace fallback can't leave a
gap. They carry `aria-hidden="true"` because they are decoration, and a screen reader
reading 160 equals signs is not decoration.

*(They were 40 until 2026-08-07, which stopped well short of the right-hand edge.)*

## Adding a week

1. Copy the previous week's file to `week-NN.html`. **Start from the previous week so
   the superset rule holds by construction** — never from an older one. This is also how
   the 160-character header rules propagate; don't retype them.
2. Change the numbers and the log, and add whatever panel that week has earned. Same
   station, further along — **more data, more durable**, no plot. Nothing may require
   the previous week's fiction to be remembered.
3. Update the HTML comment at the top saying what this week added and why.
4. ⚠️ **Bump `LATEST` in `index.html`** to the week you just added. This is the one
   step that is easy to forget and the whole reason `404.html` exists.
5. Commit and push. `index.html` picks it up on the right Monday; nothing else to do.

**Every panel carries a `logged HH:MM` stamp**, and the header carries a live clock.
That contrast is deliberate: the clock is the only live thing on the console, and
everything else is a reading somebody wrote down at a watch change. It is what makes
the board's staleness read as designed — including week 3, where the sign-out board is
`as at 14:57` and the log at 14:58 says Reyes is already back.
