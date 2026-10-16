# File Studio 0.1.52 verification

2026-10-16. Fix the external repository catalog/package version mismatch.
The initial implementation and qualification were isolated. Native qualification
on Proxmox and Pi 5 followed separately on the same day, as recorded below.

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

## Native update and recovery qualification

- Create fresh local HA backups before any update: Proxmox a58a397d (4.67 GB,
  HA settings/history and ATLAS) and Pi 5 a6c88fcd (134.08 MB, HA settings/history
  and all three installed apps). Both completed at 17:07 CEST on 2026-10-16.
  HA used the generic Custom backup name despite the requested custom label.
  Additional Proxmox cloud/SFTP destinations were not selected.
- Retain PC Git bundles, full persistent plugin-root archives, original served
  plugin packages, selected HA YAML/Lovelace/integration files and before/after
  hashes under source/backups/file-studio-052-native-20261016. Do not claim these
  selective PC copies are complete downloadable HA backups.
- Use the real Administration repository update and guarded recovery dialogs.
  Proxmox passes 0.1.50 -> 0.1.52 -> original 0.1.50 -> 0.1.52. Pi 5 passes
  0.1.51 -> 0.1.52 -> original 0.1.51 -> 0.1.52. Compatibility passes without
  overrides on ATLAS App 0.1.312 and authenticated HA 2026.10.1.
- All 86 final served assets match the published package after the existing
  Runtime parser's UTF-8 string trim; original recovery matches all 85 Proxmox
  and 86 Pi assets byte-for-byte. The first strict harness caught the trailing
  README newline normalization; inspect the existing parser before adjusting
  the private expectation. No product change or content repair was needed.
- Compare every original persistent file outside the replaced plugin and shared
  management state. Preserve bytes and modification times, except that the
  unchanged .removed-plugins.json is rewritten with a new modification time.
  Shared state changes only File Studio version, declared capability/compatibility
  metadata and revision. Old descriptors gain the catalog's HA >=2026.8 rule.
  New files are only normal recovery/management backup records; retain them.
- Preserve six active plugins, complete named server project on each host,
  Terminal configuration, both trash entries and all twelve history files.
  Selected HA YAML, Lovelace and integration files remain exact. App boot times,
  HA version, Administration language/theme, approved paths and connection
  settings remain unchanged. Do not inspect or print raw connection secrets.
- Open File Studio on both hosts, read scenes.yaml without editing or saving,
  and pass YAML basic validation. Save visible version and backup evidence.
  No App, HA or host restart is required or performed for these plugin updates.

No automatic data migration, browser-storage transfer, complete HA restore or
universal third-party plugin rollback is claimed by this native test.
