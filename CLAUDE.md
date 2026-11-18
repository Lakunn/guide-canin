# Règles pour travailler sur ce dépôt

Ce dépôt pilote le site WordPress guidecanin.fr (guide pratique sur les chiens, non monétisé). Lire README.md pour le fonctionnement.

## Interdits absolus

- **Ne jamais changer un slug existant** (nom de fichier, champ `slug`, slug de rubrique). Pas de 301, jamais.
- **Domaine : guidecanin.fr, sans tiret.** guide-canin.fr est un site tiers, sans lien avec ce dépôt : ne jamais l'importer ni s'en inspirer.
- Les articles sont servis en `/slug/` : changer de rubrique ne change pas l'URL, mais garder les rubriques existantes (`accessoires-chien`, `education-canine`, `race-de-chien`…) telles que l'import les relève.
- Ne jamais supprimer un fichier de content/ dont l'URL figure dans urls.csv. Ne jamais éditer urls.csv à la main.
- Lancement progressif : un contenu `origin: import` n'est jamais envoyé vers WordPress, il reste en ligne tel quel jusqu'à sa réécriture. Réécrire par lots, les plus visités d'abord (export Search Console).
- Un doublon se consolide par `canonical_overrides` (config/site.yml), jamais par redirection.

## Écriture

**Pause des nouveaux articles depuis le 18/11/2026** : on réécrit d'abord les 17 contenus importés, dans l'ordre de `keywords/reecritures.md`. Aucun nouvel article tant que cette file n'est pas vide.

Les sujets de fond viennent de la carte des mots-clés (`config/keywords.yml`, `keywords/calendrier.md`), régénérée le 1er du mois ; l'actualité, de `veille/`. Voir l'étape 0 du skill de contenu.

Suivre le skill **`guide-canin-contenu`** (matière par pôle : études scientifiques, avis et UGC, livres d'éducateurs ; modèles de `templates/` ; veille `veille/` et programmation `status: future`) et sa grille `algoproof.md` (`.claude/skills/guide-canin-contenu/`).

- Signature : « La rédaction de Guide Canin ». Vouvoiement. Aucun lien d'affiliation.
- Santé : jamais de dose de médicament, toujours un renvoi au vétérinaire ; sources vétérinaires citées.
- Un article réécrit garde `slug`, `wp_id`, `date`, `url` et `categories`, et passe à `origin: rewrite`.

## Avant de pousser

- `python scripts/validate.py` sans erreur.
- `python scripts/style_check.py --strict <fichiers modifiés>` sans alerte bloquante.
