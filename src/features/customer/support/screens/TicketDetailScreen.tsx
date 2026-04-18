/**
 * Ticket Detail Screen
 * Shows ticket details with chat-like message interface
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TextInput as RNTextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import {
  Appbar,
  Text,
  Card,
  IconButton,
  Button,
  useTheme,
  Divider,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { format } from 'date-fns/format';
import { fr } from 'date-fns/locale';
import { RootStackScreenProps } from '@src/navigations/type';
import { Fonts } from '@src/constants/Fonts';
import { COLORS } from '@src/constants/Colors';
import { useGetTicket, useAddMessage, useRateTicket } from '../hooks/useTickets';
import { TicketStatusBadge } from '../components/TicketStatusBadge';
import { TicketMessageBubble } from '../components/TicketMessageBubble';
import { TicketDetailSkeleton } from '../components/TicketDetailSkeleton';
import { Ticket, TicketStatus, TICKET_TYPE_LABELS, TICKET_PRIORITY_LABELS, TICKET_PRIORITY_COLORS } from '../types';
import { showMessage } from 'react-native-flash-message';

// Star Rating Component
interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  disabled?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange, disabled }) => {
  return (
    <View style={styles.starContainer}>
      {[1, 2, 3, 4, 5].map((star) => (
        <IconButton
          key={star}
          icon={star <= rating ? 'star' : 'star-outline'}
          size={32}
          iconColor={star <= rating ? '#FFB800' : COLORS.SlateGray}
          onPress={() => !disabled && onRatingChange(star)}
          disabled={disabled}
          style={styles.starButton}
        />
      ))}
    </View>
  );
};

// Ticket Info Card Component
interface TicketInfoCardProps {
  ticket: Ticket;
}

const TicketInfoCard: React.FC<TicketInfoCardProps> = ({ ticket }) => {
  const theme = useTheme();

  return (
    <Card style={styles.infoCard} mode="elevated">
      <Card.Content>
        {/* Ticket Number and Status */}
        <View style={styles.infoHeader}>
          <Text style={styles.ticketNumber}>{ticket.ticketNumber}</Text>
          <TicketStatusBadge status={ticket.status} />
        </View>

        <Divider style={styles.divider} />

        {/* Type and Priority */}
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <MaterialCommunityIcons name="tag-outline" size={16} color={COLORS.DimGray} />
            <Text style={styles.infoLabel}>Type:</Text>
            <Text style={styles.infoValue}>{TICKET_TYPE_LABELS[ticket.type]}</Text>
          </View>
          <View style={styles.infoItem}>
            <MaterialCommunityIcons name="flag-outline" size={16} color={TICKET_PRIORITY_COLORS[ticket.priority]} />
            <Text style={styles.infoLabel}>Priorité:</Text>
            <Text style={[styles.infoValue, { color: TICKET_PRIORITY_COLORS[ticket.priority] }]}>
              {TICKET_PRIORITY_LABELS[ticket.priority]}
            </Text>
          </View>
        </View>

        {/* Created Date */}
        <View style={styles.infoItem}>
          <MaterialCommunityIcons name="calendar-outline" size={16} color={COLORS.DimGray} />
          <Text style={styles.infoLabel}>Créé le:</Text>
          <Text style={styles.infoValue}>
            {format(new Date(ticket.createdAt), 'dd MMM yyyy à HH:mm', { locale: fr })}
          </Text>
        </View>

        <Divider style={styles.divider} />

        {/* Subject */}
        <Text style={styles.subject}>{ticket.subject}</Text>

        {/* Description */}
        <Text style={styles.description}>{ticket.description}</Text>
      </Card.Content>
    </Card>
  );
};

// Rating Section Component
interface RatingSectionProps {
  ticket: Ticket;
  onRate: (rating: number) => void;
  isRating: boolean;
}

