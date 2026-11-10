/* Carte d'origine des races de chiens. Pays d'origine selon la nomenclature de la FCI. Aucune dépendance. */
(function () {
  'use strict';
  var GROUPES = {
    1: 'Chiens de berger et de bouvier', 2: 'Pinschers, schnauzers, molossoïdes et bouviers suisses', 3: 'Terriers',
    4: 'Teckels', 5: 'Chiens de type spitz et primitif', 6: 'Chiens courants et de recherche au sang',
    7: 'Chiens d’arrêt', 8: 'Rapporteurs, leveurs et chiens d’eau', 9: 'Chiens d’agrément et de compagnie', 10: 'Lévriers'
  };
  // [nom, pays (codes ISO), groupe FCI, précision sur l'origine]
  var R = [
    ['Berger allemand', 'DE', 1], ['Berger belge (malinois, tervueren…)', 'BE', 1],
    ['Berger australien', 'US', 1, 'Malgré son nom, la race a été fixée aux États-Unis.'],
    ['Border collie', 'GB', 1], ['Berger des Shetland', 'GB', 1], ['Welsh corgi Pembroke', 'GB', 1],
    ['Beauceron (berger de Beauce)', 'FR', 1], ['Berger de Brie', 'FR', 1], ['Berger blanc suisse', 'CH', 1],
    ['Chien-loup tchécoslovaque', 'CZ SK', 1, 'Race créée dans l’ex-Tchécoslovaquie.'],
    ['Komondor', 'HU', 1], ['Puli', 'HU', 1], ['Bouvier des Flandres', 'BE FR', 1], ['Schipperke', 'BE', 1],
    ['Kelpie australien', 'AU', 1], ['Bouvier australien', 'AU', 1],
    ['Rottweiler', 'DE', 2], ['Dobermann', 'DE', 2], ['Boxer', 'DE', 2], ['Dogue allemand', 'DE', 2],
    ['Schnauzer', 'DE', 2], ['Pinscher nain', 'DE', 2], ['Leonberg', 'DE', 2], ['Hovawart', 'DE', 2],
    ['Dogue de Bordeaux', 'FR', 2], ['Montagne des Pyrénées', 'FR', 2], ['Cane corso', 'IT', 2], ['Mâtin napolitain', 'IT', 2],
    ['Bouvier bernois', 'CH', 2], ['Saint-Bernard', 'CH', 2], ['Terre-neuve', 'CA', 2],
    ['Bulldog anglais', 'GB', 2], ['Shar-pei', 'CN', 2, 'Chine, sous le patronage de la Grande-Bretagne.'],
    ['Dogue du Tibet', 'CN', 2, 'Tibet (Chine).'], ['Kangal (berger d’Anatolie)', 'TR', 2], ['Mâtin espagnol', 'ES', 2],
    ['Yorkshire terrier', 'GB', 3], ['Jack Russell terrier', 'GB AU', 3, 'Né en Angleterre, standardisé en Australie.'],
    ['Bull terrier', 'GB', 3], ['Staffordshire bull terrier', 'GB', 3], ['West Highland white terrier', 'GB', 3],
    ['Scottish terrier', 'GB', 3], ['American Staffordshire terrier', 'US', 3],
    ['Teckel', 'DE', 4],
    ['Husky de Sibérie', 'US RU', 5, 'Pays d’origine pour la FCI : États-Unis. Ses ancêtres viennent de Sibérie (Russie).'],
    ['Malamute de l’Alaska', 'US', 5], ['Samoyède', 'RU', 5, 'Nord de la Russie et Sibérie.'],
    ['Akita inu', 'JP', 5], ['Shiba', 'JP', 5], ['Chow-chow', 'CN', 5, 'Chine, sous le patronage de la Grande-Bretagne.'],
    ['Spitz allemand (dont le loulou de Poméranie)', 'DE', 5], ['Spitz finlandais', 'FI', 5], ['Chien d’élan norvégien', 'NO', 5],
    ['Berger islandais', 'IS', 5], ['Basenji', 'CD CG CF', 5, 'Afrique centrale, sous le patronage de la Grande-Bretagne.'],
    ['Podenco d’Ibiza', 'ES', 5], ['Xoloitzcuintle (chien nu du Mexique)', 'MX', 5], ['Chien nu du Pérou', 'PE', 5],
    ['Thai ridgeback', 'TH', 5], ['Jindo coréen', 'KR', 5],
    ['Beagle', 'GB', 6], ['Basset hound', 'GB', 6], ['Dalmatien', 'HR', 6],
    ['Rhodesian ridgeback', 'ZA ZW', 6, 'Afrique australe.'],
    ['Épagneul breton', 'FR', 7], ['Braque de Weimar', 'DE', 7], ['Braque allemand', 'DE', 7], ['Braque hongrois (vizsla)', 'HU', 7], ['Setter irlandais', 'IE', 7],
    ['Labrador retriever', 'GB', 8, 'Grande-Bretagne ; ses ancêtres venaient de Terre-Neuve (Canada).'],
    ['Golden retriever', 'GB', 8], ['Cocker anglais', 'GB', 8], ['Cocker américain', 'US', 8],
    ['Retriever de la Nouvelle-Écosse', 'CA', 8], ['Chien d’eau portugais', 'PT', 8], ['Lagotto romagnolo', 'IT', 8], ['Chien d’eau espagnol', 'ES', 8],
    ['Caniche', 'FR', 9], ['Bouledogue français', 'FR', 9], ['Bichon frisé', 'BE FR', 9],
    ['Bichon maltais', 'IT', 9, 'Bassin méditerranéen central, sous le patronage de l’Italie.'],
    ['Bichon havanais', 'CU', 9, 'Cuba ; ses ancêtres venaient du bassin méditerranéen occidental.'],
    ['Bichon bolonais', 'IT', 9], ['Coton de Tuléar', 'MG', 9], ['Chihuahua', 'MX', 9], ['Cavalier King Charles', 'GB', 9],
    ['Carlin', 'CN', 9, 'Chine, sous le patronage de la Grande-Bretagne.'], ['Pékinois', 'CN', 9, 'Chine, sous le patronage de la Grande-Bretagne.'],
    ['Shih tzu', 'CN', 9, 'Tibet (Chine), sous le patronage de la Grande-Bretagne.'], ['Lhassa apso', 'CN', 9, 'Tibet (Chine), sous le patronage de la Grande-Bretagne.'],
    ['Épagneul nain continental (papillon)', 'BE FR', 9], ['Boston terrier', 'US', 9], ['Épagneul japonais (chin)', 'JP', 9], ['Griffon bruxellois', 'BE', 9],
    ['Lévrier afghan', 'AF', 10], ['Barzoï', 'RU', 10], ['Greyhound', 'GB', 10], ['Whippet', 'GB', 10],
    ['Lévrier irlandais', 'IE', 10], ['Petit lévrier italien', 'IT', 10]
  ];

  function norm(s) { return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  document.querySelectorAll('.gc-map').forEach(function (root) {
    var svg = root.querySelector('svg');
    var list = root.querySelector('.gc-map-list');
    var info = root.querySelector('.gc-map-info');
    var search = root.querySelector('.gc-map-search');
    var group = root.querySelector('.gc-map-group');
    if (!svg || !list) return;
    var paths = {};
    svg.querySelectorAll('path[data-c]').forEach(function (p) { (paths[p.getAttribute('data-c')] = paths[p.getAttribute('data-c')] || []).push(p); });
    var names = {};
    Object.keys(paths).forEach(function (c) { var t = paths[c][0].querySelector('title'); names[c] = t ? t.textContent : c; });

    var byCountry = {};
    R.forEach(function (r, i) {
      r.codes = r[1].split(' ');
      r.codes.forEach(function (c) { (byCountry[c] = byCountry[c] || []).push(i); });
    });
    Object.keys(byCountry).forEach(function (c) { (paths[c] || []).forEach(function (p) { p.classList.add('has-breed'); }); });

    var sorted = R.map(function (r, i) { return i; }).sort(function (a, b) { return R[a][0].localeCompare(R[b][0], 'fr'); });
    list.innerHTML = sorted.map(function (i) {
      return '<li><button type="button" data-i="' + i + '">' + esc(R[i][0]) + '<span>' + esc(R[i].codes.map(function (c) { return names[c] || c; }).join(', ')) + '</span></button></li>';
    }).join('');
    var buttons = list.querySelectorAll('button');

    var pinned = null;
    function clear() {
      svg.querySelectorAll('.is-on').forEach(function (p) { p.classList.remove('is-on'); });
      buttons.forEach(function (b) { b.classList.remove('is-on'); });
    }
    function showBreed(i) {
      clear();
      var r = R[i];
      r.codes.forEach(function (c) { (paths[c] || []).forEach(function (p) { p.classList.add('is-on'); svg.appendChild(p); }); });
      list.querySelector('button[data-i="' + i + '"]').classList.add('is-on');
      info.innerHTML = '<p class="gc-map-name">' + esc(r[0]) + '</p><p><strong>Origine :</strong> ' + esc(r.codes.map(function (c) { return names[c] || c; }).join(', ')) + '</p>'
        + (r[3] ? '<p>' + esc(r[3]) + '</p>' : '') + '<p class="gc-note">Groupe FCI ' + r[2] + ' · ' + esc(GROUPES[r[2]]) + '</p>';
    }
    function showCountry(c) {
      clear();
      (paths[c] || []).forEach(function (p) { p.classList.add('is-on'); });
      var idx = byCountry[c] || [];
      idx.forEach(function (i) { list.querySelector('button[data-i="' + i + '"]').classList.add('is-on'); });
      info.innerHTML = '<p class="gc-map-name">' + esc(names[c] || c) + '</p>'
        + (idx.length ? '<p>' + idx.length + ' race' + (idx.length > 1 ? 's' : '') + ' de la carte : ' + esc(idx.map(function (i) { return R[i][0]; }).sort(function (a, b) { return a.localeCompare(b, 'fr'); }).join(', ')) + '.</p>'
          : '<p>Aucune race de notre sélection n’est originaire de ce pays.</p>');
    }
    function reset() {
      if (pinned !== null) return showBreed(pinned);
      clear();
      info.innerHTML = '<p class="gc-note">Survolez ou touchez le nom d’une race pour voir sa région d’origine, ou un pays pour voir ses races.</p>';
    }

    list.addEventListener('mouseover', function (e) { var b = e.target.closest('button'); if (b) showBreed(+b.getAttribute('data-i')); });
    list.addEventListener('focusin', function (e) { var b = e.target.closest('button'); if (b) showBreed(+b.getAttribute('data-i')); });
    list.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      var i = +b.getAttribute('data-i');
      pinned = pinned === i ? null : i;
      showBreed(i);
      if (window.matchMedia('(max-width: 760px)').matches) svg.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    list.addEventListener('mouseleave', reset);
    svg.addEventListener('mouseover', function (e) { var p = e.target.closest('path[data-c]'); if (p) showCountry(p.getAttribute('data-c')); });
    svg.addEventListener('click', function (e) { var p = e.target.closest('path[data-c]'); if (p) { pinned = null; showCountry(p.getAttribute('data-c')); } });
    svg.addEventListener('mouseleave', reset);

    function filter() {
      var q = norm(search.value.trim()), g = group.value;
      list.querySelectorAll('li').forEach(function (li) {
        var r = R[+li.firstChild.getAttribute('data-i')];
        var ok = (!g || String(r[2]) === g) && (!q || norm(r[0]).indexOf(q) > -1 || r.codes.some(function (c) { return norm(names[c] || '').indexOf(q) > -1; }));
        li.hidden = !ok;
      });
      var visible = list.querySelectorAll('li:not([hidden]) button');
      if (visible.length === 1) showBreed(+visible[0].getAttribute('data-i'));
    }
    search.addEventListener('input', filter);
    group.addEventListener('change', filter);
    group.innerHTML = '<option value="">Tous les groupes FCI</option>' + Object.keys(GROUPES).map(function (k) { return '<option value="' + k + '">Groupe ' + k + ' · ' + esc(GROUPES[k]) + '</option>'; }).join('');
    root.querySelector('.gc-map-count').textContent = R.length + ' races, ' + Object.keys(byCountry).length + ' pays';
    reset();
  });
})();
