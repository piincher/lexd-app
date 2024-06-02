import { Fonts } from '@src/constants/Fonts';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

const AboutUs = () => {
	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View style={styles.logoContainer}>
				<Image source={require('../../../../assets/images/log.png')} style={styles.logo} />
			</View>
			<Text style={styles.title}>À propos de China Link Express</Text>
			<Text style={styles.description}>
				Chez China Link Express, notre mission est de fournir des services de transport efficaces et fiables de la Chine
				au Mali. Nous nous efforçons de faciliter des solutions logistiques transparentes, garantissant que vos
				marchandises soient livrées en toute sécurité et à temps. Avec un engagement envers l'excellence, nous
				connectons entreprises et individus, les aidant à étendre leur portée et à atteindre leurs objectifs.
			</Text>
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Notre Vision</Text>
				<Text style={styles.sectionContent}>
					Notre vision est d'être la principale société de transport pour les routes Chine-Mali, reconnue pour notre
					service supérieur et notre innovation. Nous visons à combler les distances et à créer un réseau fiable qui
					renforce le commerce et la connectivité entre les deux Pays.
				</Text>
			</View>
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Nos Valeurs</Text>
				<Text style={styles.sectionContent}>
					Nous nous engageons à l'intégrité, la fiabilité et la satisfaction du client. Nos valeurs guident nos
					opérations, assurant que nous tenons nos promesses et maintenons les plus hauts standards de service. Nous
					priorisons la sécurité de vos envois et l'efficacité de nos processus logistiques.
				</Text>
			</View>
			<View style={styles.footer}>
				<Text style={styles.footerText}>© 2024 China Link Express. Tous droits réservés.</Text>
			</View>
		</ScrollView>
	);
};

export default AboutUs;

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		backgroundColor: '#ffffff',
		padding: 20,
		alignItems: 'center',
	},
	logoContainer: {
		marginVertical: 20,
	},
	logo: {
		width: 150,
		height: 150,
		resizeMode: 'contain',
	},
	title: {
		fontSize: 28,
		color: '#333333',
		textAlign: 'center',
		marginVertical: 20,
		fontFamily: Fonts.black,
	},
	description: {
		fontSize: 16,
		color: '#666666',
		textAlign: 'center',
		marginVertical: 10,
		fontFamily: Fonts.regular,
	},
	section: {
		marginVertical: 20,
		paddingHorizontal: 10,
	},
	sectionTitle: {
		fontSize: 22,
		color: '#333333',
		marginBottom: 10,
		fontFamily: Fonts.bold,
	},
	sectionContent: {
		fontSize: 16,
		color: '#666666',
		textAlign: 'left',
		fontFamily: Fonts.regular,
	},
	footer: {
		marginTop: 30,
		alignItems: 'center',
	},
	footerText: {
		fontSize: 14,
		color: '#999999',
	},
});
