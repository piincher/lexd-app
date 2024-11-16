import { StackActions, useNavigation } from '@react-navigation/native';
import { COLORS } from '@src/constants/Colors';
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';

export const useNotification = () => {
	const [expoPushToken, setExpoPushToken] = useState('');
	const notificationListener = useRef<Notifications.Subscription>();
	const responseListener = useRef<Notifications.Subscription>();

	useEffect(() => {
		registerForPushNotificationsAsync().then((token) => setExpoPushToken(token!));

		notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
			console.log('notification received');
		});

		responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
			const { action } = response.notification.request.content.data;
			if (action === 'connectionRequest') {
				console.log('connection');
			}
		});

		return () => {
			if (notificationListener.current) {
				Notifications.removeNotificationSubscription(notificationListener.current);
			}
			if (responseListener.current) {
				Notifications.removeNotificationSubscription(responseListener.current);
			}
		};
	}, []);

	return { expoPushToken };
};

async function registerForPushNotificationsAsync() {
	let token;

	if (Platform.OS === 'android') {
		console.log('android');
		await Notifications.setNotificationChannelAsync('test', {
			name: 'test',
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: COLORS.blue,
		});
	}

	console.log('device', Device.isDevice);
	if (Device.isDevice) {
		const { status: existingStatus } = await Notifications.getPermissionsAsync();
		let finalStatus = existingStatus;
		if (existingStatus !== 'granted') {
			const { status } = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		}
		if (finalStatus !== 'granted') {
			alert('Failed to get push token for push notification!');
			return;
		}
		token = (
			await Notifications.getExpoPushTokenAsync({
				projectId: Constants?.expoConfig?.extra?.eas.projectId,
			})
		).data;
	} else {
		console.log('Must use physical device for Push Notifications');
	}

	return token;
}

export const sendPushNotification = async (expoPushToken: string[], title: string, body: string, action: string) => {
	const tokens = expoPushToken;
	for (let i = 0; i < tokens.length; i++) {
		const pushToken = tokens[i];
		const message = {
			to: pushToken,
			sound: 'default',
			title: title,
			body: body,
			data: { action },
			priority: 'high',
			// badge: 1,
		};
		await fetch('https://api.expo.dev/v2/push/send', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Accept-encoding': 'gzip, deflate',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(message),
		});
	}
};
