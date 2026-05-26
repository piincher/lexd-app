import React from 'react';
import { Controller } from 'react-hook-form';
import { ShippingModeSelector } from '../components/ShippingModeSelector';
import { FormInput } from '../../../components/FormInput';
import { ReceiveGoodsFormSectionProps } from '../types';
import { ReceiveTrackingScannerInput } from './ReceiveTrackingScannerInput';

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
			<ReceiveTrackingScannerInput
				control={control}
				error={errors.expressTrackingNumber?.message}
			/>
		</>
	);
};
