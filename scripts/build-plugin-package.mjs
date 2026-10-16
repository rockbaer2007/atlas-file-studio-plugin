import { readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const pluginDirectory = join(root, "plugins", "file-studio");
const packagePath = join(pluginDirectory, "atlas-plugin-file-studio.atlas-plugin.json");
const repositoryPath = join(root, "repository.json");
const manifest = JSON.parse(await readFile(join(pluginDirectory, "atlas-plugin.json"), "utf8"));
const packageSource = await readFile(packagePath, "utf8");
const repositorySource = await readFile(repositoryPath, "utf8");
const pluginPackage = JSON.parse(packageSource);
const repository = JSON.parse(repositorySource);
const checkOnly = process.argv.slice(2).includes("--check");
if (process.argv.slice(2).some(argument => argument !== "--check")) {
  throw new Error("Usage: node scripts/build-plugin-package.mjs [--check]");
}
const repositoryEntries = repository.plugins.filter(entry => entry.id === manifest.id);
if (repositoryEntries.length !== 1 || pluginPackage.plugin.id !== manifest.id) {
  throw new Error("Manifest, package and exactly one catalog entry must identify the same plugin");
}

const metadata = {
  name: manifest.name,
  nameI18n: manifest.nameI18n,
  version: manifest.version,
  description: manifest.description,
  descriptionI18n: manifest.descriptionI18n,
};
Object.assign(pluginPackage.plugin, metadata);
const catalogEntry = repositoryEntries[0];
const catalogChanged = Object.entries(metadata).some(([key, value]) =>
  JSON.stringify(catalogEntry[key]) !== JSON.stringify(value));
if (catalogChanged) {
  if (!/^\d+$/.test(repository.version) || !Number.isSafeInteger(Number(repository.version) + 1)) {
    throw new Error("Repository revision must be a safe numeric string");
  }
  Object.assign(catalogEntry, metadata);
  repository.version = String(Number(repository.version) + 1);
}

const textExtensions = new Set([".css", ".html", ".js", ".json", ".md", ".svg", ".txt"]);
const packagedPaths = new Set(pluginPackage.files.map(entry => entry.path));
const iconsDirectory = join(pluginDirectory, "icons");

for (const entry of await readdir(iconsDirectory, { withFileTypes: true })) {
  const path = `icons/${entry.name}`;
  if (entry.isFile() && entry.name.toLowerCase().endsWith(".svg") && !packagedPaths.has(path)) {
    pluginPackage.files.push({ path, content: "" });
  }
}

for (const entry of pluginPackage.files) {
  const content = await readFile(join(pluginDirectory, entry.path));
  if (textExtensions.has(extname(entry.path).toLowerCase())) {
    entry.content = content.toString("utf8");
    delete entry.contentEncoding;
  } else {
    entry.content = content.toString("base64");
    entry.contentEncoding = "base64";
  }
}

const packageOutput = `${JSON.stringify(pluginPackage, null, 2)}\n`;
const repositoryOutput = `${JSON.stringify(repository, null, 2)}\n`;
if (checkOnly) {
  if (packageOutput !== packageSource || repositoryOutput !== repositorySource) {
    throw new Error("Plugin artifacts are stale; run node scripts/build-plugin-package.mjs");
  }
  console.log(`Verified manifest, package and catalog: ${manifest.version}`);
} else {
  await writeFile(packagePath, packageOutput, "utf8");
  await writeFile(repositoryPath, repositoryOutput, "utf8");
  console.log(`Updated package and catalog: ${manifest.version}`);
}
