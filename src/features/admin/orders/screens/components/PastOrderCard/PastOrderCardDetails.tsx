import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { productType } from '@src/api/order';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './PastOrderCard.styles';

interface PastOrderCardDetailsProps {
  item: productType;
  isExpanded: boolean;
}

export const PastOrderCardDetails: React.FC<PastOrderCardDetailsProps> = ({ item, isExpanded }) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  return (
    <>
      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Ionicons name="call" size={20} color={colors.text.secondary} />
          <Text style={styles.detailText}>{item.clientPhone}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="calendar" size={20} color={colors.text.secondary} />
          <Text style={styles.detailText}>{new Date(item.createdAt).toLocaleDateString()}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="people" size={20} color={colors.text.secondary} />
          <Text style={styles.detailText}>{item.quantity} colis</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="speedometer" size={20} color={colors.text.secondary} />
          <Text style={styles.detailText}> {item.packageCBM} CBM</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="logo-whatsapp" size={20} color={colors.status.success} />
          <Text style={styles.detailText}>WhatsApp:+223 {item.clientPhone}</Text>
        </View>
      </View>

      {isExpanded && (
        <View style={styles.expandedContent}>
          <View style={styles.detailItem}>
            <Ionicons name="location" size={20} color={colors.text.secondary} />
            <Text style={styles.detailText}>China,Foshan</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="location" size={20} color={colors.text.secondary} />
            <Text style={styles.detailText}>Bamako,Mali</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="time" size={20} color={colors.text.secondary} />
            <Text style={styles.detailText}>
              Est. livraison: {item.estimatedDelivery || 'N/A'}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="card" size={20} color={colors.text.secondary} />
            <Text style={styles.detailText}>Partenaire: {item.partenaire || 'Non spécifié'}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="pricetag" size={20} color={colors.text.secondary} />
            <Text style={[styles.detailText, styles.priceText]}>
              {item.priceTotal ? `${item.priceTotal} FCFA` : 'N/A'}
            </Text>
          </View>
        </View>
      )}
    </>
  );
};
