<?php
/**
 * Outils interactifs : [gc_ration], [gc_age], [gc_race], [gc_budget], [gc_aliments].
 * Chaque shortcode affiche un formulaire accessible ; le calcul est fait par assets/tools.js
 * (chargé uniquement sur les pages qui utilisent un outil). Sans JavaScript, un message l'indique.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function gc_tools_enqueue() {
	wp_enqueue_script( 'gc-tools', get_template_directory_uri() . '/assets/tools.js', array(), (string) filemtime( get_template_directory() . '/assets/tools.js' ), array( 'strategy' => 'defer', 'in_footer' => true ) );
}

function gc_tool_wrap( $id, $title, $inner ) {
	gc_tools_enqueue();
	return sprintf(
		'<div class="gc-tool" data-tool="%1$s" id="outil-%1$s"><p class="gc-tool-title">%2$s</p><form class="gc-tool-form" novalidate>%3$s</form><div class="gc-tool-result" aria-live="polite"></div><noscript><p>Cet outil nécessite JavaScript.</p></noscript></div>',
		esc_attr( $id ),
		esc_html( $title ),
		$inner
	);
}

function gc_field( $name, $label, $control, $help = '' ) {
	$id = 'gc-' . $name . '-' . wp_unique_id();
	return sprintf(
		'<div class="gc-field"><label for="%1$s">%2$s</label>%3$s%4$s</div>',
		esc_attr( $id ),
		esc_html( $label ),
		str_replace( '{id}', esc_attr( $id ), $control ),
		$help ? '<small>' . esc_html( $help ) . '</small>' : ''
	);
}

function gc_select( $name, array $options ) {
	$html = '<select id="{id}" name="' . esc_attr( $name ) . '">';
	foreach ( $options as $value => $label ) {
		$html .= '<option value="' . esc_attr( $value ) . '">' . esc_html( $label ) . '</option>';
	}
	return $html . '</select>';
}

function gc_number( $name, $attrs = '' ) {
	return '<input id="{id}" type="number" inputmode="decimal" name="' . esc_attr( $name ) . '" ' . $attrs . '>';
}

/* Calculateur de ration --------------------------------------------------- */
add_shortcode(
	'gc_ration',
	function () {
		$f  = gc_field( 'poids', 'Poids actuel du chien (kg)', gc_number( 'poids', 'min="0.5" max="100" step="0.1" required placeholder="ex. 12"' ) );
		$f .= gc_field(
			'profil',
			'Profil',
			gc_select(
				'profil',
				array(
					'1.6' => 'Adulte stérilisé',
					'1.8' => 'Adulte non stérilisé',
					'1.4' => 'Adulte peu actif ou avec tendance à grossir',
					'1.0' => 'Adulte en programme de perte de poids (suivi vétérinaire)',
					'2.0' => 'Adulte actif (sport régulier)',
					'3.0' => 'Chiot de moins de 4 mois',
					'2.0p' => 'Chiot de 4 mois à l\'âge adulte',
				)
			)
		);
		$f .= gc_field( 'kcal', 'Énergie de l\'aliment (kcal pour 100 g)', gc_number( 'kcal', 'min="50" max="700" step="1" placeholder="ex. 370"' ), 'Indiquée sur le sac (« énergie métabolisable »). Laissez vide pour obtenir seulement les calories.' );
		$f .= '<button class="btn" type="submit">Calculer</button>';
		return gc_tool_wrap( 'ration', 'Calculateur de ration quotidienne', $f );
	}
);

/* Âge en âge humain ------------------------------------------------------- */
add_shortcode(
	'gc_age',
	function () {
		$f  = gc_field( 'annees', 'Âge du chien (années)', gc_number( 'annees', 'min="0" max="25" step="1" placeholder="ex. 5"' ) );
		$f .= gc_field( 'mois', 'et mois', gc_number( 'mois', 'min="0" max="11" step="1" placeholder="ex. 6"' ) );
		$f .= '<button class="btn" type="submit">Convertir</button>';
		return gc_tool_wrap( 'age', 'Âge du chien en âge humain', $f );
	}
);

