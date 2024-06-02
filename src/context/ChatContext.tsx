import React, { Dispatch, SetStateAction, useState } from 'react';
import { ChannelPreviewMessengerProps } from 'stream-chat-expo';

export type StreamChannel = ChannelPreviewMessengerProps['channel'] | undefined;

type contextType = {
	channel: StreamChannel;
	setChannel: Dispatch<SetStateAction<StreamChannel>>;
};
export const ChatContext = React.createContext<contextType>({} as contextType);

interface ChatContextProps {
	children: React.ReactNode;
}

export const ChatProvider = ({ children }: ChatContextProps) => {
	const [channel, setChannel] = useState<StreamChannel>();

	return <ChatContext.Provider value={{ channel, setChannel }}>{children}</ChatContext.Provider>;
};

export const useAppContext = () => React.useContext(ChatContext);
