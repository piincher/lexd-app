/**
 * ExportDataModal Component
 * 
 * Modal for configuring and initiating data exports
 */

import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  Text,
  Button,
  RadioButton,
  Checkbox,
  TextInput,
  Divider,
  ActivityIndicator,
  IconButton,
} from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import { format } from "date-fns/format";

import { ExportEntity, ExportFormat, ScheduleFrequency, ExportFilters } from "../types";
import { Theme } from "@src/constants/Theme";
import {
  useExportData,
  useScheduleExport,
} from "../hooks/useExport";

interface ExportDataModalProps {
  visible: boolean;
  onDismiss: () => void;
  entity: ExportEntity;
  entityLabel: string;
}

const EXPORT_FORMATS: { value: ExportFormat; label: string; icon: string }[] = [
  { value: "CSV", label: "CSV File", icon: "file-delimited" },
  { value: "EXCEL", label: "Excel Spreadsheet", icon: "file-excel" },
  { value: "JSON", label: "JSON File", icon: "code-json" },
];

const SCHEDULE_FREQUENCIES: { value: ScheduleFrequency; label: string }[] = [
  { value: "DAILY", label: "Daily" },
  { value: "WEEKLY", label: "Weekly" },
  { value: "MONTHLY", label: "Monthly" },
];

