import React from "react";
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { NotificationBell } from "@src/features/notifications";
import type { RootStackScreenProps } from "@src/navigations/type";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { useCreateCampaignScreen } from "../hooks/useCreateCampaignScreen";
import { CampaignForm } from "../components/CampaignForm";
import { CampaignRecipientSelector } from "../components/CampaignRecipientSelector";
import { CampaignSchedule } from "../components/CampaignSchedule";
import { CampaignSubmitFooter } from "../components/CampaignSubmitFooter";
import { createStyles } from "./CreateCampaignScreen.styles";

const CreateCampaignScreen = ({
  navigation,
}: RootStackScreenProps<"CreateCampaign">) => {
  const { colors } = useAppTheme();
  const { state, data, loading, isValid, handlers } = useCreateCampaignScreen(navigation);
  const styles = createStyles(colors);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handlers.goBack}>
          <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nouvelle campagne</Text>
        <NotificationBell
          onPress={handlers.navigateToNotifications}
          size={24}
          color={colors.text.primary}
        />
      </View>

      <KeyboardAvoidingView style={styles.keyboardAvoidingView} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <CampaignForm
            title={state.title}
            body={state.body}
            onTitleChange={handlers.setTitle}
            onBodyChange={handlers.setBody}
          />
          <CampaignRecipientSelector
            segment={state.segment}
            onSegmentChange={handlers.handleSegmentChange}
            selectedContainerId={state.selectedContainerId}
            onSelectContainer={handlers.setSelectedContainerId}
            containersData={data.containersData}
            isLoadingContainers={data.isLoadingContainers}
          />
          <CampaignSchedule
            scheduledDate={state.scheduledDate}
            saveAsDraft={state.saveAsDraft}
            onToggleDraft={() => handlers.setSaveAsDraft((v) => !v)}
            onShowDatePicker={() => handlers.setShowDatePicker(true)}
          />
        </ScrollView>
      </KeyboardAvoidingView>

      <CampaignSubmitFooter
        saveAsDraft={state.saveAsDraft}
        isValid={isValid}
        isPending={loading.isPending}
        showDatePicker={state.showDatePicker}
        scheduledDate={state.scheduledDate}
        onSubmit={handlers.handleSubmit}
        onDismissDatePicker={() => handlers.setShowDatePicker(false)}
        onDateConfirm={handlers.handleDateConfirm}
      />
    </SafeAreaView>
  );
};

export default CreateCampaignScreen;
