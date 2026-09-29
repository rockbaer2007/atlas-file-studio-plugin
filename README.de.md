# ATLAS File Studio Plugin

**Sprachen:** [Deutsch](README.de.md) · [English](README.md) · [Français](README.fr.md)

ATLAS File Studio ist ein unabhängiges ATLAS-Plugin für die Dateiverwaltung in freigegebenen Home-Assistant-Pfaden.

Die Toolbar verwendet lokale SVG-Symbole. Binärdateien im Installationspaket werden Base64-kodiert, damit sie bei der Installation unverändert bleiben.

Die Oberfläche bietet DE/EN/FR. Französisch umfasst derzeit Kopfzeile, zentrale Werkzeugleisten-Steuerelemente und Upload-Hinweise; Dialoge und Meldungen der Dateiabläufe sind noch nicht vollständig lokalisiert.

In der Bildvorschau lassen sich SVG-, PNG-, JPG/JPEG- und WebP-Dateien an das separat installierte ATLAS Icon Studio übergeben. Die Datei öffnet sich in einem neuen Tab. Die Übergabe nutzt einen kurzlebigen Schlüssel im lokalen Browser und den bereits freigegebenen File-Studio-Dateizugriff; die Datei wird nicht hochgeladen oder dupliziert.

## Freigabeanzeige

File Studio zeigt aktive Dateifreigaben in einem kompakten Hinweisfeld mit normaler, etwas kleinerer Schrift. Jeder freigegebene Pfad ist farblich gekennzeichnet. So lassen sich beispielsweise `/config/www`, `/addons` und `/parent-of-config` schneller unterscheiden.

Weitere Informationen und Installation: [englische README](README.md).
