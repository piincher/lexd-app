import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { DatePickerModal } from 'react-native-paper-dates';
import { CalendarDate } from 'react-native-paper-dates/lib/typescript/Date/Calendar';

interface Props {
	date: CalendarDate;
	open: boolean;
	onDismissSingle: () => void;
	onConfirmSingle: (params: any) => void;
}

export const Calendar = ({ date, open, onDismissSingle, onConfirmSingle }: Props) => {
	return (
		<DatePickerModal
			locale='en'
			mode='single'
			visible={open}
			onDismiss={onDismissSingle}
			date={date}
			onConfirm={onConfirmSingle}
			saveLabel='Save'
			label='Select Date'
			animationType='slide'
			presentationStyle='overFullScreen'
		/>
	);
};

const styles = StyleSheet.create({
	container: {},
});

export const useCalendar = () => {
	const [date, setDate] = React.useState(undefined);
	const [open, setOpen] = React.useState(false);

	const onDismissSingle = React.useCallback(() => {
		setOpen(false);
	}, [setOpen]);

	const onConfirmSingle = React.useCallback(
		(params) => {
			setOpen(false);
			setDate(params.date);
		},
		[setOpen, setDate]
	);
	return { date, setDate, open, setOpen, onDismissSingle, onConfirmSingle };
};
