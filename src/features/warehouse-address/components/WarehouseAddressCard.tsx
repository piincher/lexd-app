/* Hallmark · component: address-card · genre: utilitarian
 * Hierarchy over flat list: the warehouse code + Chinese address are the hero
 * (what the supplier physically needs); everything else is a hairline copy-row.
 * One primary action — send the full supplier sheet — over two equal buttons.
 * pre-emit critique: P5 H5 E5 S5 R4 V4
 */
import React from 'react';
import { Text, View } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Ionicons } from '@expo/vector-icons';
import { showMessage } from 'react-native-flash-message';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { WarehouseAddress, WarehouseMode } from '../types';
import { CopyableField } from './CopyableField';
import { WarehouseAddressActions } from './WarehouseAddressActions';
import { styles } from './WarehouseAddressCard.styles';

interface WarehouseAddressCardProps {
  address: WarehouseAddress;
  onShareSheet: (mode: WarehouseMode) => void;
  onSaveSheet: (mode: WarehouseMode) => void;
  isSharing: boolean;
  isSaving: boolean;
}

const MODE_META = {
  AIR: { fr: 'Fret aérien', zh: '空运', icon: 'airplane' as const },
  SEA: { fr: 'Fret maritime', zh: '海运', icon: 'boat' as const },
};

export const formatFullAddress = (a: WarehouseAddress): string =>
  [
    a.companyName && `公司/Société: ${a.companyName}`,
    a.warehouseCode && `入仓号/Entrepôt: ${a.warehouseCode}`,
    a.recipientName && `收件人/Destinataire: ${a.recipientName}`,
    a.phone && `电话/Tél: ${a.phone}`,
    a.addressDetail && `地址/Adresse: ${a.addressDetail}`,
    a.postalCode && `邮编/CP: ${a.postalCode}`,
    a.contactWhatsApp && `WhatsApp/WeChat: ${a.contactWhatsApp}`,
  ]
    .filter(Boolean)
    .join('\n');

export const WarehouseAddressCard: React.FC<WarehouseAddressCardProps> = ({
  address, onShareSheet, onSaveSheet, isSharing, isSaving,
}) => {
  const { colors } = useAppTheme();
  const meta = MODE_META[address.mode];
  const accent = address.mode === 'AIR' ? colors.status.info : colors.primary.main;
  const hasContent = Boolean(address.warehouseCode || address.addressDetail || address.recipientName);
  const contact = address.contactWhatsApp || address.contactWeChat;

  const copyAll = async () => {
    await Clipboard.setStringAsync(formatFullAddress(address));
    showMessage({ message: 'Adresse copiée', description: `${meta.fr} · texte complet`, type: 'success' });
  };

  return (
    <View style={[styles.card, { backgroundColor: colors.background.card, borderColor: colors.border }]}>
      <View style={[styles.header, { backgroundColor: `${accent}0D` }]}>
        <View style={styles.headerTop}>
          <View style={styles.modeGroup}>
            <View style={[styles.modeIcon, { backgroundColor: accent }]}>
              <Ionicons name={meta.icon} size={19} color={colors.text.inverse} />
            </View>
            <View>
              <Text style={[styles.modeTitle, { color: colors.text.primary }]}>{meta.fr}</Text>
              <Text style={[styles.modeSubtitle, { color: colors.text.secondary }]}>Adresse de réception en Chine</Text>
            </View>
          </View>
          <View style={[styles.modeBadge, { backgroundColor: `${accent}18` }]}>
            <Text style={[styles.modeBadgeText, { color: accent }]}>{meta.zh}</Text>
          </View>
        </View>
        <Text style={[styles.purpose, { color: colors.text.secondary }]}>La fiche inclut automatiquement votre identifiant client et les consignes pour le colis.</Text>
      </View>

      {!hasContent ? (
        <View style={styles.empty}>
          <Ionicons name="time-outline" size={18} color={colors.text.secondary} />
          <Text style={[styles.emptyText, { color: colors.text.secondary }]}>
            Adresse {meta.fr.toLowerCase()} bientôt disponible. Contactez le service client.
          </Text>
        </View>
      ) : (
        <View style={styles.content}>
          <Text style={[styles.eyebrow, { color: colors.text.secondary }]}> 
            收货地址 · Adresse de réception
          </Text>

          {!!address.warehouseCode && (
            <CopyableField labelZh="入仓号" labelFr="N° d'entrepôt" value={address.warehouseCode} hero accent={accent} />
          )}
          {!!address.recipientName && (
            <CopyableField labelZh="收件人" labelFr="Destinataire" value={address.recipientName} accent={accent} />
          )}
          {!!address.phone && (
            <CopyableField labelZh="手机号码" labelFr="Téléphone" value={address.phone} accent={accent} />
          )}
          {!!address.addressDetail && (
            <CopyableField labelZh="详细地址" labelFr="Adresse détaillée" value={address.addressDetail} accent={accent} stacked />
          )}
          {!!address.postalCode && (
            <CopyableField labelZh="邮编" labelFr="Code postal" value={address.postalCode} accent={accent} />
          )}
          {!!contact && (
            <CopyableField labelZh="联系方式" labelFr="Contact WhatsApp / WeChat" value={contact} accent={accent} last />
          )}

          {!!address.note && (
            <View style={[styles.note, { backgroundColor: `${colors.status.warning}12`, borderColor: colors.status.warning }]}> 
              <Ionicons name="alert-circle-outline" size={17} color={colors.status.warning} />
              <Text style={[styles.noteText, { color: colors.text.primary }]}>{address.note}</Text>
            </View>
          )}

          <WarehouseAddressActions mode={address.mode} accent={accent} isSharing={isSharing} isSaving={isSaving} onCopy={copyAll} onShare={onShareSheet} onSave={onSaveSheet} />
        </View>
      )}
    </View>
  );
};
