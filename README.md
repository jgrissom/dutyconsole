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
week-03.html    the board as it stood in week 3
week-NN.html    … one per week, 03 through 16
CNAME           dutyconsole.com
```

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

- **Week 1 is the week of Monday 17 August 2026.** The anchor is the **Monday** — the
  class weekday is Mon/Tue/Wed and unsettled, so the board turns over at the earliest
  possible moment. Early is the safe direction.
- Anything before week 3 clamps to `week-03.html` (the site debuts in week 3);
  anything past the end clamps to `week-16.html`.
- **`?week=7` forces any board on any date.** That is the supported way to rehearse
  ahead — *never move the anchor to preview a week.*

**Each week's board is written when that week is built**, not live during term. A
weekly chore during a semester that is also being taught and graded is the kind of
cost that quietly gets dropped by week 6.

The archive is worth keeping: pulling up week 3's board in week 10 shows the same
station with a tenth of the data — the course's persistence arc, visible.

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

## Adding a week

1. Copy the previous week's file to `week-NN.html`.
2. Change the log, the board, and the numbers. Same station, further along — **more
   data, more durable**, no plot. Nothing may require the previous week's fiction to
   be remembered.
3. Commit and push. `index.html` picks it up on the right Monday; nothing else to do.
