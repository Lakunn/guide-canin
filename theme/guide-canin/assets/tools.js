/* Outils Guide Canin : ration, âge, race, budget, aliments. Aucune dépendance. */
(function () {
  'use strict';

  function num(form, name) {
    var el = form.elements[name];
    if (!el || el.value === '') return null;
    var v = parseFloat(String(el.value).replace(',', '.'));
    return isNaN(v) ? null : v;
  }
  function fmt(n, d) {
    return n.toLocaleString('fr-FR', { maximumFractionDigits: d || 0, minimumFractionDigits: d || 0 });
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function error(box, msg) { box.innerHTML = '<p class="gc-error">' + esc(msg) + '</p>'; }

  /* ---------------------------------------------------------------- Ration */
  // Besoin énergétique au repos (RER) = 70 × poids^0,75, multiplié par un coefficient selon le profil.
  function ration(form, box) {
    var w = num(form, 'poids');
    if (!w || w <= 0 || w > 100) return error(box, 'Indiquez un poids entre 0,5 et 100 kg.');
    var raw = form.elements.profil.value;
    var factor = parseFloat(raw);
    var rer = 70 * Math.pow(w, 0.75);
    var kcal = rer * factor;
    var k100 = num(form, 'kcal');
    var html = '<p class="gc-big">' + fmt(Math.round(kcal / 10) * 10) + ' kcal par jour</p>';
    if (k100) {
      var grams = kcal / (k100 / 100);
      html += '<p class="gc-big">soit environ ' + fmt(Math.round(grams / 5) * 5) + ' g de cet aliment par jour</p>';
      if (raw.indexOf('p') > -1 || factor >= 3) html += '<p>Pour un chiot, répartissez cette quantité en 3 ou 4 repas.</p>';
    }
    html += '<p class="gc-note">Point de départ calculé avec la formule vétérinaire de référence (70 × poids<sup>0,75</sup> × coefficient). '
      + 'Ajustez selon l\'état corporel : pesez votre chien toutes les deux à quatre semaines et demandez conseil à votre vétérinaire, '
      + 'en particulier pour un chiot, une chienne gestante ou un chien malade. Les friandises comptent dans le total.</p>';
    box.innerHTML = html;
  }

  /* ------------------------------------------------------------------- Âge */
  function age(form, box) {
    var y = num(form, 'annees') || 0, m = num(form, 'mois') || 0;
    var a = y + m / 12;
    if (a <= 0 || a > 25) return error(box, 'Indiquez un âge entre 1 mois et 25 ans.');
    var avma = a <= 1 ? a * 15 : a <= 2 ? 15 + (a - 1) * 9 : 24 + (a - 2) * 5;
    var html = '<p class="gc-big">Environ ' + fmt(avma) + ' ans en âge humain</p>'
      + '<p>Repère classique de l\'Association vétérinaire américaine (AVMA) : 15 ans pour la première année, 9 de plus pour la deuxième, puis environ 5 par an.</p>';
    if (a >= 1) {
      var epi = 16 * Math.log(a) + 31;
      html += '<p>Selon la formule épigénétique publiée en 2020 par une équipe de l\'université de Californie à San Diego (16 × ln(âge) + 31), établie sur des labradors : <strong>environ ' + fmt(epi) + ' ans</strong>.</p>';
    }
    var stage = a < 1 ? 'Chiot : période de croissance, alimentation et vaccins adaptés.'
      : a < 3 ? 'Jeune adulte.'
      : 'Adulte. L\'Association américaine des hôpitaux vétérinaires (AAHA) considère qu\'un chien entre dans sa période senior au dernier quart de son espérance de vie, qui dépend surtout de sa taille : les grands chiens vieillissent plus vite que les petits.';
    html += '<p><strong>Stade de vie</strong> : ' + stage + '</p>'
      + '<p class="gc-note">Ces conversions sont des repères : aucune formule ne s\'applique exactement à tous les chiens.</p>';
    box.innerHTML = html;
  }

  /* ------------------------------------------------------------------ Race */
  // t: taille, e: énergie 1-3, g: entretien 1-3, k: adapté aux enfants, d: adapté à un premier chien,
  // a: supporte l'appartement, s: supporte mieux la solitude, n: note.
  var RACES = [
    { n: 'Cavalier King Charles', t: 'petit', e: 2, g: 2, k: 1, d: 1, a: 1, s: 0, w: 'Affectueux et facile. Race exposée à des maladies cardiaques : choisissez un élevage qui dépiste.' },
    { n: 'Bichon frisé', t: 'petit', e: 2, g: 3, k: 1, d: 1, a: 1, s: 0, w: 'Joyeux et sociable, perd peu de poils mais demande un toilettage régulier.' },
    { n: 'Shih tzu', t: 'petit', e: 1, g: 3, k: 1, d: 1, a: 1, s: 0, w: 'Calme et attaché à sa famille. Pelage exigeant.' },
    { n: 'Chihuahua', t: 'petit', e: 2, g: 1, k: 0, d: 1, a: 1, s: 0, w: 'Très attaché à son maître, fragile avec les jeunes enfants.' },
    { n: 'Bouledogue français', t: 'petit', e: 1, g: 1, k: 1, d: 1, a: 1, s: 0, w: 'Doux et facile à vivre. Race brachycéphale : sensible à la chaleur et aux difficultés respiratoires.' },
    { n: 'Teckel', t: 'petit', e: 2, g: 1, k: 0, d: 1, a: 1, s: 0, w: 'Plein de caractère, parfois têtu. Dos fragile : évitez les escaliers et les sauts.' },
    { n: 'Jack Russell terrier', t: 'petit', e: 3, g: 1, k: 1, d: 0, a: 0, s: 0, w: 'Très énergique et vif, a besoin de beaucoup d\'activité et d\'une éducation cadrée.' },
    { n: 'Caniche (moyen ou nain)', t: 'petit', e: 2, g: 3, k: 1, d: 1, a: 1, s: 0, w: 'Intelligent et facile à éduquer, perd peu de poils. Toilettage régulier.' },
    { n: 'Beagle', t: 'moyen', e: 3, g: 1, k: 1, d: 0, a: 0, s: 0, w: 'Gai et sociable, mais chien de meute : supporte mal la solitude et suit son flair.' },
    { n: 'Cocker anglais', t: 'moyen', e: 2, g: 2, k: 1, d: 1, a: 0, s: 0, w: 'Joyeux et affectueux. Oreilles à surveiller.' },
    { n: 'Whippet', t: 'moyen', e: 2, g: 1, k: 1, d: 1, a: 1, s: 1, w: 'Calme à la maison, très rapide dehors. Frileux.' },
    { n: 'Shiba inu', t: 'moyen', e: 2, g: 2, k: 0, d: 0, a: 1, s: 1, w: 'Indépendant et propre, mais rappel difficile. Pour maître expérimenté.' },
    { n: 'Border collie', t: 'moyen', e: 3, g: 2, k: 1, d: 0, a: 0, s: 0, w: 'Très intelligent, a besoin d\'activité physique et mentale chaque jour.' },
    { n: 'Berger australien', t: 'moyen', e: 3, g: 2, k: 1, d: 0, a: 0, s: 0, w: 'Énergique et vif, s\'épanouit avec un maître sportif.' },
    { n: 'Labrador retriever', t: 'grand', e: 3, g: 1, k: 1, d: 1, a: 0, s: 0, w: 'Sociable et facile à éduquer. Tendance à l\'embonpoint : rations à surveiller.' },
    { n: 'Golden retriever', t: 'grand', e: 2, g: 2, k: 1, d: 1, a: 0, s: 0, w: 'Doux et patient avec les enfants. Perd beaucoup de poils.' },
    { n: 'Berger allemand', t: 'grand', e: 3, g: 2, k: 1, d: 0, a: 0, s: 0, w: 'Loyal et travailleur, demande éducation et activité.' },
    { n: 'Bouvier bernois', t: 'grand', e: 2, g: 2, k: 1, d: 1, a: 0, s: 0, w: 'Calme et affectueux. Espérance de vie plus courte que la moyenne.' }
  ];
  function race(form, box) {
    var v = function (n) { return form.elements[n].value; };
    var taille = v('taille'), temps = +v('temps'), logement = v('logement');
    var kids = +v('enfants'), exp = +v('experience'), ent = +v('entretien'), seul = +v('seul');
    var scored = RACES.filter(function (r) { return taille === 'any' || r.t === taille; }).map(function (r) {
      var s = 10 - Math.abs(r.e - temps) * 3;
      if (logement === 'appart' && !r.a) s -= 4;
      if (logement === 'jardin' && r.e === 3) s += 1;
      if (kids && !r.k) s -= 5;
      if (!exp && !r.d) s -= 4;
      if (r.g > ent) s -= (r.g - ent) * 2;
      if (seul && !r.s) s -= 3;
      return { r: r, s: s };
    }).sort(function (a, b) { return b.s - a.s; }).slice(0, 3);
    var html = '<p class="gc-big">Les 3 races les plus compatibles</p><ol class="gc-list">';
    scored.forEach(function (x) { html += '<li><strong>' + esc(x.r.n) + '</strong> : ' + esc(x.r.w) + '</li>'; });
    html += '</ol>';
    if (seul) html += '<p>Un chien qui reste souvent seul longtemps s\'ennuie, quelle que soit sa race : prévoyez promenades, occupations ou un pet-sitter.</p>';
    html += '<p class="gc-note">Résultat indicatif, établi à partir des caractéristiques générales de chaque race. Chaque chien est un individu : rencontrez-le, et pensez aussi aux chiens de refuge et aux croisés.</p>';
    box.innerHTML = html;
  }

  /* ---------------------------------------------------------------- Budget */
  function budget(form, box) {
    var once = 0, month = 0, year = 0;
    Array.prototype.forEach.call(form.querySelectorAll('input[data-period]'), function (el) {
      var v = parseFloat(String(el.value).replace(',', '.')) || 0;
      var p = el.getAttribute('data-period');
      if (p === 'once') once += v; else if (p === 'month') month += v; else year += v;
    });
    var annual = month * 12 + year;
    if (!once && !annual) return error(box, 'Saisissez au moins un montant.');
    box.innerHTML = '<p class="gc-big">Première année : ' + fmt(once + annual) + ' €</p>'
      + '<p class="gc-big">Années suivantes : ' + fmt(annual) + ' € par an (' + fmt(annual / 12) + ' € par mois)</p>'
      + '<p class="gc-note">Prévoyez en plus une réserve pour les imprévus de santé : une consultation d\'urgence ou une chirurgie peut coûter plusieurs centaines d\'euros.</p>';
  }

  /* -------------------------------------------------------------- Aliments */
  // s: no = interdit, warn = avec précaution, ok = autorisé. Sources : ASPCA (liste des aliments à éviter),
  // centres antipoison vétérinaires.
  var ALIMENTS = [
    ['chocolat', 'no', 'La théobromine et la caféine du chocolat sont toxiques pour le chien. Le chocolat noir et le chocolat pâtissier sont les plus dangereux.'],
    ['raisin', 'no', 'Le raisin frais peut provoquer une insuffisance rénale aiguë, sans dose sûre connue. Même une petite quantité justifie d\'appeler le vétérinaire.'],
    ['raisins secs', 'no', 'Mêmes risques que le raisin frais, en plus concentrés.'],
    ['oignon', 'no', 'Toxique cru, cuit ou en poudre : il abîme les globules rouges (anémie).'],
    ['ail', 'no', 'Même famille que l\'oignon, mêmes risques pour les globules rouges.'],
    ['poireau', 'no', 'Famille de l\'oignon et de l\'ail : à éviter.'],
    ['ciboulette', 'no', 'Famille de l\'oignon : à éviter.'],
    ['xylitol', 'no', 'Cet édulcorant (chewing-gums, bonbons et certains beurres de cacahuète « sans sucre ») provoque une chute brutale de la glycémie et peut atteindre le foie. Urgence vétérinaire.'],
    ['chewing-gum', 'no', 'Contient souvent du xylitol, très toxique pour le chien.'],
    ['noix de macadamia', 'no', 'Provoquent faiblesse, tremblements et fièvre.'],
    ['alcool', 'no', 'Même en petite quantité : vomissements, troubles neurologiques, risque vital.'],
    ['café', 'no', 'La caféine est toxique : agitation, troubles cardiaques.'],
    ['thé', 'no', 'Contient de la caféine (théine) : à éviter.'],
    ['pâte à pain crue', 'no', 'La levure fait gonfler la pâte dans l\'estomac et produit de l\'alcool.'],
    ['os cuits', 'no', 'Les os cuits se brisent en éclats qui peuvent blesser ou obstruer le tube digestif.'],
    ['noyaux', 'no', 'Noyaux de cerise, pêche, abricot, prune : risque d\'obstruction, et certains contiennent des composés cyanogènes.'],
    ['avocat', 'warn', 'Le noyau est un risque d\'obstruction et le fruit est gras. Déconseillé.'],
    ['épi de maïs', 'no', 'Le trognon est une cause classique d\'occlusion intestinale.'],
    ['champignons sauvages', 'no', 'Certains sont mortels. Les champignons de Paris cuits, nature, ne posent en général pas de problème, mais n\'apportent rien.'],
    ['pomme de terre crue', 'no', 'Contient de la solanine. Cuite, nature et en petite quantité, elle est tolérée.'],
    ['charcuterie', 'warn', 'Trop salée et trop grasse : risque de troubles digestifs et de pancréatite.'],
    ['chips', 'warn', 'Trop salées et grasses : à éviter.'],
    ['lait', 'warn', 'Beaucoup de chiens adultes digèrent mal le lactose : diarrhée possible.'],
    ['fromage', 'warn', 'En petite quantité comme récompense, s\'il est bien toléré. Gras et salé.'],
    ['yaourt nature', 'warn', 'Petite quantité possible, sans sucre ni édulcorant.'],
    ['beurre de cacahuète', 'warn', 'Uniquement sans xylitol, sans sel ajouté, en petite quantité.'],
    ['noix', 'warn', 'Grasses et parfois moisies : déconseillées.'],
    ['tomate', 'warn', 'La tomate bien mûre en petite quantité est tolérée ; les parties vertes (tiges, feuilles, fruits verts) sont à éviter.'],
    ['agrumes', 'warn', 'Orange ou mandarine en petite quantité sans peau ni pépins ; acides, souvent peu appréciés.'],
    ['miel', 'warn', 'Très sucré : exceptionnellement et en très petite quantité.'],
    ['thon en conserve', 'warn', 'Occasionnellement, au naturel : salé et riche en mercure s\'il est donné souvent.'],
    ['carotte', 'ok', 'Crue ou cuite, nature : une friandise peu calorique.'],
    ['pomme', 'ok', 'Sans trognon ni pépins, en morceaux.'],
    ['banane', 'ok', 'En petite quantité : sucrée.'],
    ['myrtille', 'ok', 'En petite quantité.'],
    ['fraise', 'ok', 'En petite quantité, lavée.'],
    ['pastèque', 'ok', 'Sans pépins ni écorce.'],
    ['concombre', 'ok', 'Peu calorique, rafraîchissant.'],
    ['courgette', 'ok', 'Cuite ou crue, nature.'],
    ['haricots verts', 'ok', 'Cuits, nature, sans sel.'],
    ['riz', 'ok', 'Cuit, nature : souvent conseillé en petite quantité lors de troubles digestifs légers.'],
    ['poulet', 'ok', 'Cuit, sans os, sans peau ni assaisonnement.'],
    ['œuf', 'ok', 'Cuit. Éviter l\'œuf cru.'],
    ['poisson', 'ok', 'Cuit, sans arêtes ni assaisonnement.'],
    ['citrouille', 'ok', 'Cuite, nature (pas de préparation pour tarte, souvent sucrée et épicée).']
  ];
  var LABEL = { no: 'Non, à éviter', warn: 'Avec précaution', ok: 'Oui, avec modération' };
  function norm(s) { return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim(); }
  function aliments(form, box) {
    var q = norm(form.elements.q.value || '');
    if (q.length < 2) { box.innerHTML = ''; return; }
    var hits = ALIMENTS.filter(function (a) { return norm(a[0]).indexOf(q) > -1 || (q.length > 3 && q.indexOf(norm(a[0])) > -1); }).slice(0, 4);
    if (!hits.length) {
      box.innerHTML = '<p>Cet aliment n\'est pas encore dans notre base. Dans le doute, ne le donnez pas et demandez à votre vétérinaire.</p>';
      return;
    }
    var html = '';
    hits.forEach(function (a) {
      html += '<div class="gc-food gc-' + a[1] + '"><p><strong>' + esc(a[0].charAt(0).toUpperCase() + a[0].slice(1)) + '</strong> · <span class="gc-badge">' + LABEL[a[1]] + '</span></p><p>' + esc(a[2]) + '</p></div>';
    });
    if (hits.some(function (a) { return a[1] === 'no'; })) {
      html += '<p class="gc-alert">Votre chien en a mangé ? N\'attendez pas les symptômes et ne le faites pas vomir vous-même : appelez immédiatement votre vétérinaire ou un centre antipoison vétérinaire.</p>';
    }
    box.innerHTML = html;
  }

  var HANDLERS = { ration: ration, age: age, race: race, budget: budget, aliments: aliments };

  document.querySelectorAll('.gc-tool').forEach(function (tool) {
    var id = tool.getAttribute('data-tool');
    var form = tool.querySelector('form');
    var box = tool.querySelector('.gc-tool-result');
    var run = function (e) { if (e) e.preventDefault(); HANDLERS[id](form, box); };
    form.addEventListener('submit', run);
    if (id === 'aliments') {
      var dl = tool.querySelector('datalist');
      ALIMENTS.forEach(function (a) { var o = document.createElement('option'); o.value = a[0]; dl.appendChild(o); });
      form.elements.q.addEventListener('input', run);
    }
  });
})();
