import React, { FC, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MultiSelect } from './components/MultiSelect';
import { useGetUsers } from '../../hooks/useGetUsers';
import { Button, TextInput } from 'react-native-paper';
import { useSendNotificationSms } from '../../hooks/useOrder';
import { Notification } from '@src/components/Notification/Notification';
import AppButton from '@src/components/AppButton/AppButton';
import { COLORS } from '@src/constants/Colors';

interface Props {}

const SendSms: FC<Props> = () => {
	const [selectedItems, setSelectedItems] = React.useState<string[]>([]);
	const [visible, setVisible] = React.useState<boolean>(false);
	const { mutate, isSuccess, isPending } = useSendNotificationSms();
	const [message, setMessage] = React.useState<string>('');

	const { data } = useGetUsers();
	const extractedData = data?.map((item) => {
		return {
			id: item.phoneNumber,
			name: item.firstName,
			info: item.phoneNumber,
		};
	});

	const handleSendSms = () => {
		mutate({
			phoneNumbers: selectedItems,
			message,
		});
	};

	useEffect(() => {
		if (isSuccess) {
			setVisible(true);
		}
	}, [isSuccess]);

	const onDismissSnackBar = () => setVisible(false);
	return (
		<SafeAreaView style={styles.container}>
			<Notification message='message envoye' type='success' visible={visible} onDismissSnackBar={onDismissSnackBar} />
			<MultiSelect
				items={extractedData || []}
				valueKey='id'
				displayKey='name'
				selectedItems={selectedItems}
				setSelectedItems={setSelectedItems}
			/>
			<TextInput
				label='Message'
				mode='outlined'
				onChangeText={(text) => setMessage(text)}
				multiline
				numberOfLines={4}
				style={{ margin: 10 }}
			/>
			<AppButton onPress={handleSendSms} title='Envoyer' busy={isPending} disabled={selectedItems.length === 0} />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default SendSms;
