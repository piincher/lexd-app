import { COLORS } from '@src/constants/Colors';
import { Fonts } from '@src/constants/Fonts';
import { Pressable, Text, View } from 'react-native';

const status = [
	{
		id: '0',
		title: 'Active',
	},

	{
		id: '1',
		title: 'In Transit',
	},
	{
		id: '2',
		title: 'Inactive',
	},
];

interface CategoryProps {
	statusChange: string;
	setStatusChange: (status: string) => void;
	onStatusChange: (status: string) => void;
}
export const Category = ({ setStatusChange, statusChange, onStatusChange }: CategoryProps) => {
	return (
		<>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
					marginHorizontal: 10,
				}}
			>
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
							{item.title}
						</Text>
					</Pressable>
				))}
			</View>
		</>
	);
};
