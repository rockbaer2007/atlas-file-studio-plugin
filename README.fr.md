# Plugin ATLAS File Studio

**Langues :** [Deutsch](README.de.md) · [English](README.md) · [Français](README.fr.md)

ATLAS File Studio est un plugin indépendant d'ATLAS pour gérer les fichiers dans les chemins Home Assistant autorisés.

La barre d’outils utilise des icônes SVG locales. Les fichiers binaires du paquet d’installation sont encodés en Base64 afin de rester intacts lors de l’installation.

Le sélecteur propose l’allemand, l’anglais et le français. La traduction française couvre actuellement l’en-tête, les principaux contrôles de la barre d’outils et les avis d’envoi ; les dialogues et messages des opérations sur les fichiers ne sont pas encore tous traduits.

Dans l’aperçu d’image, les fichiers SVG, PNG, JPG/JPEG et WebP peuvent être transmis à ATLAS Icon Studio, installé séparément. Le fichier s’ouvre dans un nouvel onglet. Le transfert utilise une clé temporaire dans le navigateur et l’accès aux fichiers déjà autorisé de File Studio ; le fichier n’est ni envoyé ni dupliqué.

## Indicateur d'accès

File Studio affiche les autorisations de fichiers actives dans un encadré compact, avec une typographie normale et légèrement plus petite. Chaque chemin autorisé possède une couleur distincte. Les chemins tels que `/config/www`, `/addons` et `/parent-of-config` sont ainsi plus faciles à distinguer.

Pour plus d'informations et l'installation : [README en anglais](README.md).