/* Quelle race ? ----------------------------------------------------------- */
add_shortcode(
	'gc_race',
	function () {
		$q  = gc_field( 'logement', 'Votre logement', gc_select( 'logement', array( 'appart' => 'Appartement', 'maison' => 'Maison sans jardin', 'jardin' => 'Maison avec jardin' ) ) );
		$q .= gc_field( 'temps', 'Temps de sortie et d\'activité par jour', gc_select( 'temps', array( '1' => 'Moins d\'une heure', '2' => '1 à 2 heures', '3' => 'Plus de 2 heures' ) ) );
		$q .= gc_field( 'taille', 'Taille souhaitée', gc_select( 'taille', array( 'any' => 'Peu importe', 'petit' => 'Petit', 'moyen' => 'Moyen', 'grand' => 'Grand' ) ) );
		$q .= gc_field( 'enfants', 'Enfants à la maison', gc_select( 'enfants', array( '0' => 'Non', '1' => 'Oui' ) ) );
		$q .= gc_field( 'experience', 'Expérience avec les chiens', gc_select( 'experience', array( '0' => 'Premier chien', '1' => 'J\'ai déjà eu des chiens' ) ) );
		$q .= gc_field( 'entretien', 'Entretien du pelage accepté', gc_select( 'entretien', array( '1' => 'Minimal', '2' => 'Brossage hebdomadaire', '3' => 'Toilettage régulier' ) ) );
		$q .= gc_field( 'seul', 'Le chien restera seul plusieurs heures', gc_select( 'seul', array( '0' => 'Rarement', '1' => 'Souvent' ) ) );
		$q .= '<button class="btn" type="submit">Voir les races adaptées</button>';
		return gc_tool_wrap( 'race', 'Quelle race de chien est faite pour vous ?', $q );
	}
);

/* Budget ------------------------------------------------------------------ */
add_shortcode(
	'gc_budget',
	function () {
		$rows = array(
			'achat'        => array( 'Adoption ou achat', 'once' ),
			'equipement'   => array( 'Équipement de départ (panier, laisse, gamelles…)', 'once' ),
			'identif'      => array( 'Identification, si non faite par l\'éleveur ou le refuge', 'once' ),
			'sterilisation' => array( 'Stérilisation', 'once' ),
			'alimentation' => array( 'Alimentation (par mois)', 'month' ),
			'friandises'   => array( 'Friandises et jouets (par mois)', 'month' ),
			'antiparas'    => array( 'Antiparasitaires (par mois)', 'month' ),
			'assurance'    => array( 'Assurance santé (par mois)', 'month' ),
			'veto'         => array( 'Vaccins et visite annuelle (par an)', 'year' ),
			'toilettage'   => array( 'Toilettage (par an)', 'year' ),
			'garde'        => array( 'Garde ou pension pendant les absences (par an)', 'year' ),
			'education'    => array( 'Cours d\'éducation (par an)', 'year' ),
		);
		$f = '<p class="gc-hint">Saisissez vos propres montants en euros : devis, prix relevés, factures. Laissez vide ce qui ne vous concerne pas.</p><div class="gc-grid">';
		foreach ( $rows as $key => $row ) {
			$f .= gc_field( $key, $row[0], gc_number( $key, 'min="0" step="1" data-period="' . esc_attr( $row[1] ) . '" placeholder="0"' ) );
		}
		$f .= '</div><button class="btn" type="submit">Calculer le budget</button>';
		return gc_tool_wrap( 'budget', 'Budget d\'un chien : première année et années suivantes', $f );
	}
);

/* Mon chien peut-il manger… ? -------------------------------------------- */
add_shortcode(
	'gc_aliments',
	function () {
		$f  = gc_field( 'q', 'Aliment', '<input id="{id}" type="search" name="q" list="gc-aliments-list" autocomplete="off" placeholder="ex. raisin, carotte, chocolat">' );
		$f .= '<datalist id="gc-aliments-list"></datalist>';
		return gc_tool_wrap( 'aliments', 'Mon chien peut-il manger… ?', $f );
	}
);
