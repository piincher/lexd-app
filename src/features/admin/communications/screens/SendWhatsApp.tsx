import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconButton, Text } from "react-native-paper";
import { useAppTheme } from "@src/providers/ThemeProvider";
import type { RootStackScreenProps } from "@src/app/navigation/type";
import { WhatsAppManualComposer } from "../components/WhatsAppManualComposer";
import { useSendWhatsAppScreen } from "../hooks/useSendWhatsAppScreen";
import { createStyles } from "./SendWhatsApp.styles";

const SendWhatsApp = ({ navigation }: RootStackScreenProps<"SendWhatsApp">) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const s = useSendWhatsAppScreen();

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
        <View style={styles.headerText}>
          <Text style={styles.eyebrow}>Communications</Text>
          <Text style={styles.title}>WhatsApp manuel</Text>
        </View>
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <WhatsAppManualComposer
            phone={s.phone}
            message={s.message}
            mode={s.mode}
            mediaUrl={s.mediaUrl}
            mediaType={s.mediaType}
            canSend={s.canSend}
            isSending={s.isSending}
            isEnabled={s.config?.enabled}
            isConfigLoading={s.isConfigLoading}
            onPhoneChange={s.setPhone}
            onMessageChange={s.setMessage}
            onModeChange={s.setMode}
            onMediaUrlChange={s.setMediaUrl}
            onMediaTypeChange={s.setMediaType}
            onSend={s.handleSend}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SendWhatsApp;
