import { COLORS } from '@src/constants/Colors';
import { Fonts } from '@src/constants/Fonts';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface CategoryProps {
	statusChange: string;
	setStatusChange: (status: string) => void;
	onStatusChange: (status: string) => void;
	status: { id: string; title: string }[];
}
export const Category = ({ setStatusChange, statusChange, onStatusChange, status }: CategoryProps) => {
	return (
		<>
			<View style={styles.container}>
				{status.map((item) => (
					<Pressable
						key={item.id}
						style={{ flexDirection: 'row', marginHorizontal: 10 }}
						onPress={() => onStatusChange(item.title)}
					>
						<Text
							style={{
								fontSize: 24,
								fontFamily: Fonts.bold,
								color: item.title === statusChange ? COLORS.blue : COLORS.grey,
								textAlign: 'center',
							}}
						>
							{item.title === 'Active' ? 'En cours' : item.title === 'In Transit' ? 'En transit' : 'Inactif'}
						</Text>
					</Pressable>
				))}
			</View>
		</>
	);
};

export const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginHorizontal: 10,
	},
});
