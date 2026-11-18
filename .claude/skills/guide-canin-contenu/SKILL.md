---
name: guide-canin-contenu
description: "Créer ou réécrire un contenu pour guidecanin.fr : alimentation fondée sur les études scientifiques, accessoires et races fondés sur les avis d'utilisateurs et l'UGC réseaux sociaux, conseils d'éducation fondés sur les livres et contenus d'éducateurs ; brief SEO sémantique, rédaction humanisée, maillage, contrôle algoproof, veille et programmation."
---

# Contenu guidecanin.fr

Guide pratique sur les chiens, **non monétisé**. Domaine : guidecanin.fr, sans tiret (guide-canin.fr est un site tiers : ne jamais s'en inspirer). Lire `CLAUDE.md` puis la grille commune [`algoproof.md`](algoproof.md) : ce skill l'applique au chien.

Cycle en sept étapes, **dans l'ordre**. On ne rédige pas avant que Valentin ait validé le brief.

**Pause des nouveaux articles (depuis le 18/11/2026)** : prendre le prochain contenu de `keywords/reecritures.md`, pas le calendrier. Le calendrier sert seulement à choisir la requête principale de la réécriture.

## 0. Carte des mots-clés, veille et volumes (commun aux 4 sites)

- **Sujets de fond** : `config/keywords.yml` (calendrier lisible dans `keywords/calendrier.md`), régénéré le 1er du mois par le workflow « Carte des mots-clés » (`scripts/keyword_map.py`, identique dans les 4 dépôts ; graines, rubriques et exclusions dans `config/keyword_seeds.yml`). Prendre le prochain sujet du calendrier ; `statut: existe_peut_etre` = un article existant couvre peut-être déjà le sujet : vérifier et **mettre à jour** plutôt que créer.
- **Volumes** : la carte prend, dans l'ordre, `config/volumes.yml` (relevés Keyword Surfer), DataForSEO, Bing, sinon l'indice Google Suggest (« à relever »). Pour relever : `python scripts/keyword_map.py --a-relever` donne la liste ; dans le Chrome de Valentin, recherche google.fr de chaque requête, lecture du tableau « Keyword ideas » de Surfer ; **au plus ~30 recherches d'affilée** (au-delà Google affiche un CAPTCHA, qu'on ne résout jamais) ; consigner la formulation la plus recherchée et ses variantes dans `config/volumes.yml`, puis relancer le script (gratuit grâce au cache).
- **Actualité** : `veille/AAAA-MM-JJ.md` et `veille/plan.md` (workflow de veille, `scripts/veille.py` identique dans les 4 dépôts, flux dans `config/veille.yml`). Une règle, un prix ou une formalité qui change : mise à jour datée de l'article concerné avant tout nouvel article.
- Renseigner `keyword` (requête principale de la carte) et `keywords_secondaires` dans le front matter de chaque nouvel article : la carte suivante le marque alors `programme` ou `publie`.
- Récapitulatif chaque lundi par e-mail (n8n, `growww-site/deploy/n8n/`).

## 1. Idée, type d'article et existant

1. Sources d'idées : suggestions et « Autres questions » Google, UGC (étape 2), veille hebdomadaire (`veille/AAAA-MM-JJ.md`, workflow « 4 · Veille » chaque lundi), saisonnalité (chaleur, chenilles processionnaires, pétards du Nouvel An, chasse), export Search Console pour les réécritures (les plus visités d'abord).
2. Chercher dans `content/` et `urls.csv` un contenu de même intention : **mettre à jour** plutôt que créer. Un article `origin: import` se réécrit en gardant `slug`, `wp_id`, `date`, `url` et `categories`, et passe à `origin: rewrite`.
3. Choisir le **pôle** et le modèle de `templates/` :

| Pôle | Modèles | Matière principale (étape 2) |
|---|---|---|
| Alimentation et santé | `news.md`, `fun-facts.md`, modèle libre | Études scientifiques, recommandations vétérinaires |
| Accessoires | `reco-accessoires.md` | Avis d'utilisateurs, UGC, essais documentés, normes |
| Races | `guide-race.md` | Standards FCI / SCC, études de santé par race, UGC de propriétaires |
| Éducation et comportement | modèle libre, `fun-facts.md` | Livres et contenus d'éducateurs, études en comportement |
| Réglementation | `reglementation.md` | Légifrance, service-public.fr, ministère de l'Agriculture |

4. Livrer 5 à 10 idées en tableau : sujet, requête, intention, pôle, rubrique existante, gain d'information envisagé, priorité (santé urgente en premier).

Attendre le choix de Valentin.

## 2. Matière par pôle

Collecte de base pour tout article, depuis `marketing-intelligence` (SERP ~0,002 $, le reste gratuit) :

```bash
cd ../marketing-intelligence
.venv/Scripts/python.exe -m scripts.ugc_collect "harnais anti traction chien" --videos 8 --comments 40 --out ../guide-canin/.ugc
```

