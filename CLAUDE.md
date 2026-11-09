# Règles pour travailler sur ce dépôt

Ce dépôt pilote le site WordPress guide-canin.fr (guide pratique sur les chiens, non monétisé). Lire README.md pour le fonctionnement.

## Interdits absolus

- **Ne jamais changer un slug existant** (nom de fichier, champ `slug`, slug de rubrique). Pas de 301, jamais.
- **Ne jamais changer la rubrique d'un article existant** : sur ce site, la rubrique fait partie de l'URL (`/sante/premiers-secours/slug/`). La synchro s'arrête si cela arrive.
- Ne jamais supprimer un fichier de content/ dont l'URL figure dans urls.csv. Ne jamais éditer urls.csv à la main.
- Lancement progressif : un contenu `origin: import` n'est jamais envoyé vers WordPress, il reste en ligne tel quel jusqu'à sa réécriture. Réécrire par lots, les plus visités d'abord (export Search Console), les contenus hors sujet (chevaux, chats, voyages en Allemagne…) recentrés sur le chien en dernier.
- Un doublon se consolide par `canonical_overrides` (config/site.yml), jamais par redirection.

## Écriture

Suivre les skills **`guide-canin-contenu`** (cycle commun) et **`guide-canin-types-articles`** (modèles dans `templates/`), et **`veille-et-publication`** pour la veille (`veille/`) et la programmation (`status: future`).

- Signature : « La rédaction de Guide Canin ». Vouvoiement. Aucun lien d'affiliation.
- Santé : jamais de dose de médicament, toujours un renvoi au vétérinaire ; sources vétérinaires citées.
- Un article réécrit garde `slug`, `wp_id`, `date`, `url` et `categories`, et passe à `origin: rewrite`.

## Avant de pousser

- `python scripts/validate.py` sans erreur.
- `python scripts/style_check.py --strict <fichiers modifiés>` sans alerte bloquante.
