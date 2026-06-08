/**
 * ReceiveGoodsForm - Main form component
 * Composes all form sections with React Hook Form
 */
import React from 'react';
import { ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useWatch } from 'react-hook-form';
import type { userData } from '@src/shared/types/user';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { GoodsDimensionsInput } from './GoodsDimensionsInput';
import { GoodsPhotosUpload } from './GoodsPhotosUpload';
import { GoodsConditionSelector } from './GoodsConditionSelector';
import { ReceiveExceptionPanel } from './ReceiveExceptionPanel';
import { RecentClientRail } from './RecentClientRail';
import { WhatsappNotifyToggle } from './WhatsappNotifyToggle';
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
	onPhotoSelected: (uri: string, source?: 'camera' | 'gallery') => void;
	onPhotoRemoved: (uri: string) => void;
	totalCost: number;
	recentClients: userData[];
	priceWarning?: string | null;
	/** Per-receipt WhatsApp notification opt-out (default ON). */
	notifyWhatsapp: boolean;
	onChangeNotifyWhatsapp: (notify: boolean) => void;
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
	recentClients,
	priceWarning,
	notifyWhatsapp,
	onChangeNotifyWhatsapp,
}) => {
	const { colors } = useAppTheme();
	const shippingMode = useWatch({ control, name: 'shippingMode' }) || 'SEA';
	const unitPrice = useWatch({ control, name: 'unitPrice' });
	const weight = useWatch({ control, name: 'weight' });
	const exceptionReasons = useWatch({ control, name: 'exceptionReasons' }) || [];
	const isClientUnknown = exceptionReasons.includes('CLIENT_UNKNOWN');
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
			<ReceiveExceptionPanel
				control={control}
				setValue={setValue}
				noteError={errors.exceptionNotes?.message}
				photoCount={photoUris.length}
				onUnknownClient={() => onSelectClient(null)}
			/>
			{isClientUnknown ? (
				<View style={[styles.unknownClientNotice, { backgroundColor: colors.feedback.warningBg }]}>
					<Text style={[styles.unknownClientText, { color: colors.feedback.warningDark }]}>
						Ce colis sera enregistré dans la file de revue sans client.
					</Text>
				</View>
			) : (
				<>
					<RecentClientRail clients={recentClients} onSelect={onSelectClient} />
					<ClientSearchSection
						selectedClient={selectedClient}
						onSelectClient={onSelectClient}
						error={clientError}
					/>
					{/* Per-receipt WhatsApp opt-out. Always visible in the known-client
					    flow so the operator can set the intent up front (before or after
					    picking the client). Only the WhatsApp message is affected — push
					    and in-app notifications still fire. Hidden only for unknown-client
					    intake, where there is no recipient to message. */}
					<WhatsappNotifyToggle
						value={notifyWhatsapp}
						onChange={onChangeNotifyWhatsapp}
					/>
				</>
			)}
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
				priceWarning={priceWarning}
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
