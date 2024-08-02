import { Pressable, StyleSheet, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Fonts } from '@src/constants/Fonts';
import { COLORS } from '@src/constants/Colors';
interface Item {
	item: { id: string; title: string; route: string };
	navigation: any;
}
export const RenderHomeItem = ({ item, navigation }: Item) => {
	return (
		<>
			<Pressable key={item.id} style={styles.pressable} onPress={() => navigation.navigate(item.route)}>
				<Text style={styles.title}>{item.title}</Text>
				<MaterialIcons name='navigate-next' size={24} color={COLORS.blue} />
			</Pressable>
		</>
	);
};

const styles = StyleSheet.create({
	title: {
		fontFamily: Fonts.meduim,
	},
	pressable: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderColor: COLORS.blue,
		borderWidth: 0.2,
		padding: 12,
		margin: 20,
	},
});
