/**
 * MessageComposer
 * SRP: Message input with character counter, categorized templates, and send button
 */

import React, { useState, useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme } from '@src/constants/Theme';
import { Fonts } from '@src/constants/Fonts';

const SMS_CHAR_LIMIT = 160;
const SMS_LONG_LIMIT = 320;

type TemplateCategory = 'all' | 'expedition' | 'finance' | 'client' | 'alertes' | 'infos';

interface Template {
  label: string;
  icon: string;
  message: string;
  category: TemplateCategory;
}

interface CategoryTab {
  key: TemplateCategory;
  label: string;
  icon: string;
}

const CATEGORY_TABS: CategoryTab[] = [
  { key: 'all', label: 'Tous', icon: 'grid' },
  { key: 'expedition', label: 'Expedition', icon: 'boat' },
  { key: 'finance', label: 'Finance', icon: 'wallet' },
  { key: 'client', label: 'Client', icon: 'people' },
  { key: 'alertes', label: 'Alertes', icon: 'warning' },
  { key: 'infos', label: 'Infos', icon: 'information-circle' },
];

const TEMPLATES: Template[] = [
  // --- Expedition ---
  {
    label: 'Stockage',
    icon: 'home',
    category: 'expedition',
    message:
      'Bonjour, votre marchandise est bien arrivee dans notre entrepot en Chine. Elle sera consolidee pour le prochain envoi. Merci. ChinaLink Express',
  },
  {
    label: 'Pesage',
    icon: 'scale',
    category: 'expedition',
    message:
      'Bonjour, le pesage de votre marchandise est termine. Contactez-nous pour connaitre le poids, le volume et le montant exact. ChinaLink',
  },
  {
    label: 'Conteneur',
    icon: 'cube',
    category: 'expedition',
    message:
      'Bonjour, votre marchandise a ete chargee dans le conteneur. Le depart est prevu prochainement. Nous vous tiendrons informe. ChinaLink',
  },
  {
    label: 'Embarquement',
    icon: 'log-in',
    category: 'expedition',
    message:
      'Bonjour, votre marchandise a ete embarquee et est en route. L\'arrivee est prevue dans les prochains jours. Merci. ChinaLink Express',
  },
  {
    label: 'Depart',
    icon: 'airplane',
    category: 'expedition',
    message:
      'Bonjour, votre marchandise est en cours d\'expedition. Elle partira bientot. Preparez-vous pour la reception. Merci de votre confiance. ChinaLink',
  },
  {
    label: 'Transit',
    icon: 'swap-horizontal',
    category: 'expedition',
    message:
      'Bonjour, votre marchandise est actuellement en transit. Nous vous informerons des son arrivee a destination. Merci. ChinaLink Express',
  },
  {
    label: 'Douane',
    icon: 'shield-checkmark',
    category: 'expedition',
    message:
      'Bonjour, votre colis est en cours de dedouanement. Nous vous tiendrons informe de l\'avancement. Merci de votre patience. ChinaLink',
  },
  {
    label: 'Arrivee',
    icon: 'location',
    category: 'expedition',
    message:
      'Bonjour, votre marchandise est arrivee a destination. Veuillez passer a notre entrepot pour la recuperer. Merci. ChinaLink Express',
  },
  {
    label: 'Livraison',
    icon: 'bicycle',
    category: 'expedition',
    message:
      'Bonjour, votre marchandise est en cours de livraison. Merci de rester disponible pour la reception. A bientot! ChinaLink Express',
  },
  {
    label: 'Collecte',
    icon: 'archive',
    category: 'expedition',
    message:
      'Bonjour, la collecte de votre marchandise est programmee. Notre equipe viendra recuperer vos colis. Merci de les preparer. ChinaLink',
  },
  {
    label: 'Inspection',
    icon: 'search',
    category: 'expedition',
    message:
      'Bonjour, l\'inspection de votre marchandise est terminee. Tout est conforme. Elle sera expediee selon le calendrier prevu. ChinaLink',
  },
  {
    label: 'Conteneur vide',
    icon: 'cube-outline',
    category: 'expedition',
    message:
      'Bonjour, un conteneur vide a ete envoye vers l\'expediteur pour le chargement de votre marchandise. Nous vous tiendrons informe de son arrivee. ChinaLink',
  },
  {
    label: 'Conteneur recu',
    icon: 'checkmark-done-circle',
    category: 'expedition',
    message:
      'Bonjour, le conteneur vide a ete recu par l\'expediteur. Le chargement de votre marchandise va debuter prochainement. ChinaLink',
  },

  // --- Finance ---
  {
    label: 'Confirmation',
    icon: 'checkmark-circle',
    category: 'finance',
    message:
      'Bonjour, votre commande a ete confirmee et enregistree avec succes. Nous vous tiendrons informe de chaque etape. Merci. ChinaLink Express',
  },
  {
    label: 'Paiement',
    icon: 'card',
    category: 'finance',
    message:
      'Bonjour, un rappel concernant le solde de votre commande. Merci d\'effectuer le paiement dans les plus brefs delais. ChinaLink Express',
  },
  {
    label: 'Tarif',
    icon: 'list',
    category: 'finance',
    message:
      'Info ChinaLink: nos tarifs ont ete mis a jour. Contactez-nous ou visitez notre bureau pour consulter la nouvelle grille tarifaire. Merci!',
  },
  {
    label: 'Document',
    icon: 'document-text',
    category: 'finance',
    message:
      'Bonjour, vos documents sont prets. Veuillez passer les recuperer a notre bureau ou contactez-nous pour plus de details. ChinaLink',
  },
  {
    label: 'Assurance',
    icon: 'umbrella',
    category: 'finance',
    message:
      'Conseil ChinaLink: protegez votre marchandise avec notre assurance transport. Contactez-nous pour les details et les tarifs. Merci!',
  },

  // --- Client ---
  {
    label: 'Bienvenue',
    icon: 'heart',
    category: 'client',
    message:
      'Bienvenue chez ChinaLink Express! Nous sommes ravis de vous compter parmi nos clients. Contactez-nous pour toute assistance. Merci!',
  },
  {
    label: 'Remerciement',
    icon: 'thumbs-up',
    category: 'client',
    message:
      'Merci d\'avoir choisi ChinaLink Express! Votre satisfaction est notre priorite. N\'hesitez pas a nous recommander. A bientot!',
  },
  {
    label: 'Fidelite',
    icon: 'star',
    category: 'client',
    message:
      'Cher client fidele, profitez d\'une remise speciale sur votre prochain envoi avec ChinaLink Express. Contactez-nous pour en beneficier!',
  },
  {
    label: 'Promo',
    icon: 'pricetag',
    category: 'client',
    message:
      'Offre speciale ChinaLink! Profitez d\'une reduction sur vos envois ce mois-ci. Contactez-nous pour en savoir plus. Offre limitee!',
  },
  {
    label: 'Nouveau service',
    icon: 'sparkles',
    category: 'client',
    message:
      'Decouvrez notre nouveau service chez ChinaLink Express! Contactez-nous pour en savoir plus et profiter de nos offres de lancement.',
  },

  // --- Alertes ---
  {
    label: 'Retard',
    icon: 'time',
    category: 'alertes',
    message:
      'Bonjour, nous vous informons d\'un retard sur votre livraison. Nous faisons le necessaire pour accelerer le processus. Merci. ChinaLink',
  },
  {
    label: 'Excuse conteneur',
    icon: 'sad',
    category: 'alertes',
    message:
      'Bonjour, nous vous prions de nous excuser pour le retard concernant votre conteneur. Nous faisons tout notre possible pour resoudre la situation au plus vite. Merci de votre comprehension. ChinaLink',
  },
  {
    label: 'Urgence',
    icon: 'alert-circle',
    category: 'alertes',
    message:
      'URGENT: Veuillez nous contacter au plus vite concernant votre commande. Un probleme necessite votre attention. Merci. ChinaLink',
  },
  {
    label: 'Reclamation',
    icon: 'chatbox-ellipses',
    category: 'alertes',
    message:
      'Bonjour, nous avons bien recu votre reclamation. Notre equipe la traite en priorite. Nous reviendrons vers vous rapidement. ChinaLink',
  },

  // --- Infos ---
  {
    label: 'Fermeture',
    icon: 'lock-closed',
    category: 'infos',
    message:
      'Info ChinaLink: nos bureaux seront fermes le jour ferie. Nous reprendrons nos activites normalement le jour suivant. Merci!',
  },
  {
    label: 'Fete',
    icon: 'gift',
    category: 'infos',
    message:
      'ChinaLink Express vous souhaite de joyeuses fetes! Que cette periode soit remplie de bonheur. Merci pour votre confiance. A bientot!',
  },
];

