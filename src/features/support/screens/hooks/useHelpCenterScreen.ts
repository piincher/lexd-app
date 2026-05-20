import { useState, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { openSupportWhatsApp } from "@src/shared/lib/openWhatsApp";
import { useClipboard } from "@src/shared/lib/hooks/useClipboard";
import type { RootStackParamList } from "@src/navigations/type";
import { useHelpCenter } from "../../hooks/useHelpCenter";
import type { FAQItem, FAQBookmark } from "../../types";

export function useHelpCenterScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { copyToClipboard } = useClipboard();
  const [selectedFaq, setSelectedFaq] = useState<FAQItem | null>(null);
  const h = useHelpCenter();

  const handleTrackOrder = useCallback(() => navigation.navigate("CheckRoute"), [navigation]);
  const handleViewTickets = useCallback(() => navigation.navigate("TicketList"), [navigation]);
  const handleViewTicket = useCallback((id: string) => navigation.navigate("TicketDetail", { ticketId: id }), [navigation]);
  const handleWhatsApp = useCallback(() => openSupportWhatsApp("Bonjour, j'ai besoin d'aide."), []);

  const handleBookmark = useCallback((faq: FAQItem) => {
    h.toggleBookmark({ faqId: faq._id || faq.id || '', question: faq.question, category: String(faq.category) });
  }, [h]);

  const handleRemoveBookmark = useCallback((faqId: string) => {
    h.toggleBookmark({ faqId, question: '', category: '' });
  }, [h]);

  const handleSelectFaq = useCallback((faq: FAQItem) => setSelectedFaq(faq), []);

  const handleSelectBookmark = useCallback((bookmark: FAQBookmark) => {
    const faq = h.faqs.find((f) => (f._id || f.id) === bookmark.faqId);
    if (faq) setSelectedFaq(faq);
  }, [h.faqs]);

  const handleFeedback = useCallback((faqId: string, isHelpful: boolean) => {
    h.submitFeedback({ faqId, isHelpful });
  }, [h]);

  const handleCreateTicket = useCallback(async (payload: { type: string; subject: string; description: string; priority: string }) => {
    await h.createTicket(payload as { type: 'ORDER_ISSUE' | 'PAYMENT_ISSUE' | 'DELIVERY_ISSUE' | 'GENERAL'; subject: string; description: string; priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT' });
  }, [h]);

  const handleCloseCreateTicket = useCallback(() => {
    h.setShowCreateTicket(false);
    h.resetCreateTicket();
  }, [h]);

  return {
    ...h,
    selectedFaq,
    setSelectedFaq,
    copyToClipboard,
    handleTrackOrder,
    handleViewTickets,
    handleViewTicket,
    handleWhatsApp,
    handleBookmark,
    handleRemoveBookmark,
    handleSelectFaq,
    handleSelectBookmark,
    handleFeedback,
    handleCreateTicket,
    handleCloseCreateTicket,
  };
}
