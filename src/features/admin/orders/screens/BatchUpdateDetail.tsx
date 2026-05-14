import React from "react";
import { Screen } from "@src/shared/ui/Screen";
import type { RootStackScreenProps } from "@src/navigations/type";
import { useBatchUpdateDetail } from "../hooks/useBatchUpdateDetail";
import { BatchUpdateSummaryCard } from "../components/BatchUpdateSummaryCard";
import { BatchUpdateStatusStepper } from "../components/BatchUpdateStatusStepper";
import { BatchUpdateConfirmBar } from "../components/BatchUpdateConfirmBar";

const BatchUpdateDetail = ({ route }: RootStackScreenProps<"BatchUpdateDetail">) => {
	const { data: ids } = route.params;
	const {
		pickerValue,
		setPickerValue,
		data: backendSteps,
		isPending,
		onSubmit,
	} = useBatchUpdateDetail({ ids });

	const steps = backendSteps?.map((s) => ({ id: s.id, title: s.title })) || [];

	return (
		<Screen
			header={{
				title: "Confirmer la mise à jour",
				showBack: true,
			}}
			footer={
				<BatchUpdateConfirmBar
					disabled={!pickerValue}
					loading={isPending}
					orderCount={ids.length}
					onConfirm={() => onSubmit({ contenairNumber: "" })}
				/>
			}
		>
			<BatchUpdateSummaryCard orderCount={ids.length} />
			<BatchUpdateStatusStepper
				steps={steps}
				selected={pickerValue}
				onSelect={setPickerValue}
			/>
		</Screen>
	);
};

export default BatchUpdateDetail;
