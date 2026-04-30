import { useState } from "react";

import { ExportEntity, ExportFormat, ScheduleFrequency, ExportFilters } from "../../types";
import { useExportData, useScheduleExport } from "../../hooks";

export const useExportDataModal = (entity: ExportEntity, onDismiss: () => void) => {
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

  const exportMutation = useExportData();
  const scheduleMutation = useScheduleExport();

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

  const handleDateConfirm = (params: { date?: Date }) => {
    if (!params.date) {
      setShowDatePicker(false);
      return;
    }

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

  const isLoading = exportMutation.isPending || scheduleMutation.isPending;

  return {
    format,
    setFormat,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
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
  };
};
