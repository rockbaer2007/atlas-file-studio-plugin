import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { copyFileSync, mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

function fixture(t) {
  const root = mkdtempSync(join(tmpdir(), "file-studio-package-check-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const pluginRoot = join(root, "plugins", "file-studio");
  mkdirSync(join(pluginRoot, "icons"), { recursive: true });
  mkdirSync(join(root, "scripts"));
  const script = join(root, "scripts", "build-plugin-package.mjs");
  copyFileSync(new URL("./build-plugin-package.mjs", import.meta.url), script);
  const manifest = { id: "atlas.plugin.file-studio", name: "File Studio", version: "0.1.52", description: "fixture" };
  const manifestPath = join(pluginRoot, "atlas-plugin.json");
  const packagePath = join(pluginRoot, "atlas-plugin-file-studio.atlas-plugin.json");
  const repositoryPath = join(root, "repository.json");
  writeFileSync(manifestPath, JSON.stringify(manifest));
  writeFileSync(join(pluginRoot, "image.png"), Buffer.from([0, 255, 128, 13, 10]));
  writeFileSync(join(pluginRoot, "index.html"), "<h1>unchanged UI</h1>\r\n");
  writeFileSync(packagePath, JSON.stringify({ kind: "atlas.plugin.package", plugin: { ...manifest, version: "0.1.51" },
    files: ["atlas-plugin.json", "index.html", "image.png"].map(path => ({ path, content: "old" })) }));
  writeFileSync(repositoryPath, JSON.stringify({ kind: "atlas.plugin.repository", version: "30", plugins: [
    { ...manifest, version: "0.1.50", package: "./plugins/file-studio/package.json", compatibility: { atlas: ">=0.1.54" } },
    { id: "atlas.plugin.unrelated", version: "2.3.4", compatibility: { atlas: ">=0.1.312" } },
  ] }));
  const build = (...args) => execFileSync(process.execPath, [script, ...args], { encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] });
  const contents = () => [packagePath, repositoryPath].map(path => readFileSync(path, "utf8"));
  return { root, pluginRoot, manifest, manifestPath, packagePath, repositoryPath, script, build, contents };
}

test("synchronizes catalog, package and embedded manifest and preserves unrelated metadata/assets", t => {
  const f = fixture(t), before = JSON.parse(readFileSync(f.repositoryPath));
  f.build();
  const repo = JSON.parse(readFileSync(f.repositoryPath)), pkg = JSON.parse(readFileSync(f.packagePath));
  assert.equal(repo.version, "31");
  assert.equal(repo.plugins[0].version, f.manifest.version);
  assert.equal(pkg.plugin.version, f.manifest.version);
  assert.deepEqual(JSON.parse(pkg.files.find(file => file.path === "atlas-plugin.json").content), f.manifest);
  assert.deepEqual(repo.plugins[0].compatibility, before.plugins[0].compatibility);
  assert.deepEqual(repo.plugins[1], before.plugins[1]);
  for (const file of pkg.files) assert.deepEqual(Buffer.from(file.content, file.contentEncoding === "base64" ? "base64" : "utf8"), readFileSync(join(f.pluginRoot, file.path)));
  const built = f.contents();
  f.build(); f.build("--check");
  assert.deepEqual(f.contents(), built, "repeat builds do not change files or catalog revision");
});

test("read-only check rejects stale catalog or package without repairing them", t => {
  const f = fixture(t), before = f.contents();
  assert.throws(() => f.build("--check"), /artifacts are stale/);
  assert.deepEqual(f.contents(), before);
  f.build();
  const repo = JSON.parse(readFileSync(f.repositoryPath));repo.plugins[0].version = "0.1.50";
  writeFileSync(f.repositoryPath, JSON.stringify(repo, null, 2) + "\n");
  const stale = f.contents();
  assert.throws(() => f.build("--check"), /artifacts are stale/);
  assert.deepEqual(f.contents(), stale);
});

test("check detects a changed source asset even when metadata versions agree", t => {
  const f = fixture(t);f.build();const before = f.contents();
  writeFileSync(join(f.pluginRoot, "index.html"), "changed UI");
  assert.throws(() => f.build("--check"), /artifacts are stale/);
  assert.deepEqual(f.contents(), before);
});

test("foreign or duplicate catalog IDs fail before either artifact is written", t => {
  for (const duplicate of [false, true]) {
    const f = fixture(t), repo = JSON.parse(readFileSync(f.repositoryPath));
    if (duplicate) repo.plugins.push({ ...repo.plugins[0] });
    else repo.plugins[0].id = "atlas.plugin.foreign";
    writeFileSync(f.repositoryPath, JSON.stringify(repo));const before = f.contents();
    const result = spawnSync(process.execPath, [f.script], { encoding: "utf8" });
    assert.notEqual(result.status, 0);assert.match(result.stderr, /exactly one catalog entry/);
    assert.deepEqual(f.contents(), before);
  }
});
