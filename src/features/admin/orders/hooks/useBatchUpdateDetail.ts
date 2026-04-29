import { useState } from "react";
import { Alert } from "react-native";
import * as yup from "yup";
import { useUpdateOrderStatus } from "./useOrderManagement";
import { useGetSeaRoutes } from "@src/shared/hooks/useRoutes";

const batchUpdateSchema = yup.object({
	contenairNumber: yup.string(),
});

const steps = [
	{
		id: "0",
		title: "le client a passé une commande",
	},
	{
		id: "1",
		title: "les colis sont emballées",
	},
	{
		id: "2",
		title: "le conteneur est en route pour le Cameroun",
	},
	{
		id: "3",
		title: "Les marchandises sont arrivées et ont été stockées.(Kalaban-Coura pres de FEBAK +2237XXXXX/+223XXXXXXX)",
	},
];

interface UseBatchUpdateDetailParams {
	ids: string[];
}

export const useBatchUpdateDetail = ({ ids }: UseBatchUpdateDetailParams) => {
	const [pickerValue, setPickerValue] = useState<string | null>(null);
	const [category, setCategory] = useState<string | null>(steps[0].title);
	const { data } = useGetSeaRoutes();
	const { mutate, isPending } = useUpdateOrderStatus();

	const onSubmit = (data: { contenairNumber: string }) => {
		Alert.alert(
			"Confirmer la mise à jour",
			`Modifier le statut de ${ids.length} commande(s) vers "${pickerValue}" ?`,
			[
				{ text: "Annuler", style: "cancel" },
				{ text: "Confirmer", onPress: () => mutate({ orders: ids, title: pickerValue! }) },
			]
		);
	};

	const initialValues = {
		contenairNumber: "",
	};

	return {
		pickerValue,
		setPickerValue,
		category,
		setCategory,
		data,
		isPending,
		onSubmit,
		initialValues,
		batchUpdateSchema,
	};
};
