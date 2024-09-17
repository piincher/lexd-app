import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@src/components/Header/Header';
import { RootStackScreenProps } from '@src/navigations/type';
import { useCalendar, Calendar } from '@src/components/Calendar/Calendar';
import { AntDesign } from '@expo/vector-icons';
import AppButton from '@src/components/AppButton/AppButton';

const BatchUpdate = ({ navigation }: RootStackScreenProps<'BatchUpdate'>) => {
	const { open, date, onConfirmSingle, onDismissSingle, setOpen } = useCalendar();

	return (
		<SafeAreaView>
			<Header
				title='Batch Update'
				navigation={navigation}
				rightIcon={<AntDesign name='calendar' size={24} color='black' />}
				rightIconHandler={() => setOpen(true)}
			/>
			<Calendar open={open} onDismissSingle={onDismissSingle} date={date} onConfirmSingle={onConfirmSingle} />
			<AppButton onPress={() => console.log('send sms')} title={'Obtenir'} />
		</SafeAreaView>
	);
};

export default BatchUpdate;

const styles = StyleSheet.create({});
