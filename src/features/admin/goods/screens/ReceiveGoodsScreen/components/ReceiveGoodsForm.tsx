/**
 * ReceiveGoodsForm - Main form component
 * Composes all form sections with React Hook Form
 */
import React from 'react';
import { ScrollView } from 'react-native';
import { useWatch } from 'react-hook-form';
import { GoodsDimensionsInput } from './GoodsDimensionsInput';
import { GoodsPhotosUpload } from './GoodsPhotosUpload';
import { GoodsConditionSelector } from './GoodsConditionSelector';
import { ClientSearchSection } from '../../../components/ClientSearchSection';
import { CostSummary } from '../../../components/CostSummary';
import { ReceiveGoodsFormDateField } from './ReceiveGoodsFormDateField';
import { ReceiveGoodsFormInputRows } from './ReceiveGoodsFormInputRows';
import { ReceiveGoodsFormBasicFields } from './ReceiveGoodsFormBasicFields';
import { ReceiveGoodsFormSectionProps, ClientSelectionProps } from '../types';
import { styles } from './ReceiveGoodsForm.styles';

interface ReceiveGoodsFormProps extends ReceiveGoodsFormSectionProps {
	selectedClient: ClientSelectionProps['selectedClient'];
	onSelectClient: ClientSelectionProps['onSelectClient'];
	clientError?: string;
	useDimensions: boolean;
	onToggleDimensions: (use: boolean) => void;
	calculatedCBM: number;
	photoUris: string[];
	onPhotoSelected: (uri: string) => void;
	onPhotoRemoved: (uri: string) => void;
	totalCost: number;
}

export const ReceiveGoodsForm: React.FC<ReceiveGoodsFormProps> = ({
	control,
	errors,
	setValue,
	watch,
	selectedClient,
	onSelectClient,
	clientError,
	useDimensions,
	onToggleDimensions,
	calculatedCBM,
	photoUris,
	onPhotoSelected,
	onPhotoRemoved,
	totalCost,
}) => {
	const shippingMode = useWatch({ control, name: 'shippingMode' }) || 'SEA';
	const unitPrice = useWatch({ control, name: 'unitPrice' });
	const weight = useWatch({ control, name: 'weight' });
	const unitPriceValue = parseFloat(unitPrice?.replace(',', '.') || '0') || 0;
	const weightValue = parseFloat(weight?.replace(',', '.') || '0') || 0;

	return (
		<ScrollView
			style={styles.scrollView}
			contentContainerStyle={styles.content}
			showsVerticalScrollIndicator={false}
			keyboardShouldPersistTaps="handled"
			nestedScrollEnabled
		>
			<ClientSearchSection
				selectedClient={selectedClient}
				onSelectClient={onSelectClient}
				error={clientError}
			/>
			<ReceiveGoodsFormBasicFields control={control} errors={errors} setValue={setValue} watch={watch} />
			<GoodsDimensionsInput
				control={control}
				errors={errors}
				setValue={setValue}
				watch={watch}
				useDimensions={useDimensions}
				onToggleMode={onToggleDimensions}
				calculatedCBM={calculatedCBM}
				shippingMode={shippingMode}
			/>
			<ReceiveGoodsFormInputRows
				control={control}
				errors={errors}
				shippingMode={shippingMode}
			/>
			<ReceiveGoodsFormDateField
				control={control}
				setValue={setValue}
				error={errors.receivedDate?.message}
			/>
			<GoodsConditionSelector
				control={control}
				errors={errors}
				setValue={setValue}
				watch={watch}
			/>
			<GoodsPhotosUpload
				photoUris={photoUris}
				onPhotoSelected={onPhotoSelected}
				onPhotoRemoved={onPhotoRemoved}
			/>
			<CostSummary
				cbm={calculatedCBM}
				weight={weightValue}
				unitPrice={unitPriceValue}
				totalCost={totalCost}
				shippingMode={shippingMode}
			/>
		</ScrollView>
	);
};
