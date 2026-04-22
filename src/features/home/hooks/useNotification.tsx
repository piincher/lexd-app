import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { useEffect, useState } from "react";
import { Platform } from "react-native";

export const useNotification = () => {
	const { colors } = useAppTheme();
	const [expoPushToken, setExpoPushToken] = useState("");
	const [channels, setChannels] = useState<Notifications.NotificationChannel[]>([]);
	const [notification, setNotification] = useState<Notifications.Notification | undefined>(
		undefined
	);

	useEffect(() => {
		registerForPushNotificationsAsync(colors.primary.main).then((token) => token && setExpoPushToken(token));

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
	}, [colors.primary.main]);

	return { expoPushToken, channels, notification };
};

async function registerForPushNotificationsAsync(lightColor: string) {
	let token;

	if (Platform.OS === "android") {
		await Notifications.setNotificationChannelAsync("default", {
			name: "default",
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor,
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
				projectId: Constants?.expoConfig?.extra?.eas?.projectId || process.env.EXPO_PUBLIC_EAS_PROJECT_ID || "e4e59c47-9dfe-4dff-8b6d-7cf9a102486d",
			})
		).data;
	} else {
		console.log("Must use physical device for Push Notifications");
	}

	return token;
}
