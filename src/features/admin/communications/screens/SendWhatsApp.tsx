import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconButton, Text } from "react-native-paper";
import { useAppTheme } from "@src/providers/ThemeProvider";
import type { RootStackScreenProps } from "@src/app/navigation/type";
import { Calendar } from "@src/components/Calendar/Calendar";
import { RecipientSelector } from "../components/RecipientSelector";
import { WhatsAppManualNumbers } from "../components/WhatsAppManualNumbers";
import { WhatsAppMediaPicker } from "../components/WhatsAppMediaPicker";
import { WhatsAppMessageComposer } from "../components/WhatsAppMessageComposer";
import { WhatsAppSendConfirmModal } from "../components/WhatsAppSendConfirmModal";
import { SendSmsSuccessOverlay } from "../components/SendSmsSuccessOverlay";
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
        <View style={styles.recipientSection}>
          <RecipientSelector
            mode={s.mode}
            onModeChange={s.setMode}
            recipients={s.allRecipients}
            selectedIds={s.selectedIds}
            onToggle={s.handleToggle}
            onSelectAll={s.handleSelectAll}
            onDeselectAll={s.handleDeselectAll}
            search={s.search}
            onSearchChange={s.setSearch}
            isLoading={s.mode === "all" ? s.isLoadingUsers : s.isFetchingByDate}
            dateLabel={s.dateLabel}
            onOpenCalendar={s.handleOpenCalendar}
            onFetchByDate={s.handleFetchByDate}
            isFetchingByDate={s.isFetchingByDate}
          />
        </View>

        <ScrollView
          style={styles.composePanel}
          contentContainerStyle={styles.composeContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <WhatsAppManualNumbers
            numbers={s.manualNumbers}
            onAddNumber={s.addManualNumber}
            onRemoveNumber={s.removeManualNumber}
          />

          <WhatsAppMediaPicker
            items={s.media.items}
            canAddMore={s.media.canAddMore}
            disabled={s.isSending}
            onPickImages={s.media.pickImages}
            onPickVideos={s.media.pickVideos}
            onRemove={s.media.removeItem}
            onRetry={s.media.retryItem}
          />

          <WhatsAppMessageComposer
            message={s.message}
            onMessageChange={s.setMessage}
            onInsertToken={s.insertToken}
            recipientCount={s.recipientCount}
            mediaCount={s.media.count}
            isSending={s.isSending}
            isUploading={s.media.isUploading}
            canSend={s.canSend}
            isEnabled={s.config?.enabled}
            isConfigLoading={s.isConfigLoading}
            onSend={s.handleSendPress}
          />
        </ScrollView>
      </KeyboardAvoidingView>

      <Calendar
        open={s.calendar.open}
        onDismissSingle={s.calendar.onDismissSingle}
        date={s.calendar.date}
        onConfirmSingle={s.calendar.onConfirmSingle}
      />

      <WhatsAppSendConfirmModal
        visible={s.showConfirmation}
        recipientCount={s.recipientCount}
        mediaCount={s.media.count}
        messagePreview={s.message}
        isSending={s.isSending}
        onConfirm={s.handleConfirmSend}
        onCancel={() => s.setShowConfirmation(false)}
      />

      <SendSmsSuccessOverlay visible={s.showSuccess} sentCount={s.sentCount} />
    </SafeAreaView>
  );
};

export default SendWhatsApp;
