import { Text, View, StyleSheet, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { navigationProps, RootStackParamList } from '@src/navigations/type';
import { COLORS } from '@src/constants/Colors';
import { Fonts } from '@src/constants/Fonts';

interface Props {
	title: string;
	rightIcon?: React.ReactNode;
	navigation: navigationProps;
	rightIconHandler?: () => void;
}
export const Header = ({ title, rightIcon, navigation, rightIconHandler }: Props) => {
	return (
		<>
			<View style={Styles.container}>
				<AntDesign name='leftcircleo' size={28} color='black' onPress={() => navigation.goBack()} />
				<Text style={Styles.textStyle}>{title}</Text>
				<Pressable onPress={rightIconHandler}>{rightIcon}</Pressable>
			</View>
		</>
	);
};

const Styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 20,
	},
	textStyle: { flex: 1, textAlign: 'center', color: COLORS.blue, fontSize: 20, fontFamily: Fonts.bold },
});
