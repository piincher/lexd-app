/**
 * ExportDataModal Component
 *
 * Modal for configuring and initiating data exports
 */

import React, { useRef } from "react";
import { View, Modal, ScrollView } from "react-native";
import { Text, Button, IconButton, Divider } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";

import { ExportDataModalProps } from "./ExportDataModal.types";
import { useExportDataModal } from "./useExportDataModal";
import { FormatSection } from "./FormatSection";
import { DateRangeSection } from "./DateRangeSection";
import { StatusPicker } from "./StatusPicker";
import { SchedulingSection } from "./SchedulingSection";
import { EmailSection } from "./EmailSection";
import { ReasonSection } from "./ReasonSection";
import { createStyles } from './ExportDataModal.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

export const ExportDataModal: React.FC<ExportDataModalProps> = ({
  visible,
  onDismiss,
  entity,
  entityLabel,
}) => {
  const {
    format,
    setFormat,
    startDate,
    endDate,
    showDatePicker,
    setShowDatePicker,
    datePickerMode,
    setDatePickerMode,
    status,
    setStatus,
    isScheduled,
    setIsScheduled,
    frequency,
    setFrequency,
    email,
    setEmail,
    sendEmail,
    setSendEmail,
    emailMethod,
    setEmailMethod,
    reason,
    setReason,
    handleDateConfirm,
    handleExport,
    isLoading,
  } = useExportDataModal(entity, onDismiss);

  const { colors, isDark } = useAppTheme();

  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);

  const scrollViewRef = useRef<ScrollView>(null);
  const scrollToEnd = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 250);
  };

  return (
    <Modal visible={visible} onRequestClose={onDismiss} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text variant="titleLarge" style={styles.title}>
              Export {entityLabel}
            </Text>
            <IconButton icon="close" onPress={onDismiss} />
          </View>

          <ScrollView
            ref={scrollViewRef}
            style={styles.content}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <FormatSection format={format} onChange={setFormat} />
            <Divider style={styles.divider} />

            <DateRangeSection
              startDate={startDate}
              endDate={endDate}
              onStartPress={() => {
                setDatePickerMode("start");
                setShowDatePicker(true);
              }}
              onEndPress={() => {
                setDatePickerMode("end");
                setShowDatePicker(true);
              }}
            />
            <Divider style={styles.divider} />

            <Text variant="titleMedium" style={styles.sectionTitle}>
              Status Filter (Optional)
            </Text>
            <StatusPicker entity={entity} value={status} onSelect={setStatus} />
            <Divider style={styles.divider} />

            <SchedulingSection
              isScheduled={isScheduled}
              onToggle={() => setIsScheduled(!isScheduled)}
              frequency={frequency}
              onFrequencyChange={setFrequency}
            />
            <Divider style={styles.divider} />

            <EmailSection
              sendEmail={sendEmail}
              onToggle={() => setSendEmail(!sendEmail)}
              email={email}
              onEmailChange={setEmail}
              emailMethod={emailMethod}
              onMethodChange={setEmailMethod}
              onInputFocus={scrollToEnd}
            />
            <Divider style={styles.divider} />

            <ReasonSection reason={reason} onChange={setReason} onInputFocus={scrollToEnd} />
            <View style={{ height: 280 }} />
          </ScrollView>

          <View style={styles.footer}>
            <Button mode="outlined" onPress={onDismiss} style={styles.button}>
              Cancel
            </Button>
            <Button
              mode="contained"
              onPress={handleExport}
              loading={isLoading}
              disabled={isLoading}
              style={styles.button}
            >
              {isScheduled ? "Schedule" : "Export"}
            </Button>
          </View>
        </View>
      </View>

      <DatePickerModal
        locale="en"
        mode="single"
        visible={showDatePicker}
        onDismiss={() => setShowDatePicker(false)}
        date={datePickerMode === "start" ? startDate : endDate}
        onConfirm={handleDateConfirm}
        validRange={{
          startDate: new Date(2020, 0, 1),
          endDate: new Date(),
        }}
      />
    </Modal>
  );
};

export default ExportDataModal;