Le relevé (`.ugc/`, hors git) donne le top 10 Google, les blocs, Autres questions, l'AI Overview et ses sources, les suggestions, les vidéos YouTube avec commentaires, et Pinterest.

### Alimentation et santé : les études d'abord

```bash
.venv/Scripts/python.exe -m scripts.ugc_collect "grain-free diet dilated cardiomyopathy dogs" --only pubmed --pubmed 15 --lang en --country US --out ../guide-canin/.ugc
```

- Chercher en anglais (termes MeSH : *dogs*, *diet*, *obesity*, *atopic dermatitis*…). Le relevé donne titre, revue, année, type (revue systématique, essai, étude de cohorte) et résumé.
- **Hiérarchie de preuve** : recommandations d'organismes (WSAVA Global Nutrition Guidelines et outils « Selecting the best food for your pet », FEDIAF Nutritional Guidelines, NRC 2006, AAFCO), puis revues systématiques et méta-analyses, puis essais contrôlés, puis études d'observation. Une étude financée par un fabricant le dit dans le texte.
- Écrire ce que l'étude **montre et ne montre pas** : taille de l'échantillon, races, durée, corrélation ou causalité. Exemple type : l'enquête de la FDA sur les cardiomyopathies et les régimes « sans céréales » (2018-2022) n'a pas établi de lien de cause à effet ; le dire avec la date.
- Gain d'information typique : tableau « ce que dit la science » par idée reçue (vrai, faux, pas prouvé), lecture d'une étiquette de croquettes pas à pas, calcul de ration avec l'outil `[gc_ration]`.
- Règles santé non négociables : **jamais de dose de médicament** ; jamais de « dose acceptable » d'un toxique ; ingestion = vétérinaire ou centre antipoison (CNITV Lyon, CAPAE-Ouest) immédiatement ; encadré « Quand consulter en urgence » dans tout article santé ; remède naturel seulement s'il est documenté, avec ses limites.

### Accessoires et races : avis d'utilisateurs et UGC

- **Avis d'utilisateurs** : lire à la main les avis publics (fiches produit des grandes enseignes, Trustpilot, comparatifs de magazines de consommateurs) ; ne pas les aspirer automatiquement. Les **classer par problème récurrent** (taille qui baille, frottement aux aisselles, boucle qui casse, chien qui s'échappe), avec un ordre de grandeur (« sur une soixantaine d'avis lus, le frottement revient le plus souvent »). Ne jamais citer un avis mot pour mot ni nommer son auteur.
- **UGC** : commentaires YouTube du relevé, `site:reddit.com` (r/dogs, r/DogTraining, r/puppy101, subreddit de la race), forums de race et clubs affiliés à la SCC. Chercher les problèmes vécus, les regrets, les astuces de réglage, les questions sans réponse.
- **Races** : standard FCI et fiche SCC (taille, poids, caractère attendu), études de santé par race (PubMed, VetCompass au Royaume-Uni, programmes de dépistage des clubs : dysplasie, BOAS, myélopathie), puis l'UGC des propriétaires pour la vie quotidienne (besoin d'activité réel, poils, cohabitation, coût). Dire pour qui la race **n'est pas** faite.
- Sécurité et bien-être d'abord : colliers étrangleurs, à pointes, électriques, harnais qui entravent l'épaule : risques et cadre légal, sources vétérinaires ou comportementales.
- Le site n'est pas monétisé : on recommande des **critères et des types**, une marque n'est citée que comme exemple objectif.

### Éducation et comportement : livres et éducateurs

