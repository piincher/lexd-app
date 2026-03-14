// Shared Chat Hooks
// Used across multiple features (order-detail, etc.)

import { useAuth } from '@src/store/Auth';
import { chatClient } from '@src/config/ChatConfig';
import { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';

type User = {
	id: string;
	name: string;
	image?: string;
};

export const useChatClient = () => {
	const userData = useAuth((state) => state.user);
	const [clientIsReady, setClientIsReady] = useState(false);
	const [streamChat, setStreamChat] = useState<StreamChat>(chatClient);

	const streamToken = useAuth((state) => state.streamToken);

	const user = {
		id: userData._id,
		name: userData.firstName,
	};
	
	useEffect(() => {
		const setupClient = async () => {
			try {
				chatClient.connectUser(user, streamToken);
				setClientIsReady(true);
				setStreamChat(chatClient);
			} catch (error) {
				if (error instanceof Error) {
					console.error(`An error occurred while connecting the user: ${error.message}`);
				}
			}
		};

		if (!chatClient.userID) {
			setupClient();
		}
	}, [user]);

	return {
		clientIsReady,
		streamChat,
		user,
	};
};
