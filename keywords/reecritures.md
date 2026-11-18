# guidecanin.fr : pause des nouveaux articles, file des réécritures

Décidé le 18/11/2026. Google a classé le site en qualité faible : 14 pages indexées sur 60, 38 « explorées,
actuellement non indexées », 3 clics en 16 mois. La qualité se juge à l'échelle du site : tant que des contenus
importés faibles restent en ligne, les nouveaux articles en pâtissent.

**Règle : aucun nouvel article tant que cette file n'est pas vide.** Le calendrier (`keywords/calendrier.md`)
reste la référence pour l'après et sert à choisir la requête principale de chaque réécriture.

Ordre : pages qui ont déjà des impressions, puis sujets à forte demande, puis le reste. Chaque réécriture suit le
skill `guide-canin-contenu` (garde `slug`, `wp_id`, `date`, `url`, `categories`, passe en `origin: rewrite`).
Search Console du 18/11/2026, 16 mois.

| # | Slug | Mots | Impressions (pos.) | Décision |
|---|---|---|---|---|
| 1 | top-des-brosses-pour-chien | 1 078 | 50 (20,5) | Réécrire : comparatif fondé sur les avis d'acheteurs et l'UGC, par type de poil |
| 2 | meilleur-shampoing-chien | 2 834 | 14 (10,1) | Réécrire en plus court : ce que disent les vétérinaires (pH, fréquence), puis choix par cas |
| 3 | chien-rester-seul-journee | 1 974 | 0 | Réécrire, angle « combien d'heures selon l'âge » ; lier à anxiete-separation-chien sans la répéter |
| 4 | quelle-race-chien-choisir | 1 121 | 0 | Réécrire : grille de choix (logement, temps, budget), lier aux pages races |
| 5 | meilleur-collier-anti-puce-pour-chien | 760 | 0 | Réécrire : molécules et durée d'efficacité sourcées, jamais de dose, renvoi au vétérinaire |
| 6 | quelles-sont-les-meilleures-croquettes-pour-chien-avec-dermatite-atopique-2 | 574 | 0 | Réécrire sur les études (régimes hydrolysés, oméga-3) |
| 7 | meilleur-marque-croquette-pour-chien-2 | 401 | 0 | Réécrire : critères de lecture d'étiquette, études, pas de classement de marques sans données |
| 8 | chien-agressif-que-faire | 719 | 0 | Réécrire (éducateurs, études) ; lier à gerer-bagarre-chien et que-faire-en-cas-de-morsures-de-chien |
| 9 | gerer-bagarre-chien | 688 | 0 | Réécrire, angle « séparer deux chiens sans se faire mordre » |
| 10 | les-aboiements-excessifs-chez-les-chiens-que-faire-causes-et-solutions | 560 | 0 | Réécrire |
| 11 | fatiguer-son-chien | 602 | 0 | Réécrire : activités par niveau d'énergie, jeux d'intérieur |
| 12 | comment-choisir-un-bon-chien-de-garde | 753 | 0 | Réécrire |
| 13 | quels-sont-les-signes-de-grossesse-chez-les-chienne-et-comment-les-gerer | 797 | 0 | Réécrire avec sources vétérinaires (santé : prudence) |
| 14 | soin-dent-chien | 478 | 0 | Réécrire avec sources vétérinaires |
| 15 | meilleur-lit-orthopedique-pour-chien | 610 | 0 | Réécrire sur les avis d'acheteurs |
| 16 | conseils-pratiques-pour-la-vie-quotidienne-avec-son-chien-2 | 758 | 0 | Sujet flou : réécrire en page pilier courte qui oriente vers les guides existants |
| 17 | chiens-faciles-a-dresser | 303 | 0 | Recouvre chien-le-plus-intelligent : réécrire puis consolider par `canonical_overrides` vers /chien-le-plus-intelligent/ |

Aussi en « explorées, non indexées » mais déjà réécrites : tiques-chien-que-faire, chien-perdu-que-faire,
chien-le-plus-intelligent, apprendre-rappel-a-son-chien, anxiete-separation-chien, chien-destructeur-que-faire,
chien-errant-que-faire, que-faire-en-cas-de-morsures-de-chien. À revoir une fois la file vidée : ajouter ce qui manque
de vécu (témoignages crédités, études citées, photos), puis demander l'indexation dans la Search Console.

Flux RSS de rubrique (`/category/.../feed/`) et pages de rubrique non indexés : normal, rien à faire.