const RatingSection: React.FC<RatingSectionProps> = ({ ticket, onRate, isRating }) => {
  const [rating, setRating] = useState(ticket.rating || 0);

  if (ticket.status !== 'RESOLVED' && ticket.status !== 'CLOSED') {
    return null;
  }

  if (ticket.rating) {
    return (
      <Card style={styles.ratingCard} mode="elevated">
        <Card.Content>
          <Text style={styles.ratingTitle}>Votre évaluation</Text>
          <StarRating rating={ticket.rating} onRatingChange={() => {}} disabled />
          <Text style={styles.ratingThanks}>Merci pour votre retour !</Text>
        </Card.Content>
      </Card>
    );
  }

  return (
    <Card style={styles.ratingCard} mode="elevated">
      <Card.Content>
        <Text style={styles.ratingTitle}>Comment s'est passée votre expérience ?</Text>
        <Text style={styles.ratingSubtitle}>Évaluez la résolution de votre problème</Text>
        <StarRating rating={rating} onRatingChange={setRating} />
        <Button
          mode="contained"
          onPress={() => onRate(rating)}
          loading={isRating}
          disabled={rating === 0 || isRating}
          style={styles.rateButton}
        >
          Envoyer l'évaluation
        </Button>
      </Card.Content>
    </Card>
  );
};

