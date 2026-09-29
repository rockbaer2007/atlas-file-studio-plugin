# ATLAS File Studio

Plugin ID: `atlas.plugin.file-studio`

<img src="icon.svg" alt="ATLAS File Studio icon" width="96" height="96">

Version: `0.1.51`

ATLAS File Studio prepares a scoped Home Assistant file editor:

- file tree
- editor surface
- image preview for PNG, JPG/JPEG, SVG, GIF, WebP, BMP and ICO\n- ZIP content preview without extraction
- image preview for PNG, JPG/JPEG, SVG, GIF, WebP, BMP and ICO
- open SVG, PNG, JPG/JPEG and WebP images directly in the external ATLAS Icon Studio
- ZIP content preview without extraction
- syntax highlighting
- YAML validation
- upload and download
- direct deep links to files, including export folders below `/config`
- `/config` as default root
- `/addons` only after Administration approval
- no free root access by default

In the image preview, use **Open with Icon Studio** to send supported files to the separately installed Icon Studio plugin. Raster files open there as previews; simple SVG path files are imported into its monochrome icon set. Both plugins must run on the same ATLAS server. The handoff uses a short-lived key in this browser and the approved File Studio file endpoint; the file itself is not copied or uploaded.