- **Références de fond** (vérifier l'édition avant de citer, citer page ou chapitre) : Karen Pryor, *Ne tirez pas sur le chien* ; Turid Rugaas, *Les signaux d'apaisement* ; Patricia McConnell, *De l'autre côté de la laisse* ; Jean Donaldson, *The Culture Clash* ; Ian Dunbar, *Before and After Getting Your Puppy* ; John Bradshaw, *Dans la tête d'un chien* ; Joël Dehasse, *Tout sur la psychologie du chien* ; Steven R. Lindsay, *Handbook of Applied Dog Behavior and Training*.
- **Positions scientifiques** : déclarations de l'AVSAB (socialisation du chiot, méthodes aversives), revues sur l'éducation par renforcement positif contre méthodes aversives (PubMed : *aversive training dogs welfare*).
- **Contenus d'éducateurs** : vidéos d'éducateurs et de comportementalistes reconnus (diplôme, formation citée, méthode positive). Transcrire pour en extraire la méthode, pas pour la recopier :

```bash
.venv/Scripts/python.exe -m scripts.ugc_collect "apprendre le rappel chien" --videos 6 --transcripts 3 --comments 30 --out ../guide-canin/.ugc
```

- Les commentaires sous ces vidéos disent **où les maîtres bloquent** : en faire les sections « Si ça ne marche pas ».
- Toute méthode est décrite en étapes observables (durée de séance, critère pour passer à l'étape suivante, signe d'arrêt). Jamais de méthode aversive présentée comme option ; renvoi vers un vétérinaire comportementaliste pour l'agressivité et l'anxiété sévère.

## 3. Fact-checking

Tableau de faits : affirmation, source (nom + URL), date, niveau de preuve. Sources par ordre de fiabilité : organismes vétérinaires et sanitaires (WSAVA, AAHA, ANSES, Ordre des vétérinaires, écoles vétérinaires ENVA, VetAgro Sup, Oniris, ENVT, centres antipoison), publications évaluées par des pairs, textes officiels (Légifrance, service-public.fr, ministère de l'Agriculture), références reconnues (ASPCA pour les toxiques, FCI et SCC, Merck Veterinary Manual), livres d'éducateurs cités. Blogs, sites marchands, forums et UGC servent à trouver des questions, jamais à prouver.

## 4. Brief

Suivre `algoproof.md` § 2, puis :

```
Requête principale / intention / requêtes secondaires :
Pôle et modèle (templates/…) :
Lecteur et sa situation (âge du chien, race, problème vécu) :
SERP : formats, blocs, AI Overview et sources citées :
Entités attendues (races, nutriments, organismes, matériels, comportements) :
Sous-questions retenues (SERP, suggestions, UGC) → H2/H3 :
Ce que le top 10 dit déjà :
GAIN D'INFORMATION (au moins un, nommé : étude décortiquée, synthèse d'avis, méthode pas à pas, tableau vrai/faux…) :
Avis tranché de la rédaction :
Faits sourcés (renvoi au tableau) et niveau de preuve :
Outil du site : [gc_ration] [gc_age] [gc_race] [gc_budget] [gc_aliments] :
Plan H2/H3 avec la réponse attendue sous chaque titre :
Encadré « Quand consulter en urgence » (santé) :
Liens internes sortants (3 à 6) / pages à modifier pour lier ce contenu (2 à 4) :
Médias et FAQ :
seo_title / meta_description :
```

## 5. Rédaction humanisée

Format du dépôt : front matter `title`, `slug`, `type` (selon le modèle), `status: draft`, `date`, `origin`, `categories`, `dek`, `seo_title` (30 à 65 car.), `meta_description` (110 à 160 car.), `essentiel` (3 à 4 points), `sources`, `cover`/`cover_alt`. Section `## Sources` en fin d'article, FAQ dans `<section class="faq" markdown="1">` avec des H3, outils par leur shortcode sur une ligne seule.

Voix de Guide Canin :

- **Vouvoiement**, signature « La rédaction de Guide Canin ». Aucune anecdote personnelle (« mon chien », « j'ai testé »).
- **Chaleureux et net** : rassurer sans infantiliser, et dire clairement ce qu'il ne faut pas faire.
- **Le chien réel** : âge, gabarit, race, tempérament changent la réponse ; le dire (« pour un chiot de moins de 6 mois… », « chez un chien qui tire fort… »).
- **Les mots des maîtres** (UGC) dans les intertitres : « Mon chien tire en laisse, quel harnais ? » plutôt que « Choix du harnais ».
- **La science en clair** : une étude se résume en une phrase (« Sur 1 200 chiens suivis pendant 4 ans, … »), avec son année et sa limite.
- Réponse dans la première phrase sous chaque H2 ; sections autoportantes ; tableaux pour comparer ; étapes numérotées pour les méthodes.

Interdits propres au chien (en plus de `style_check.py`) : « meilleur ami de l'homme », « boule de poils », « compagnon à quatre pattes » à répétition, « nos amis canins », « véritable membre de la famille », « bien-être de votre fidèle compagnon », introductions « Vous venez d'adopter… ? Félicitations ! », conclusions qui résument. Test du nom propre : remplacez « berger australien » par « border collie » ; si le paragraphe reste vrai, il est vide.

## 6. Maillage et médias

- 3 à 6 liens internes contextuels, 2 à 4 liens entrants ajoutés dans le même commit, lien vers le guide de la rubrique et vers l'outil dans `/outils/`.
- Images libres de droits vérifiées ou photos de Valentin, dans `content/media/` (WebP, 1600 px max), texte alternatif descriptif ; schéma SVG pour un réglage de harnais, une ration, une progression d'éducation.
- Vidéo YouTube seulement si elle montre un geste utile et vient d'une source fiable : URL seule sur sa ligne, une phrase qui résume ce qu'elle montre.

## 7. Contrôle, programmation et livraison

1. Contrôle final de `algoproof.md` § 4.
2. `python scripts/style_check.py --strict content/posts/<slug>.md` sans alerte bloquante ; traiter les alertes « vocabulaire IA », « transitions » et « moule ».
3. `python scripts/validate.py` sans erreur.
4. Après validation du texte par Valentin : `status: publish`, ou `status: future` avec `date: 'AAAA-MM-JJT09:00:00'` pour programmer (WP-Cron publie à l'heure dite). Une actualité tirée de la veille : cocher la case dans `veille/AAAA-MM-JJ.md`. Le push sur `main` publie : le demander avant.
5. Rendre : URL, tableau des sources avec niveau de preuve, gain d'information, liens ajoutés, alertes restantes.