const TicketDetailScreen: React.FC<RootStackScreenProps<'TicketDetail'>> = ({
  navigation,
  route,
}) => {
  const theme = useTheme();
  const { ticketId } = route.params;
  const [messageInput, setMessageInput] = useState('');
  const inputRef = useRef<RNTextInput>(null);

  const { data: ticket, isLoading, isError, error, refetch } = useGetTicket(ticketId);
  const addMessageMutation = useAddMessage();
  const rateTicketMutation = useRateTicket();

  const canReply = ticket && !['RESOLVED', 'CLOSED'].includes(ticket.status);

  const handleSendMessage = async () => {
    if (!messageInput.trim() || !canReply) return;

    try {
      await addMessageMutation.mutateAsync({
        ticketId,
        message: messageInput.trim(),
      });
      setMessageInput('');
    } catch (error) {
      showMessage({
        message: 'Erreur',
        description: 'Impossible d\'envoyer le message. Veuillez réessayer.',
        type: 'danger',
      });
    }
  };

  const handleRate = async (rating: number) => {
    try {
      await rateTicketMutation.mutateAsync({ ticketId, rating });
      showMessage({
        message: 'Merci !',
        description: 'Votre évaluation a été enregistrée.',
        type: 'success',
      });
    } catch (error) {
      showMessage({
        message: 'Erreur',
        description: 'Impossible d\'envoyer l\'évaluation.',
        type: 'danger',
      });
    }
  };

  // Scroll to bottom when new messages arrive
  const flatListRef = useRef<any>(null);

  useEffect(() => {
    if (ticket?.messages.length) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [ticket?.messages.length]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Ticket" titleStyle={styles.headerTitle} />
        </Appbar.Header>
        <TicketDetailSkeleton />
      </SafeAreaView>
    );
  }

  if (isError || !ticket) {
    return (
      <SafeAreaView style={styles.container}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Ticket" titleStyle={styles.headerTitle} />
        </Appbar.Header>
        <View style={styles.centerContainer}>
          <MaterialCommunityIcons name="alert-circle" size={64} color={theme.colors.error} />
          <Text style={styles.errorTitle}>Erreur de chargement</Text>
          <Text style={styles.errorText}>{error?.message || 'Ticket introuvable'}</Text>
          <Button mode="contained" onPress={() => refetch()} style={styles.retryButton}>
            Réessayer
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content
          title={ticket.ticketNumber}
          titleStyle={styles.headerTitle}
          subtitle={TICKET_TYPE_LABELS[ticket.type]}
          subtitleStyle={styles.headerSubtitle}
        />
      </Appbar.Header>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <FlashList
          ref={flatListRef}
          data={[
            { type: 'info', id: 'info' },
            ...(ticket.messages.length > 0 ? ticket.messages.map((m) => ({ type: 'message', data: m, id: m._id })) : [{ type: 'empty', id: 'empty' }]),
            { type: 'rating', id: 'rating' },
          ]}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            if (item.type === 'info') {
              return <TicketInfoCard ticket={ticket} />;
            }
            if (item.type === 'rating') {
              return (
                <RatingSection
                  ticket={ticket}
                  onRate={handleRate}
                  isRating={rateTicketMutation.isPending}
                />
              );
            }
            if (item.type === 'empty') {
              return (
                <View style={styles.emptyMessages}>
                  <MaterialCommunityIcons name="message-text-outline" size={48} color={COLORS.SlateGray} />
                  <Text style={styles.emptyMessagesText}>Aucun message encore</Text>
                  <Text style={styles.emptyMessagesSubtext}>
                    Envoyez un message pour commencer la conversation
                  </Text>
                </View>
              );
            }
            return <TicketMessageBubble message={item.data!} />;
          }}
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={false}
        />

        {/* Message Input */}
        {canReply && (
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <RNTextInput
                ref={inputRef}
                style={styles.textInput}
                placeholder="Écrivez votre message..."
                value={messageInput}
                onChangeText={setMessageInput}
                multiline
                maxLength={1000}
                placeholderTextColor={COLORS.SlateGray}
              />
              <IconButton
                icon="send"
                size={24}
                iconColor={theme.colors.primary}
                onPress={handleSendMessage}
                disabled={!messageInput.trim() || addMessageMutation.isPending}
                loading={addMessageMutation.isPending}
              />
            </View>
          </View>
        )}

        {!canReply && (
          <View style={styles.closedBanner}>
            <MaterialCommunityIcons name="lock-outline" size={20} color={COLORS.DimGray} />
            <Text style={styles.closedText}>
              Ce ticket est {ticket.status === 'RESOLVED' ? 'résolu' : 'fermé'}. Vous ne pouvez plus envoyer de messages.
            </Text>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightBackground,
  },
  headerTitle: {
    fontFamily: Fonts.bold,
  },
  headerSubtitle: {
    fontFamily: Fonts.regular,
    fontSize: 12,
  },
  keyboardView: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  errorTitle: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: COLORS.DarkGrey,
    marginTop: 16,
  },
  errorText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: COLORS.DimGray,
    textAlign: 'center',
    marginTop: 8,
  },
  retryButton: {
    marginTop: 24,
  },
  messagesList: {
    padding: 16,
    paddingBottom: 80,
  },
  infoCard: {
    marginBottom: 16,
    borderRadius: 12,
  },
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ticketNumber: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: COLORS.DarkGrey,
  },
  divider: {
    marginVertical: 12,
    backgroundColor: COLORS.Silver,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  infoLabel: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: COLORS.DimGray,
    marginLeft: 6,
    marginRight: 4,
  },
  infoValue: {
    fontFamily: Fonts.meduim,
    fontSize: 13,
    color: COLORS.DarkGrey,
  },
  subject: {
    fontFamily: Fonts.meduim,
    fontSize: 15,
    color: COLORS.DarkGrey,
    marginBottom: 8,
  },
  description: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: COLORS.DimGray,
    lineHeight: 20,
  },
  emptyMessages: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyMessagesText: {
    fontFamily: Fonts.meduim,
    fontSize: 16,
    color: COLORS.DimGray,
    marginTop: 12,
  },
  emptyMessagesSubtext: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: COLORS.SlateGray,
    marginTop: 4,
  },
  ratingCard: {
    marginTop: 16,
    borderRadius: 12,
  },
  ratingTitle: {
    fontFamily: Fonts.meduim,
    fontSize: 16,
    color: COLORS.DarkGrey,
    textAlign: 'center',
  },
  ratingSubtitle: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: COLORS.DimGray,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 8,
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 8,
  },
  starButton: {
    margin: 0,
  },
  rateButton: {
    marginTop: 8,
    borderRadius: 8,
  },
  ratingThanks: {
    fontFamily: Fonts.meduim,
    fontSize: 14,
    color: COLORS.green,
    textAlign: 'center',
    marginTop: 8,
  },
  inputContainer: {
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.Silver,
    padding: 12,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.FeatherWhite,
    borderRadius: 24,
    paddingHorizontal: 16,
    minHeight: 48,
  },
  textInput: {
    flex: 1,
    fontFamily: Fonts.regular,
    fontSize: 15,
    color: COLORS.DarkGrey,
    maxHeight: 100,
    paddingTop: 8,
    paddingBottom: 8,
  },
  closedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.Silver,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  closedText: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: COLORS.DimGray,
    marginLeft: 8,
  },
});

export default TicketDetailScreen;
