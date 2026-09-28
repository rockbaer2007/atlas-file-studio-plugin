import { readFile, writeFile } from "node:fs/promises";
import { dirname, extname, join, resolve } from "node:path";
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

const textExtensions = new Set([".css", ".html", ".js", ".json", ".md", ".svg", ".txt"]);

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

await writeFile(packagePath, `${JSON.stringify(pluginPackage, null, 2)}\n`, "utf8");
console.log(`Updated ${packagePath}`);