export const ExportDataModal: React.FC<ExportDataModalProps> = ({
  visible,
  onDismiss,
  entity,
  entityLabel,
}) => {
  // State
  const [format, setFormat] = useState<ExportFormat>("CSV");
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [datePickerMode, setDatePickerMode] = useState<"start" | "end">("start");
  const [status, setStatus] = useState<string>("");
  const [isScheduled, setIsScheduled] = useState(false);
  const [frequency, setFrequency] = useState<ScheduleFrequency>("DAILY");
  const [email, setEmail] = useState("");
  const [sendEmail, setSendEmail] = useState(false);
  const [emailMethod, setEmailMethod] = useState<"LINK" | "ATTACHMENT">("LINK");
  const [reason, setReason] = useState("");

  // Mutations
  const exportMutation = useExportData();
  const scheduleMutation = useScheduleExport();

  const handleDateConfirm = (params: { date: Date }) => {
    if (datePickerMode === "start") {
      setStartDate(params.date);
    } else {
      setEndDate(params.date);
    }
    setShowDatePicker(false);
  };

  const handleExport = async () => {
    const filters: ExportFilters = {};

    if (startDate || endDate) {
      filters.dateRange = {
        startDate: startDate?.toISOString(),
        endDate: endDate?.toISOString(),
      };
    }

    if (status) {
      filters.status = status;
    }

    if (isScheduled) {
      await scheduleMutation.mutateAsync({
        entity,
        request: {
          format,
          filters,
          frequency,
          emailOptions: sendEmail && email ? { email, method: emailMethod } : undefined,
          reason: reason || undefined,
        },
      });
    } else {
      await exportMutation.mutateAsync({
        entity,
        request: {
          format,
          filters,
          emailOptions: sendEmail && email ? { email, method: emailMethod } : undefined,
          reason: reason || undefined,
        },
      });
    }

    onDismiss();
    resetForm();
  };

  const resetForm = () => {
    setFormat("CSV");
    setStartDate(undefined);
    setEndDate(undefined);
    setStatus("");
    setIsScheduled(false);
    setFrequency("DAILY");
    setEmail("");
    setSendEmail(false);
    setEmailMethod("LINK");
    setReason("");
  };

  const isLoading = exportMutation.isPending || scheduleMutation.isPending;

  return (
    <Modal
      visible={visible}
      onRequestClose={onDismiss}
      animationType="slide"
      transparent
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text variant="titleLarge" style={styles.title}>
              Export {entityLabel}
            </Text>
            <IconButton icon="close" onPress={onDismiss} />
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Format Selection */}
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Export Format
            </Text>
            <RadioButton.Group
              onValueChange={(value) => setFormat(value as ExportFormat)}
              value={format}
            >
              {EXPORT_FORMATS.map((f) => (
                <RadioButton.Item
                  key={f.value}
                  label={f.label}
                  value={f.value}
                  position="leading"
                />
              ))}
            </RadioButton.Group>

            <Divider style={styles.divider} />

            {/* Date Range */}
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Date Range (Optional)
            </Text>
            <View style={styles.dateContainer}>
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => {
                  setDatePickerMode("start");
                  setShowDatePicker(true);
                }}
              >
                <Text variant="bodyMedium">
                  {startDate ? format(startDate, "MMM dd, yyyy") : "Start Date"}
                </Text>
              </TouchableOpacity>
              <Text variant="bodyLarge"> to </Text>
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => {
                  setDatePickerMode("end");
                  setShowDatePicker(true);
                }}
              >
                <Text variant="bodyMedium">
                  {endDate ? format(endDate, "MMM dd, yyyy") : "End Date"}
                </Text>
              </TouchableOpacity>
            </View>

            <Divider style={styles.divider} />

            {/* Status Filter */}
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Status Filter (Optional)
            </Text>
            <TextInput
              mode="outlined"
              placeholder="e.g., COMPLETED, PENDING"
              value={status}
              onChangeText={setStatus}
              style={styles.input}
            />

            <Divider style={styles.divider} />

            {/* Scheduling */}
            <View style={styles.checkboxRow}>
              <Checkbox
                status={isScheduled ? "checked" : "unchecked"}
                onPress={() => setIsScheduled(!isScheduled)}
              />
              <Text variant="bodyMedium">Schedule recurring export</Text>
            </View>

            {isScheduled && (
              <RadioButton.Group
                onValueChange={(value) => setFrequency(value as ScheduleFrequency)}
                value={frequency}
              >
                {SCHEDULE_FREQUENCIES.map((f) => (
                  <RadioButton.Item
                    key={f.value}
                    label={f.label}
                    value={f.value}
                    position="leading"
                  />
                ))}
              </RadioButton.Group>
            )}

            <Divider style={styles.divider} />

            {/* Email Delivery */}
            <View style={styles.checkboxRow}>
              <Checkbox
                status={sendEmail ? "checked" : "unchecked"}
                onPress={() => setSendEmail(!sendEmail)}
              />
              <Text variant="bodyMedium">Send export by email</Text>
            </View>

            {sendEmail && (
              <View style={styles.emailSection}>
                <TextInput
                  mode="outlined"
                  label="Email Address"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={styles.input}
                />
                <RadioButton.Group
                  onValueChange={(value) => setEmailMethod(value as "LINK" | "ATTACHMENT")}
                  value={emailMethod}
                >
                  <RadioButton.Item
                    label="Send download link"
                    value="LINK"
                    position="leading"
                  />
                  <RadioButton.Item
                    label="Attach file to email"
                    value="ATTACHMENT"
                    position="leading"
                  />
                </RadioButton.Group>
              </View>
            )}

            <Divider style={styles.divider} />

            {/* Reason */}
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Reason (Optional)
            </Text>
            <TextInput
              mode="outlined"
              placeholder="Purpose of this export"
              value={reason}
              onChangeText={setReason}
              style={styles.input}
              multiline
              numberOfLines={2}
            />
          </ScrollView>

          {/* Footer */}
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

      {/* Date Picker */}
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

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    maxHeight: "85%",
    backgroundColor: Theme.colors.background.card,
    borderRadius: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.neutral[200],
  },
  title: {
    fontWeight: "600",
  },
  content: {
    padding: 16,
    maxHeight: 500,
  },
  sectionTitle: {
    marginBottom: 8,
    fontWeight: "500",
  },
  divider: {
    marginVertical: 16,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  dateButton: {
    flex: 1,
    padding: 12,
    backgroundColor: Theme.colors.background.paper,
    borderRadius: 8,
    alignItems: "center",
  },
  input: {
    marginTop: 8,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  emailSection: {
    marginTop: 8,
    marginLeft: 32,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.neutral[200],
  },
  button: {
    minWidth: 100,
  },
});

export default ExportDataModal;
