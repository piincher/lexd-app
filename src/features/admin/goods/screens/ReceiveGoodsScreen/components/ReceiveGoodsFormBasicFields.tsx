import React from 'react';
import { Controller } from 'react-hook-form';
import { ShippingModeSelector } from '../components/ShippingModeSelector';
import { FormInput } from '../../../components/FormInput';
import { ReceiveGoodsFormSectionProps } from '../types';

export const ReceiveGoodsFormBasicFields: React.FC<ReceiveGoodsFormSectionProps> = ({
	control,
	errors,
}) => {
	return (
		<>
			<Controller
				control={control}
				name="shippingMode"
				render={({ field: { onChange, value } }) => (
					<ShippingModeSelector
						value={value}
						onChange={onChange}
						error={errors.shippingMode?.message}
					/>
				)}
			/>
			<Controller
				control={control}
				name="description"
				render={({ field: { onChange, value } }) => (
					<FormInput
						label="Description"
						value={value}
						onChangeText={onChange}
						error={errors.description?.message}
						placeholder="Description de la marchandise"
						multiline
						numberOfLines={3}
					/>
				)}
			/>
			<Controller
				control={control}
				name="expressTrackingNumber"
				render={({ field: { onChange, value } }) => (
					<FormInput
						label="N° de suivi express (optionnel)"
						value={value}
						onChangeText={onChange}
						error={errors.expressTrackingNumber?.message}
						placeholder="Ex: 1Z999AA10123456784"
						autoCapitalize="characters"
					/>
				)}
			/>
		</>
	);
};
