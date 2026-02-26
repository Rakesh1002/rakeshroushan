# Portfolio dashboard (manage 30+ startups without chaos)

## The rule

You can only **actively run** a small number of startups at once.

Recommended:
- **Tier A (3)**: active CEO focus (weekly update required)
- **Tier B (5–10)**: maintain / delegate (biweekly update)
- **Tier C (rest)**: parked / backlog (monthly review)

Set tiers in `os/startups/portfolio.csv` (column `tier`), then review on cadence.

## Active list (manual for now)

Tier A:
- [ ] 
- [ ] 
- [ ] 

Tier B:
- [ ] 

Tier C:
- [ ] 

## Weekly portfolio review checklist (30 min)

- [ ] Update `os/metrics/scoreboard.csv`
- [ ] For each Tier A startup:
  - [ ] update `os/startups/<slug>/weekly-update.md`
  - [ ] update `os/startups/<slug>/scoreboard.csv`
- [ ] Decide: **keep / pause / stop** for anything drifting
- [ ] Pick 1 distribution bet for the week (content, partnerships, channels)

## Registry (source of truth)

- `os/startups/portfolio.csv`
- Website pulls from `os/public/startups.json` (generated from the registry)



