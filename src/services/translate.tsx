// translations.js
export const getTranslation = (key, type, language = 'en') => {
	switch (language) {
		case 'fr':
			return getFrenchTranslation(key, type);
		case 'en':
		default:
			return getEnglishTranslation(key, type);
	}
};

const getEnglishTranslation = (key, type) => {
	switch (type) {
		case 'statuses':
			switch (key) {
				case 'Order arrived at warehouse':
					return 'Order arrived at warehouse';
				case 'Order in Processing':
					return 'Order in Processing';
				case 'Order in Transit':
					return 'Order in Transit';
				default:
					return key;
			}
		case 'locations':
			switch (key) {
				case "Votre colis est arrivé à l'entrepôt":
					return 'Your package has arrived at the warehouse';
				case 'Emballage des Colis en Cours':
					return 'Packaging in progress';
				case 'Hong Kong':
					return 'Hong Kong';
				case "L'Éthiopie":
					return 'Ethiopia';
				case 'Ethiopie':
					return 'Ethiopia';
				case 'Mali':
					return 'Mali';
				case "Colis arrivé à l'aéroport du Mali et prêt pour dédouanement":
					return 'Package arrived at Mali airport and ready for customs clearance';
				case 'Les marchandises sont arrivées et ont été stockées (Kalaban-Coura, près de FEBAK, précisément à côté du lycée Birgo. +22376696177 / +22350005142)':
					return 'Goods have arrived and been stored (Kalaban-Coura, near FEBAK, precisely next to the Birgo high school. +22376696177 / +22350005142)';
				default:
					return key;
			}
		default:
			return key;
	}
};

const getFrenchTranslation = (key, type) => {
	switch (type) {
		case 'statuses':
			switch (key) {
				case 'Order arrived at warehouse':
					return "Commande arrivée à l'entrepôt";
				case 'Order in Processing':
					return 'Commande en traitement';
				case 'Order in Transit':
					return 'Commande en transit';
				default:
					return key;
			}
		case 'locations':
			switch (key) {
				case "Votre colis est arrivé à l'entrepôt":
					return "Votre colis est arrivé à l'entrepôt";
				case 'Emballage des Colis en Cours':
					return 'Emballage des colis en cours';
				case 'Hong Kong':
					return 'Hong Kong';
				case "L'Éthiopie":
					return "L'Éthiopie";
				case 'Ethiopie':
					return 'Éthiopie';
				case 'Mali':
					return 'Mali';
				case "Colis arrivé à l'aéroport du Mali et prêt pour dédouanement":
					return "Colis arrivé à l'aéroport du Mali et prêt pour dédouanement";
				case 'Les marchandises sont arrivées et ont été stockées (Kalaban-Coura, près de FEBAK, précisément à côté du lycée Birgo. +22376696177 / +22350005142)':
					return 'Les marchandises sont arrivées et ont été stockées (Kalaban-Coura, près de FEBAK, précisément à côté du lycée Birgo. +22376696177 / +22350005142)';
				default:
					return key;
			}
		default:
			return key;
	}
};
