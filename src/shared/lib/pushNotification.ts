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
