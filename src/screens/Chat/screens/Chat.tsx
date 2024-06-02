import { COLORS } from '@src/constants/Colors';
import { useAppContext } from '@src/context/ChatContext';
import { HomeTabScreenProps } from '@src/navigations/type';
import { useAuth } from '@src/store/Auth';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChannelList } from 'stream-chat-expo';
import { useChatClient } from '../hooks/useChatClient';
import { ActivityIndicator } from 'react-native-paper';

const Chat = ({ navigation }: HomeTabScreenProps<'Chat'>) => {
	const { setChannel } = useAppContext();
	const { clientIsReady } = useChatClient();
	const user = useAuth((state) => state.user);
	const filters = {
		members: {
			$in: [user._id],
		},
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
			<ChannelList
				sort={{ last_message_at: -1 }}
				filters={filters}
				onSelect={(channel) => {
					setChannel(channel);
					navigation.navigate('ChatRoom', { id: channel.id });
				}}
			/>
		</SafeAreaView>
	);
};

export default Chat;
