import { readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const pluginDirectory = join(root, "plugins", "file-studio");
const packagePath = join(pluginDirectory, "atlas-plugin-file-studio.atlas-plugin.json");
const manifest = JSON.parse(await readFile(join(pluginDirectory, "atlas-plugin.json"), "utf8"));
const pluginPackage = JSON.parse(await readFile(packagePath, "utf8"));

Object.assign(pluginPackage.plugin, {
  name: manifest.name,
  nameI18n: manifest.nameI18n,
  version: manifest.version,
  description: manifest.description,
  descriptionI18n: manifest.descriptionI18n,
});

for (const entry of pluginPackage.files) {
  if (["atlas-plugin.json", "index.html", "styles.css"].includes(entry.path)) {
    entry.content = await readFile(join(pluginDirectory, entry.path), "utf8");
  }
}

await writeFile(packagePath, `${JSON.stringify(pluginPackage, null, 2)}\n`, "utf8");
console.log(`Updated ${packagePath}`);
