import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import {
  LEXD_CONTACTS,
  LEXD_DESTINATIONS,
  LEXD_RATES,
} from '@src/shared/constants/contact';
import { createHomeRedesignStyles } from './HomeRedesign.styles';

interface HomeServicesAndContactsProps {
  onContact: (phone: string) => void;
}

const SERVICES = [
  { title: 'Business consulting', body: 'Conseils pour vos achats, fournisseurs et opérations en Chine.', icon: 'briefcase-outline' },
  { title: 'Étudier en Chine', body: 'Accompagnement des étudiants qui souhaitent venir étudier en Chine.', icon: 'school-outline' },
  { title: 'Formation sur Alibaba', body: 'Apprenez à rechercher, vérifier et commander auprès de fournisseurs.', icon: 'cart-outline' },
  { title: 'Processus de visa Chine', body: 'Orientation sur les étapes et les documents de votre demande de visa.', icon: 'document-text-outline' },
] as const;

export const HomeServicesAndContacts: React.FC<HomeServicesAndContactsProps> = ({ onContact }) => {
  const { colors, isDark } = useAppTheme();
  const styles = createHomeRedesignStyles(colors, isDark);

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Plus que la livraison</Text>
        <Text style={styles.sectionBody}>Un accompagnement pratique pour avancer entre l’Afrique et la Chine.</Text>
      </View>

      <View style={styles.serviceList}>
        {SERVICES.map((service) => (
          <View key={service.title} style={styles.serviceRow}>
            <View style={styles.serviceIcon}>
              <Ionicons name={service.icon} size={19} color={colors.primary.main} />
            </View>
            <View style={styles.serviceCopy}>
              <Text style={styles.serviceTitle}>{service.title}</Text>
              <Text style={styles.serviceBody}>{service.body}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.profileRow}>
        {LEXD_DESTINATIONS.map((destination) => (
          <View key={destination} style={styles.profileChip}>
            <Text style={styles.profileChipText}>{destination}</Text>
          </View>
        ))}
        <View style={styles.profileChip}>
          <Text style={styles.profileChipText}>{LEXD_RATES.cbm}</Text>
        </View>
        <View style={styles.profileChip}>
          <Text style={styles.profileChipText}>{LEXD_RATES.weight}</Text>
        </View>
      </View>

      <View style={styles.contactList}>
        {[LEXD_CONTACTS.main, LEXD_CONTACTS.hilary].map((contact) => (
          <Pressable
            key={contact.label}
            onPress={() => onContact(contact.phone)}
            accessibilityRole="button"
            accessibilityLabel={`Contacter ${contact.label}`}
            style={({ pressed }) => [styles.contactButton, pressed && styles.contactButtonPressed]}
          >
            <Ionicons name="logo-whatsapp" size={20} color={colors.primary.main} />
            <View style={styles.contactCopy}>
              <Text style={styles.contactName}>{contact.label}</Text>
              <Text style={styles.contactPhone}>{contact.displayPhone}</Text>
            </View>
            <Ionicons name="arrow-forward" size={18} color={colors.text.disabled} />
          </Pressable>
        ))}
      </View>
    </View>
  );
};
