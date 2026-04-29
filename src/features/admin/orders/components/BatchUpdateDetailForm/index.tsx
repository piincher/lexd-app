import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { Fonts } from "@src/constants/Fonts";
import { IMAGES } from "@src/constants/Images";
import Form from "@src/components/Form/Form";
import SubmitBtn from "@src/components/SubmitBtn/SubmitBtn";

interface BatchUpdateDetailFormProps {
	pickerValue: string | null;
	setPickerValue: (value: string | null) => void;
	setCategory: (value: string | null) => void;
	data?: Array<{ id: string; title: string }>;
	isPending: boolean;
	onSubmit: (data: { contenairNumber: string }) => void;
	initialValues: { contenairNumber: string };
	batchUpdateSchema: any;
}

export const BatchUpdateDetailForm: React.FC<BatchUpdateDetailFormProps> = ({
	pickerValue,
	setPickerValue,
	setCategory,
	data,
	isPending,
	onSubmit,
	initialValues,
	batchUpdateSchema,
}) => {
	const { colors } = useAppTheme();

	return (
		<Form initialValues={initialValues} validationSchema={batchUpdateSchema} onSubmit={onSubmit}>
			<View style={styles.container}>
				<Image source={IMAGES.logo} style={styles.logo} />
				<Text style={styles.title}>Quelle action souhaitez-vous faire ?</Text>
				<View style={[styles.pickerContainer, { borderColor: colors.border }]}>
					<Picker
						mode="dialog"
						placeholder="Choisir Categorie"
						style={styles.picker}
						selectedValue={pickerValue}
						onValueChange={(e) => [setPickerValue(e), setCategory(e!)]}
					>
						{data?.map((c) => {
							return <Picker.Item key={c.id} label={c.title} value={c.title} />;
						})}
					</Picker>
				</View>
				<View style={styles.submitContainer}>
					<SubmitBtn title="Continue" busy={isPending} />
				</View>
			</View>
		</Form>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginHorizontal: 20,
		justifyContent: "center",
	},
	logo: {
		height: 150,
		width: 200,
		alignSelf: "center",
		marginBottom: 20,
	},
	title: {
		textAlign: "center",
		fontFamily: Fonts.bold,
		fontSize: 18,
	},
	pickerContainer: {
		borderWidth: 1,
	},
	picker: {
		width: "100%",
		height: 50,
	},
	submitContainer: {
		marginTop: 18,
	},
});
