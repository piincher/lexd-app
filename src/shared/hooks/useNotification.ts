import { COLORS } from "@src/constants/Colors";
import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import { Platform } from "react-native";

export const useNotification = () => {
	const [expoPushToken, setExpoPushToken] = useState("");
	const [channels, setChannels] = useState<Notifications.NotificationChannel[]>([]);
	const [notification, setNotification] = useState<Notifications.Notification | undefined>(
		undefined
	);

	useEffect(() => {
		registerForPushNotificationsAsync().then((token) => token && setExpoPushToken(token));

		if (Platform.OS === "android") {
			Notifications.getNotificationChannelsAsync().then((value) => setChannels(value ?? []));
		}
		const notificationListener = Notifications.addNotificationReceivedListener((notification) => {
			setNotification(notification);
		});

		const responseListener = Notifications.addNotificationResponseReceivedListener((response) => {
			console.log(response);
		});

		return () => {
			notificationListener.remove();
			responseListener.remove();
		};
	}, []);

	return { expoPushToken, channels, notification };
};

async function registerForPushNotificationsAsync() {
	let token;

	if (Platform.OS === "android") {
		await Notifications.setNotificationChannelAsync("default", {
			name: "default",
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: COLORS.blue,
		});
	}

	if (Device.isDevice) {
		const { status: existingStatus } = await Notifications.getPermissionsAsync();
		let finalStatus = existingStatus;
		if (existingStatus !== "granted") {
			const { status } = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		}
		if (finalStatus !== "granted") {
			alert("Failed to get push token for push notification!");
			return;
		}
		token = (
			await Notifications.getExpoPushTokenAsync({
				projectId: Constants?.expoConfig?.extra?.eas.projectId,
			})
		).data;
	} else {
		console.log("Must use physical device for Push Notifications");
	}

	return token;
}

export const sendPushNotification = async (
	expoPushToken: string[],
	title: string,
	body: string,
	action: string
) => {
	const tokens = expoPushToken;
	for (let i = 0; i < tokens.length; i++) {
		const pushToken = tokens[i];
		const message = {
			to: pushToken,
			sound: "default",
			title: title,
			body: body,
			data: { action },
			priority: "high",
		};
		await fetch("https://api.expo.dev/v2/push/send", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Accept-encoding": "gzip, deflate",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(message),
		});
	}
};
