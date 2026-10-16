# File Studio 0.1.52 verification

2026-10-16. Fix the external repository catalog/package version mismatch.
No ATLAS App, Home Assistant, production Pi 5 or Proxmox changes.

## Backup and implementation

- Before edits, retain Git bundles for this repository and public documentation,
  plus exact original catalog, manifest and install package outside Git under
  source/backups/file-studio-version-sync-20261016.
- Original catalog0.1.50 disagreed with manifest/package0.1.51. The package builder
  only synchronized package metadata. Make the manifest the shared metadata
  source for both package and the single matching catalog entry.
- Release0.1.52 consistently across manifest, package, embedded manifest, README
  and catalog; catalog revision30->31. Preserve ID, compatibility, capabilities,
  entry/asset paths and other catalog metadata. No UI/data-format change.
- Add read-only --check for stale artifacts; repeated builds leave both outputs
  and catalog revision unchanged. Refuse foreign/missing/duplicate IDs before
  writing either artifact. CI checks committed artifacts BEFORE generation.
- Four automated regression tests pass, covering original drift, catalog-only
  drift, source-asset drift, repeatability, preserved binary bytes/unrelated
  catalog entries and refusal of ambiguous identities without mutation.

## Isolated integration qualification

- Use a fresh private data root and loopback App port plus own ephemeral surface
  readiness/HA-version metadata stubs. No live HA or production configuration is
  used; this is not native browser or HA authentication qualification.
- Load actual legacy install packages through ATLAS's existing parser. Reproduce
  the original catalog/package mismatch. The new catalog and parsed0.1.52 package
  match. Install actual0.1.51 as baseline and an unrelated sibling plugin.
- Seed synthetic Administration preferences, named server project, YAML/binary
  files, a prior YAML version and a trash item. Stop the App, archive the complete
  fixture to PC, inspect the tar listing and restart before applying the update.
- A real backend compatibility preview passes without overriding unknown or
  unsupported requirements; it preserves every fixture file/state revision.
- Update51->52, restore original51 through the guarded recovery API, re-update52
  and restart. Each installed version matches all86 package assets exactly.
  Launch resolves to a served File Studio page. Original settings/config/binary,
  sibling files, complete project, history/trash IDs and content remain exact.
  Shared state changes only File Studio version and expected revision counters.
- The first harness attempt seeded missing capabilities and encountered ATLAS's
  documented metadata enrichment. Correct the fixture to retain the manifest's
  actual15 capabilities before the successful fresh run; do not change ATLAS or
  relax the final preservation comparison. Preserve both own attempt directories.
- Keep source and full fixture backups, proof JSON/logs and stopped test data.
  All child processes/readiness servers stop after success. Four build tests,
  artifact checks and whitespace validation pass; DE/EN/FR public notes updated.

No automatic data migration, browser-storage transfer, native installation or
universal third-party plugin rollback is claimed. Production hosts remain intact.
