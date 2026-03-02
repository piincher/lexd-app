import { chatClient } from "@src/config/ChatConfig";
import { COLORS } from "@src/constants/Colors";
import { useAppContext } from "../context/ChatContext";
import { RootStackScreenProps } from "@src/navigations/type";
import { useEffect } from "react";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Channel, MessageList, MessageInput } from "stream-chat-expo";

const ChatRoom = ({ route }: RootStackScreenProps<"ChatRoom">) => {
   const { channel: activeChannel, setChannel: setActiveChannel } = useAppContext();
   const { id } = route.params;

   useEffect(() => {
      const initialization = async () => {
         let channelWithId = chatClient.channel("messaging", id);

         if (!channelWithId.initialized) {
            await channelWithId.watch();
         }
         setActiveChannel(channelWithId);
      };
      initialization();
      return () => {
         setActiveChannel(null);
      };
   }, [id]);

   if (!activeChannel) {
      return <Text>Loading...</Text>;
   }
   const theme = {
      messageList: {
         container: {
            backgroundColor: "transparent",
         },
      },
   };

   return (
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
         <Channel channel={activeChannel}>
            <MessageList />
            <MessageInput />
         </Channel>
      </SafeAreaView>
   );
};

export default ChatRoom;
