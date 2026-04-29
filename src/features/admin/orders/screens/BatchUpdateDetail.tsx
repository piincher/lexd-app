import React from "react";
import { Screen } from "@src/shared/ui/Screen";
import type { RootStackScreenProps } from "@src/navigations/type";
import { useBatchUpdateDetail } from "../hooks/useBatchUpdateDetail";
import { BatchUpdateDetailForm } from "../components/BatchUpdateDetailForm";

const BatchUpdateDetail = ({ route }: RootStackScreenProps<"BatchUpdateDetail">) => {
	const { data: ids } = route.params;
	const {
		pickerValue,
		setPickerValue,
		setCategory,
		data,
		isPending,
		onSubmit,
		initialValues,
		batchUpdateSchema,
	} = useBatchUpdateDetail({ ids });

	return (
		<Screen scrollable={false}>
			<BatchUpdateDetailForm
				pickerValue={pickerValue}
				setPickerValue={setPickerValue}
				setCategory={setCategory}
				data={data}
				isPending={isPending}
				onSubmit={onSubmit}
				initialValues={initialValues}
				batchUpdateSchema={batchUpdateSchema}
			/>
		</Screen>
	);
};

export default BatchUpdateDetail;