interface MessageComposerProps {
  message: string;
  onMessageChange: (text: string) => void;
  recipientCount: number;
  isSending: boolean;
  onSend: () => void;
}

export const MessageComposer: React.FC<MessageComposerProps> = ({
  message,
  onMessageChange,
  recipientCount,
  isSending,
  onSend,
}) => {
  const [activeCategory, setActiveCategory] = useState<TemplateCategory>('all');

  const filteredTemplates = useMemo(() => {
    if (activeCategory === 'all') return TEMPLATES;
    return TEMPLATES.filter((t) => t.category === activeCategory);
  }, [activeCategory]);

  const charCount = message.length;
  const smsCount = charCount === 0 ? 0 : Math.ceil(charCount / SMS_CHAR_LIMIT);
  const isOverLimit = charCount > SMS_LONG_LIMIT;
  const canSend = message.trim().length > 0 && recipientCount > 0 && !isSending && !isOverLimit;

  return (
    <View style={styles.container}>
      {/* Category Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryScroll}
      >
        {CATEGORY_TABS.map((cat) => {
          const isActive = activeCategory === cat.key;
          return (
            <TouchableOpacity
              key={cat.key}
              onPress={() => setActiveCategory(cat.key)}
              style={[styles.categoryTab, isActive && styles.categoryTabActive]}
              activeOpacity={0.7}
            >
              <Ionicons
                name={cat.icon as any}
                size={13}
                color={isActive ? '#FFF' : Theme.neutral[500]}
              />
              <Text style={[styles.categoryText, isActive && styles.categoryTextActive]}>
                {cat.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Quick Templates */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.templateScroll}
      >
        {filteredTemplates.map((template) => (
          <TouchableOpacity
            key={template.label}
            onPress={() => onMessageChange(template.message)}
            style={styles.templateChip}
            activeOpacity={0.7}
          >
            <Ionicons name={template.icon as any} size={14} color={Theme.primary[500]} />
            <Text style={styles.templateText} numberOfLines={1}>{template.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Message Input */}
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="Ecrivez votre message ici..."
          placeholderTextColor={Theme.neutral[400]}
          value={message}
          onChangeText={onMessageChange}
          multiline
          numberOfLines={4}
          style={styles.input}
          underlineColor="transparent"
          activeUnderlineColor="transparent"
          textColor={Theme.neutral[800]}
        />
        <View style={styles.inputFooter}>
          <Text style={[styles.charCount, isOverLimit && styles.charCountOver]}>
            {charCount}/{SMS_LONG_LIMIT}
          </Text>
          <Text style={styles.smsEstimate}>
            ~{smsCount} SMS x {recipientCount} = {smsCount * recipientCount} SMS
          </Text>
        </View>
      </View>

      {/* Send Button */}
      <TouchableOpacity
        onPress={onSend}
        disabled={!canSend}
        style={styles.sendWrapper}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={
            canSend
              ? Theme.gradients.primary
              : [Theme.neutral[200], Theme.neutral[300]]
          }
          style={styles.sendButton}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {isSending ? (
            <Text style={styles.sendText}>Envoi en cours...</Text>
          ) : (
            <>
              <Ionicons name="send" size={18} color="#FFF" />
              <Text style={styles.sendText}>
                Envoyer a {recipientCount} destinataire{recipientCount > 1 ? 's' : ''}
              </Text>
            </>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: Theme.neutral[100],
    paddingTop: 14,
    paddingBottom: 24,
  },
  categoryScroll: {
    paddingHorizontal: 20,
    gap: 6,
    marginBottom: 10,
  },
  categoryTab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: Theme.neutral[100],
  },
  categoryTabActive: {
    backgroundColor: Theme.primary[500],
  },
  categoryText: {
    fontSize: 12,
    fontFamily: Fonts.medium,
    color: Theme.neutral[500],
  },
  categoryTextActive: {
    color: '#FFF',
    fontFamily: Fonts.semiBold,
    fontWeight: '600',
  },
  templateScroll: {
    paddingHorizontal: 20,
    gap: 8,
    marginBottom: 14,
  },
  templateChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Theme.primary[50],
    borderWidth: 1,
    borderColor: Theme.primary[100],
  },
  templateText: {
    fontSize: 13,
    fontFamily: Fonts.medium,
    color: Theme.primary[600] || Theme.primary[500],
  },
  inputWrapper: {
    marginHorizontal: 20,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Theme.neutral[200],
    backgroundColor: Theme.neutral[50],
    overflow: 'hidden',
  },
  input: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    backgroundColor: 'transparent',
    minHeight: 90,
    paddingHorizontal: 14,
    textAlignVertical: 'top',
  },
  inputFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: Theme.neutral[100],
  },
  charCount: {
    fontSize: 12,
    fontFamily: Fonts.medium,
    color: Theme.neutral[400],
  },
  charCountOver: {
    color: '#EF4444',
    fontFamily: Fonts.bold,
    fontWeight: '700',
  },
  smsEstimate: {
    fontSize: 12,
    fontFamily: Fonts.medium,
    color: Theme.neutral[500],
  },
  sendWrapper: {
    marginHorizontal: 20,
    marginTop: 14,
    borderRadius: 14,
    overflow: 'hidden',
  },
  sendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 15,
  },
  sendText: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: '#FFF',
  },
});
