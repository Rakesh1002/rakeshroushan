# GitHub Actions (optional)

If you choose to use GitHub for this repo, add workflows that:

- Run `node os/automation/scripts/sync-web-content.mjs`
- Run `npm --prefix web/rr run lint`
- (optional) Run `npm --prefix web/rr run build`

This keeps the website always consistent with `os/public/`.


